<?php

namespace DON\CloudBundle\Controller;

use DigitalOceanV2\Exception\ResponseException;
use DON\CloudBundle\Entity\Domain;
use Magice\Bundle\RestBundle\Annotation as Rest;
use Magice\Bundle\RestBundle\Domain\ManagerException;
use Symfony\Component\HttpFoundation\Request;

class DomainsController extends DigitalController
{
    private function api()
    {
        return $this->get('do.domain');
    }

    /**
     * @Rest\View()
     * @Rest\Get("domains")
     */
    public function getAction()
    {
        $domains = $this->get('do.repository.domain')->findByUser($this->getUser());
        $domainAll = array();

        foreach ($domains as $domain) {
            try {
                $this->api()->getByName($domain->getName());
                $domainAll[] = $domain;
            } catch (ResponseException $e) {
                if ($e->getErrorId() === 'NOT_FOUND') {
                    $this->getDomainManager()->delete($domain);
                }
            }
        }

        return $domainAll;
    }

    /**
     * @Rest\View(statusCode=201)
     * @Rest\Post("domains")
     */
    public function createAction(Request $request)
    {
        $name = $request->get('name');
        $ip = $request->get('ip');
        $dm = $this->getDomainManager();

        $domain = new Domain();
        $domain->setName($name);
        $domain->setIp($ip);

        try {
            $dm->validate($domain);
            $this->api()->create($name, $ip);
            $dm->save();

            return $domain;
        } catch (ManagerException $e) {
            return $e->getErrors();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * @Rest\View()
     * @Rest\Get("domains/{id}", requirements={"id" = "\d+"})
     * @Rest\Acl({"OWNER", "domain"})
     */
    public function readAction(Domain $domain)
    {
        // try to get for throw
        $this->api()->getByName($domain->getName());

        return $domain;
    }

    /**
     * @Rest\View(statusCode=204)
     * @Rest\Delete("domains/{id}", requirements={"id" = "\d+"})
     * @Rest\Acl({"OWNER", "domain"})
     */
    public function deleteAction(Domain $domain)
    {
        $dm = $this->getDomainManager();

        $dm->resource($domain)->begin()->delete();

        try {
            $this->api()->delete($domain->getName());
            $dm->commit();
        } catch (\Exception $e) {
            $dm->rollback();

            throw $e;
        }
    }
}
