<?php
namespace DON\CloudBundle\DoApi\Entity;

use DigitalOceanV2\Entity\Droplet as BaseDroplet;
use DigitalOceanV2\Entity\Kernel;
use DON\CloudBundle\Entity\Server;

class Droplet extends BaseDroplet
{
    const FEATURE_VIRTIO             = 'virtio';
    const FEATURE_BACKUPS            = 'backups';
    const FEATURE_IPV6               = 'ipv6';
    const FEATURE_PRIVATE_NETWORKING = 'private_networking';

    /**
     * @var Kernel
     */
    public $originalKernel;

    public function __construct(BaseDroplet $droplet, Server $server)
    {
        foreach (get_object_vars($droplet) as $property => $value) {
            $this->$property = $value;
        }

        $this->originalKernel = new Kernel($server->getKernel());
    }
}