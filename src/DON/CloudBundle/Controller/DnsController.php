<?php

namespace DON\CloudBundle\Controller;

use DON\CloudBundle\Entity\Domain;
use Magice\Bundle\RestBundle\Annotation as Rest;
use Symfony\Component\HttpFoundation\Request;

class DnsController extends DigitalController
{
    const A = 'A';
    const NS = 'NS';
    const MX = 'MX';
    const TXT = 'TXT';
    const SRV = 'SRV';
    const AAAA = 'AAAA';
    const CNAME = 'CNAME';

    private function api()
    {
        return $this->get('do.dns');
    }

    /**
     * @Rest\View()
     * @Rest\Get("dns/{domain}", requirements={"domain" = "\d+"})
     * @Rest\Acl({"OWNER", "domain"})
     */
    public function getAction(Domain $domain)
    {
        $records = $this->api()->getAll($domain->getName());
        $dns = array();

        foreach ($records as $rec) {
            if (preg_match('/\.DIGITALOCEAN\.COM/i', $rec->data)) {
                continue;
            }

            $rec = (array)$rec;
            $rec['domain'] = $domain->getId();
            $dns[] = $rec;
        }

        return $dns;
    }

    /**
     * @Rest\View(statusCode=200)
     * @Rest\Delete("dns/{domain}", requirements={"domain" = "\d+"})
     * @Rest\Acl({"OWNER", "domain"})
     */
    public function deleteAction(Domain $domain, Request $request)
    {
        $ids = json_decode($request->getContent());
        foreach($ids as $id) {
            $this->api()->delete($domain->getName(), $id);
        }
    }

    /**
     * @Rest\View()
     * @Rest\Post("dns/{domain}/gmail")
     * @Rest\Acl({"OWNER", "domain"})
     */
    public function createGmailAction(Domain $domain)
    {
        $name = $domain->getName();
        $this->api()->create($name, self::MX, null, 'ASPMX.L.GOOGLE.COM.', 1);
        $this->api()->create($name, self::MX, null, 'ALT1.ASPMX.L.GOOGLE.COM.', 5);
        $this->api()->create($name, self::MX, null, 'ALT2.ASPMX.L.GOOGLE.COM.', 5);
        $this->api()->create($name, self::MX, null, 'ASPMX2.GOOGLEMAIL.COM.', 10);
        $this->api()->create($name, self::MX, null, 'ASPMX3.GOOGLEMAIL.COM.', 10);

        return array(true);
    }

    /**
     * @Rest\View()
     * @Rest\Post("dns/{domain}/{type}")
     * @Rest\Acl({"OWNER", "domain"})
     */
    public function createAction(Domain $domain, $type, Request $request)
    {
        return $this->api()->create(
            $domain->getName(),
            $type,
            $request->get('name'),
            $request->get('data'),
            $request->get('priority'),
            $request->get('port'),
            $request->get('weight')
        );
    }
}
