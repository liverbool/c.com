<?php

namespace DON\CloudBundle\Controller;

use Magice\Bundle\RestBundle\Annotation as Rest;

class DnsController extends DigitalController
{
    const A     = 'A';
    const NS    = 'NS';
    const MX    = 'MX';
    const TXT   = 'TXT';
    const SRV   = 'SRV';
    const AAAA  = 'AAAA';
    const CNAME = 'CNAME';

    private function api()
    {
        return $this->get('do.dns');
    }

    /**
     * @Rest\View()
     * @Rest\Get("dns/{domain}/{id}")
     */
    public function getAction($domain, $id)
    {
        //return $this->mock('dnses.json');
        return $this->api()->getById($domain, $id);
    }

    /**
     * @Rest\View()
     * @Rest\Post("dns/{$domain}")
     */
    public function createAction($domain)
    {
        //$this->api()->create('dn.joyprice.com', 'CNAME', 'abc');
    }
}
