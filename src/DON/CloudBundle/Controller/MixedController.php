<?php

namespace DON\CloudBundle\Controller;

use Magice\Bundle\RestBundle\Annotation as Rest;
use Symfony\Component\HttpFoundation\Request;

class MixedController extends DigitalController
{
    /**
     * @Rest\View()
     * @Rest\Get("creators")
     */
    public function creatorsAction(Request $request)
    {
        //return $this->mock('mixed.json');

        $regions = $this->get('do.region')->getAll();
        $sizes = $this->get('do.size')->getAll();
        $images = $this->get('do.image')->getAll();
        #$droplets = $this->get('do.droplet')->getAll();
        $creator = array();

        $this->disableSoftDelete();
        $servers = $this->get('do.repository.server')->findByUser($this->getUser());
        $this->enableSoftDelete();

        $privates = array();
        $backups = array();

        foreach ($servers as $server) {
            $privates = array_merge($privates, (array)$server->getSnapshots());

            if (!$server->isDeleted()) {
                $backups = $this->get('do.droplet')->getBackups($server->getId());
            }

        }

        foreach ($regions as &$region) {
            // Use only singapore
            if ($region->slug !== 'sgp1') {
                continue;
            }

            # convert to array to allow to add new property
            $creator = (array)$region;
            $creator['sizes'] = array();
            $creator['backups'] = $backups;

            foreach ($sizes as $size) {
                if (in_array($size->slug, $region->sizes)) {
                    $creator['sizes'][] = $size;
                }
            }

            $features = array();
            foreach ($creator['features'] as $feature) {
                switch ($feature) {
                    case 'virtio':
                        // enable by default
                        //$creator['features'][] = ['slug' => $feature, 'name' => 'Enable VirtIO'];
                        break;
                    case 'private_networking':
                        $features[] = ['slug' => $feature, 'name' => 'Private Networking'];
                        break;
                    case 'backups':
                        $features[] = ['slug' => $feature, 'name' => 'Enable Backups'];
                        break;
                    case 'ipv6':
                        $features[] = ['slug' => $feature, 'name' => 'IPv6'];
                        break;
                }
            }

            $creator['features'] = $features;
            $creator['images'] = array();
            $creator['privates'] = array();
            $creator['dists'] = array();

            foreach ($images as $image) {
                if (in_array($region->slug, $image->regions)) {
                    // prevent print unnecessary
                    unset($image->actionIds);
                    unset($image->regions);

                    if ($image->public) {
                        $dist = strtolower(preg_replace('/\W/', '', $image->distribution));
                        $creator['dists'][$dist] = ['slug' => $dist, 'name' => $image->distribution];
                        $creator['images'][$dist][] = $image;
                    } else {
                        if (in_array($image->id, $privates)) {
                            $creator['privates'][] = $image;
                        } else {
                            // TODO: shared images
                        }
                    }
                }
            }

            # just reset array key to number
            $creator['dists'] = array_values($creator['dists']);
        }

        return [$creator];
    }

    /**
     * @Rest\View()
     * @Rest\Get("regions")
     */
    public function regionsAction()
    {
        //return $this->mock('regions.json');
        return $this->get('do.region')->getAll();
    }

    /**
     * @Rest\View()
     * @Rest\Get("sizes")
     */
    public function sizesAction()
    {
        //return $this->mock('sizes.json');
        return $this->get('do.size')->getAll();
    }

    /**
     * @Rest\View()
     * @Rest\Get("limit")
     */
    public function rateLimitAction()
    {
        //return $this->mock('sizes.json');
        return $this->get('do.limit')->getRateLimit();
    }
}
