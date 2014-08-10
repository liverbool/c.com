<?php

namespace DON\CloudBundle\Controller;

use Magice\Bundle\RestBundle\Annotation as Rest;

class MixedController extends DigitalController
{
    /**
     * @Rest\View()
     * @Rest\Get("creators")
     */
    public function creatorsAction()
    {
        return $this->mock('mixed.json');

        $regions = $this->get('do.region')->getAll();
        $sizes   = $this->get('do.size')->getAll();
        $images  = $this->get('do.image')->getAll();
        #$droplets = $this->get('do.droplet')->getAll();
        $creator = array();

        foreach ($regions as &$region) {
            // Use only singapore
            if ($region->slug !== 'sgp1') {
                continue;
            }

            # convert to array to allow to add new property
            $creator          = (array) $region;
            $creator['sizes'] = array();

            foreach ($sizes as $size) {
                if (in_array($size->slug, $region->sizes)) {
                    $creator['sizes'][] = $size;
                }
            }

            foreach ($creator['features'] as &$feature) {
                switch ($feature) {
                    case 'virtio':
                        // enable by default
                        //$feature = ['slug' => $feature, 'name' => 'Enable VirtIO'];
                        break;
                    case 'private_networking':
                        $feature = ['slug' => $feature, 'name' => 'Private Networking'];
                        break;
                    case 'backups':
                        $feature = ['slug' => $feature, 'name' => 'Enable Backups'];
                        break;
                    case 'ipv6':
                        $feature = ['slug' => $feature, 'name' => 'IPv6'];
                        break;
                }
            }

            $creator['images'] = array();
            $creator['dists']  = array();

            foreach ($images as $image) {
                if (in_array($region->slug, $image->regions)) {
                    # TODO: check dist is MyImages
                    $dist                       = strtolower(preg_replace('/\W/', '', $image->distribution));
                    $creator['dists'][$dist]    = ['slug' => $dist, 'name' => $image->distribution];
                    $creator['images'][$dist][] = $image;
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
