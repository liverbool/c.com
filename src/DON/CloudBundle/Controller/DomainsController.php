<?php

namespace DON\CloudBundle\Controller;

use Magice\Bundle\RestBundle\Annotation as Rest;

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
        //return $this->mock('domains.json');
        return $this->api()->getAll();
    }

    /**
     * @Rest\View(statusCode=201)
     * @Rest\Post("domains")
     * @Rest\Get("domains/create")
     */
    public function createAction($name, $ipAddress)
    {
        //return $this->mock('domain.json');
        return $this->api()->create($name, $ipAddress);
    }

    /**
     * @Rest\View()
     * @Rest\Get("domains/{domain}")
     */
    public function readAction($domain)
    {
        //return $this->mock('domain.json');
        return $this->api()->getByName($domain);
    }

    /**
     * @Rest\View(statusCode=204)
     * @Rest\Delete("domains/{domain}")
     * @Rest\Get("domains/{domain}/delete")
     */
    public function deleteAction($domain)
    {
        //return $this->mock('domain.json');
        $this->api()->delete($domain);
    }
}
