<?php

namespace DON\CloudBundle\Controller;

use DON\CloudBundle\Entity\SSHKey;
use DON\CloudBundle\Exception\ResponseException;
use Magice\Bundle\RestBundle\Annotation as Rest;
use Magice\Bundle\RestBundle\Exception\EntityValidatorException;
use Symfony\Component\HttpFoundation\Request;

class KeysController extends DigitalController
{
    private function api()
    {
        return $this->get('do.key');
    }

    /**
     * @param \Exception $exception
     * @param SSHKey     $key
     *
     * @throws \DON\CloudBundle\Exception\ResponseException
     * @throws \Exception
     */
    private function exceptionHandle(\Exception $exception, SSHKey $key)
    {
        if ($exception instanceof ResponseException) {
            // super make sure droplet deleted
            if ($exception->getErrorId() === 'NOT_FOUND') {
                $key->remove($this->getEntityManager());
                return;
            } else {
                throw $exception;
            }
        }

        throw $exception;
    }

    /**
     * @param $id
     *
     * @return SSHKey
     */
    private function getKey($id)
    {
        return $this->findNotFound('do.repository.sshkey', $id);
    }

    /**
     * @param int|\DigitalOceanV2\Entity\Key $idOrSSH
     * @param SSHKey                         $ssh
     *
     * @return \DigitalOceanV2\Entity\Key
     */
    private function sync($idOrSSH, SSHKey $ssh = null)
    {
        $node = $idOrSSH;

        if (is_numeric($idOrSSH)) {
            $node = $this->api()->getById($idOrSSH);
        }

        $ssh = $ssh ? : $this->getKey($node->id);

        $ssh->setName($node->name)
            ->setPublicKey($node->publicKey)
            ->setFingerPrint($node->fingerprint)
            ->save($this->getEntityManager(), $this->get('validator'));

        return $node;
    }

    /**
     * @Rest\View()
     * @Rest\Get("keys")
     */
    public function getAction()
    {
        /**
         * @var SSHKey[] $sshs
         */

        $keys = array();
        $sshs = (array) $this->get('do.repository.sshkey')->findByUser($this->getUser());

        foreach ($sshs as $ssh) {
            try {
                $key    = $this->api()->getById($ssh->getId());
                $keys[] = $this->sync($key, $ssh);
            } catch (\Exception $exception) {
                $this->exceptionHandle($exception, $ssh);
            }
        }

        return $keys;
    }

    /**
     * @Rest\View(statusCode=201)
     * @Rest\Post("keys")
     */
    public function createAction(Request $request)
    {
        $name = $request->get('name');
        $key  = $request->get('publicKey');
        $ssh  = new SSHKey();

        try {
            $ssh->setName($name)
                ->setPublicKey($key)
                ->validate($this->get('validator'));
        } catch (EntityValidatorException $e) {
            return $e->getErrors();
        } catch (\Exception $e) {
            throw $e;
        }

        $key = $this->api()->create($name, $key);
        $key = $this->sync($key, $ssh->setId($key->id));

        return $key;
    }

    /**
     * @Rest\View(statusCode=204)
     * @Rest\Put("keys/{id}", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', ssh)")
     */
    public function updateAction(SSHKey $ssh, Request $request)
    {
        $key = $this->api()->update($ssh->getId(), $request->get('name'));
        $key = $this->sync($key, $ssh);

        return $key;
    }

    /**
     * @Rest\View(statusCode=200)
     * @Rest\Get("keys/{id}", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', ssh)")
     */
    public function readAction(SSHKey $ssh)
    {
        return $this->api()->getById($ssh->getId());
    }

    /**
     * @Rest\View(statusCode=204)
     * @Rest\Delete("keys/{id}", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', ssh)")
     */
    public function destroyAction(SSHKey $ssh)
    {
        $this->api()->delete($ssh->getId());
    }

    /**
     * Rest\View()
     * Rest\Get("keys/test")
     */
    public function testAction()
    {
        $validator = $this->get('validator');
        $all       = $this->api()->getAll();

        foreach ($all as $key) {
            try {
                $server = new SSHKey();
                $server->setId($key->id)
                    ->setName($key->name)
                    ->setPublicKey($key->publicKey)
                    ->setFingerPrint($key->fingerprint)
                    ->save($this->getEntityManager(), $validator);
            } catch (EntityValidatorException $e) {
                return $e->getErrors();
            } catch (\Exception $exception) {
                throw $exception;
            }
        }

        return $all;
    }
}
