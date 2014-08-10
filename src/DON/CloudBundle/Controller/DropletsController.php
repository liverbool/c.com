<?php

namespace DON\CloudBundle\Controller;

use DON\CloudBundle\Action\Creator;
use DON\CloudBundle\DoApi\Entity\Droplet;
use DON\CloudBundle\Entity\Server;
use DON\CloudBundle\Entity\ServerError;
use DON\CloudBundle\Exception\ResponseException;
use Magice\Bundle\RestBundle\Annotation as Rest;
use Magice\Bundle\RestBundle\Exception\EntityValidatorException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


class DropletsController extends DigitalController
{
    private function api()
    {
        return $this->get('do.droplet');
    }

    private function sync($idOrDroplet, Server $server = null)
    {
        $node = $idOrDroplet;

        if (is_numeric($idOrDroplet)) {
            $node = $this->api()->getById($idOrDroplet);
        }

        $server = $server ? : $this->getServer($node->id);

        // store original kernel
        if (!$server->getKernel()) {
            $server->setKernel((array) $node->kernel);
        }

        $server->setName($node->name)
            ->setSize($node->size->slug)
            ->setPriceHourly($node->size->priceHourly)
            ->setPriceMonthly($node->size->priceMonthly)
            ->setStatus($node->status)
            ->setSnapshots($node->snapshotIds)
            ->setImage((array) $node->image)
            ->save($this->getEntityManager(), $this->get('validator'));

        return new Droplet($node, $server);
    }

    private function rename($id, $name)
    {
        $name   = $this->checkAvailibleName(strtolower($name));
        $action = $this->api()->rename($id, $name);

        $this->sync($action->resourceId);

        return $action;
    }

    private function create(Creator $creator)
    {
        $creator->setName($this->checkAvailibleName($creator->getName()));

        $en = new Server();
        $dp = $this->actionCreator('do.droplet', 'create', $creator);

        $en->setId($dp->id);
        $en->setPriceCreate(0.07);

        $dp = $this->sync($dp, $en);

        return $dp;
    }

    private function logCreatorError(Creator $creator, \Exception $e)
    {
        try {
            $rq = $this->get('request');
            $em = $this->getEntityManager();
            $en = new ServerError();

            $en->setCreator($creator);
            $en->setName($creator->getName());
            $en->setCode($e->getCode());
            $en->setMessage($e->getMessage());
            $en->setIp($rq->getClientIp());
            $en->setIps($rq->getClientIps());
            $en->setAgent($rq->headers->get('User-Agent'));
            $en->setRequest($rq);
            $en->setTrace($e->getTraceAsString());
            $en->setServer($this->getServerByName($creator->getName()));
            $en->save($em);
        } catch (\Exception $e) {
        }
    }

    private function retrive()
    {
        $servers = $this->getServers();

        if (empty($servers)) {
            return array();
        }

        $nodes = array();

        foreach ($servers as $server) {
            try {
                $node = $this->api()->getById($server->getId());
            } catch (ResponseException $exception) {

                // to make sure droplet is exist
                switch ($exception->getErrorId()) {
                    case 'NOT_FOUND':
                        $server->remove($this->getEntityManager());
                        $node = null;
                        break;

                    default:
                        throw $exception;
                }

            } catch (\Exception $exception) {
                throw $exception;
            }

            if ($node) {
                $nodes[] = $this->sync($node, $server);
            }
        }

        return $nodes;
    }

    /**
     * @Rest\View()
     * @Rest\Get("servers")
     */
    public function getAction()
    {
        return $this->retrive();
    }

    /**
     * @Rest\View()
     * @Rest\Get("servers/{id}")
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function readAction(Server $server)
    {
        return $this->api()->getById($server->getId());
    }

    /**
     * @Rest\View(statusCode=201)
     * @Rest\Post("servers")
     */
    public function createAction(Creator $creator)
    {
        try {
            // https://github.com/toin0u/DigitalOceanV2/issues/16
            error_reporting(0);
            //return $this->mock('droplet_created.json');
            return $this->create($creator);
        } catch (EntityValidatorException $e) {
            $this->logCreatorError($creator, $e);
            return $e->getErrors();
        } catch (\Exception $e) {
            $this->logCreatorError($creator, $e);
            throw $e;
        }
    }

    /**
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Delete("servers/{id}", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function deleteAction(Server $server)
    {
        $this->api()->delete($server->getId());
    }

    /**
     * Should return status 204
     * and return actionId with header to
     * prevent Ext.data.Operation.Update
     * changing 'id' (this's not return droplet object)
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function updateAction(Server $server, Request $request)
    {
        $type = $request->query->get('type');

        switch ($type) {

            case 'rename':
                $action = $this->rename($server->getId(), $request->get('name'));
                return array('id' => $action->id);

            default:
                throw new BadRequestHttpException(sprintf("Unknow request type %s.", $type));
        }
    }

    /**
     * Actions
     * -------------------------------------------------
     * @Rest\View()
     * @Rest\Get("servers/{id}/actions", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function actionsAction(Server $server)
    {
        return $this->api()->getActions($server->getId());
    }

    /**
     * Restore
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/restore/{imageId}", requirements={"id" = "\d+", "imageId" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function restoreAction(Server $server, $imageId)
    {
        return $this->api()->restore($server->getId(), $imageId);
    }

    /**
     * Reboot
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/reboot", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function rebootAction(Server $server)
    {
        return $this->api()->reboot($server->getId());
    }

    /**
     * Rebuild
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/rebuild/{imageId}", requirements={"id" = "\d+", "imageId" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function rebuildAction(Server $server, $imageId)
    {
        return $this->api()->rebuild($server->getId(), $imageId);
    }

    /**
     * Power Cycle
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/cycle", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function powerCycleAction(Server $server)
    {
        return $this->api()->powerCycle($server->getId());
    }

    /**
     * Power Off
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/poweroff", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function powerOffAction(Server $server)
    {
        return $this->api()->powerOff($server->getId());
    }

    /**
     * Power On
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/poweron", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function powerOnAction(Server $server)
    {
        return $this->api()->powerOn($server->getId());
    }

    /**
     * Shutdown
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/shutdown", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function shutdownAction(Server $server)
    {
        return $this->api()->shutdown($server->getId());
    }

    /**
     * Reset Passwors
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/resetpwd", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function resetPasswordAction(Server $server)
    {
        return $this->api()->passwordReset($server->getId());
    }

    /**
     * Reset Passwors
     * NOTE: https://www.digitalocean.com/community/questions/singapore-dc-fast-resize
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/resize", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function resizeAction(Server $server, Request $request)
    {
        return $this->api()->resize($server->getId(), $request->get('size'));
    }

    /**
     * Snapshot
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/snapshot", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function snapshotAction(Server $server, Request $request)
    {
        return $this->api()->snapshot($server->getId(), $request->get('name'));
    }

    /**
     * Snapshots
     * -------------------------------------------------
     * @Rest\View(statusCode=201)
     * @Rest\Get("servers/{id}/snapshots", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function snapshotsAction(Server $server)
    {
        return $this->api()->getSnapshots($server->getId());
    }

    /**
     * Backups
     * -------------------------------------------------
     * @Rest\View(statusCode=200)
     * @Rest\Get("servers/{id}/backups", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function backupsAction(Server $server)
    {
        return $this->api()->getBackups($server->getId());
    }

    /**
     * Kernels
     * -------------------------------------------------
     * @Rest\View(statusCode=200)
     * @Rest\Get("servers/{id}/kernels", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function kernelsAction(Server $server)
    {
        return $this->api()->getAvailableKernels($server->getId());
    }

    /**
     * Change Kernel
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/kernels/{kernelId}", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function changeKernelAction(Server $server, $kernelId)
    {
        if ($kernelId === 'origin') {
            $kernel = $server->getKernel();

            if (empty($kernel) or empty($kernel['id'])) {
                throw new BadRequestHttpException("Sorry not found original kernel.");
            }

            $kernelId = $kernel['id'];
        }

        if (!is_numeric($kernelId)) {
            throw new BadRequestHttpException("Unknow kernel to update.");
        }

        return $this->api()->changeKernel($server->getId(), $kernelId);
    }

    /**
     * Enable IPv6
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/enableipv6", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function enableIPv6Action(Server $server)
    {
        return $this->api()->enableIpv6($server->getId());
    }

    /**
     * Enable Private Networking
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/enableprivatenetworking", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function enablePrivateNetworkingAction(Server $server)
    {
        return $this->api()->enablePrivateNetworking($server->getId());
    }

    /**
     * Disable Backup
     * to enable back not support yet, but can
     * https://www.digitalocean.com/community/questions/how-to-enable-backup-in-a-droplet
     * -------------------------------------------------
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Put("servers/{id}/disablebackups", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function disableBackupsAction(Server $server)
    {
        return $this->api()->disableBackups($server->getId());
    }

    /**
     * Reset local infomation with Remote
     * This use when we get some error
     * during process action
     * -------------------------------------------------
     * @Rest\View()
     * @Rest\Get("servers/{id}/sync", requirements={"id" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function syncAction(Server $server)
    {
        return $this->sync($server->getId());
    }

    /**
     * Rest\View()
     * Rest\Get("servers/test")
     */
    public function testAction()
    {
        $validator = $this->get('validator');
        $server    = new Server();

        try {

            $server
                ->setId(1586418)
                ->setName('Test')
                ->setSize('somting')
                ->setStatus('new')
                ->setPriceHourly(0.7)
                ->setPriceMonthly(0.7)
                ->save($this->getEntityManager(), $validator);

            return $server;
        } catch (EntityValidatorException $e) {
            return $e->getErrors();
        } catch (\Exception $exception) {
            throw $exception;
        }
    }
}


/**
 * https://www.digitalocean.com/community/tutorials/digitalocean-backups-and-snapshots-explained
 * https://www.digitalocean.com/community/questions/how-to-enable-backup-in-a-droplet
 * https://github.com/digitaloceancloud/api-v2/issues/50 To check backup is enable
 */