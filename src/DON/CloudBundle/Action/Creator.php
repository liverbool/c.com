<?php
namespace DON\CloudBundle\Action;

use JMS\Serializer\Annotation as JMS;

/**
 * @see https://developers.digitalocean.com/#create-a-new-droplet
 */
class Creator extends AbstractAction
{
    const DEFAULT_REGION = 'sgp1';

    /**
     * @var string
     * @JMS\Type("string")
     */
    private $name;

    /**
     * @var string
     * @JMS\Type("string")
     */
    private $region = self::DEFAULT_REGION;

    /**
     * @var string
     * @JMS\Type("string")
     */
    private $size;

    /**
     * @var string
     * @JMS\Type("string")
     */
    private $image;

    /**
     * @var boolean
     * @JMS\Type("boolean")
     */
    private $backups = false;

    /**
     * @var boolean
     * @JMS\Type("boolean")
     */
    private $ipv6;

    /**
     * @var boolean
     * @JMS\Type("boolean")
     */
    private $privateNetworking;

    /**
     * @var array
     * @JMS\Type("array")
     */
    private $sshKeys;

    /**
     * @param boolean $backups
     *
     * @return $this
     */
    public function setBackups($backups)
    {
        $this->backups = $backups;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getBackups()
    {
        return $this->backups;
    }

    /**
     * @param string $image
     *
     * @return $this
     */
    public function setImage($image)
    {
        $this->image = $image;
        return $this;
    }

    /**
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param boolean $ipv6
     *
     * @return $this
     */
    public function setIpv6($ipv6)
    {
        $this->ipv6 = $ipv6;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getIpv6()
    {
        return $this->ipv6;
    }

    /**
     * @param string $name
     *
     * @return $this
     */
    public function setName($name)
    {
        $this->name = strtolower($name);

        return $this;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param boolean $privateNetworking
     *
     * @return $this
     */
    public function setPrivateNetworking($privateNetworking)
    {
        $this->privateNetworking = $privateNetworking;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getPrivateNetworking()
    {
        return $this->privateNetworking;
    }

    /**
     * @param string $region
     *
     * @return $this
     */
    public function setRegion($region)
    {
        $this->region = $region;

        return $this;
    }

    /**
     * @return string
     */
    public function getRegion()
    {
        return $this->region;
    }

    /**
     * @param string $size
     *
     * @return $this
     */
    public function setSize($size)
    {
        $this->size = $size;
        return $this;
    }

    /**
     * @return string
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * @param array $sshKeys
     *
     * @return $this
     */
    public function setSshKeys($sshKeys)
    {
        $this->sshKeys = $sshKeys;
        return $this;
    }

    /**
     * @return array
     */
    public function getSshKeys()
    {
        return $this->sshKeys;
    }

}