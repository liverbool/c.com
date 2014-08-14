<?php

namespace DON\CloudBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * Server
 * @ORM\Table(name="do_server")
 * @ORM\Entity(repositoryClass="DON\CloudBundle\Entity\ServerRepository")
 * @Gedmo\SoftDeleteable(fieldName="deletedAt", timeAware=false)
 */
class Server
{
    use TimestampableEntity;
    use SoftDeleteableEntity;

    /**
     * @var integer
     * @ORM\Id
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     * @ORM\Column(name="size", type="string", length=50)
     */
    private $size;

    /**
     * @var string
     * @ORM\Column(name="ip", type="string", length=15, nullable=true)
     */
    private $ip;

    /**
     * @var string
     * @ORM\Column(name="status", type="string", length=20)
     */
    private $status;

    /**
     * @var array original kernel (at create)
     * @ORM\Column(name="kernel", type="array", nullable=true)
     */
    private $kernel;

    /**
     * @var array original image (at create) use for check Recently Destroyed Droplets
     * @ORM\Column(name="image", type="array", nullable=true)
     */
    private $image;

    /**
     * @var array use when droplet was deleted there snapshots is not deleted
     * when we want try to check availible snapshots for each user we will retrive from deleted droplet too
     * @ORM\Column(name="snapshots", type="array", nullable=true)
     */
    private $snapshots;

    /**
     * @var float
     * @ORM\Column(name="price_create", type="decimal", precision=2)
     */
    private $priceCreate = 0.07;

    /**
     * @var float
     * @ORM\Column(name="price_monthly", type="decimal", precision=2)
     */
    private $priceMonthly;

    /**
     * @var float
     * @ORM\Column(name="price_hourly", type="decimal", precision=2)
     */
    private $priceHourly;

    /**
     * @var \Magice\Bundle\ClientUserBundle\Entity\User
     * @ORM\ManyToOne(targetEntity="Magice\Bundle\ClientUserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @param $id
     *
     * @return $this
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set ip
     *
     * @param string $ip
     * @return $this
     */
    public function setIp($ip)
    {
        $this->ip = $ip;

        return $this;
    }

    /**
     * Get ip
     *
     * @return string
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * @param string $status
     *
     * @return $this
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param array $kernel
     *
     * @return $this
     */
    public function setKernel($kernel)
    {
        $this->kernel = $kernel;

        return $this;
    }

    /**
     * @return array
     */
    public function getKernel()
    {
        return $this->kernel;
    }

    /**
     * @param array $image
     *
     * @return $this
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return array
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param array $snapshots
     *
     * @return $this
     */
    public function setSnapshots($snapshots)
    {
        $this->snapshots = $snapshots;

        return $this;
    }

    /**
     * @return array
     */
    public function getSnapshots()
    {
        return $this->snapshots;
    }

    /**
     * @param float $priceCreate
     *
     * @return $this
     */
    public function setPriceCreate($priceCreate)
    {
        $this->priceCreate = $priceCreate;

        return $this;
    }

    /**
     * @return float
     */
    public function getPriceCreate()
    {
        return $this->priceCreate;
    }

    /**
     * @param float $priceHourly
     *
     * @return $this
     */
    public function setPriceHourly($priceHourly)
    {
        $this->priceHourly = $priceHourly;

        return $this;
    }

    /**
     * @return float
     */
    public function getPriceHourly()
    {
        return $this->priceHourly;
    }

    /**
     * @param float $priceMonthly
     *
     * @return $this
     */
    public function setPriceMonthly($priceMonthly)
    {
        $this->priceMonthly = $priceMonthly;

        return $this;
    }

    /**
     * @return float
     */
    public function getPriceMonthly()
    {
        return $this->priceMonthly;
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
     * @param \Magice\Bundle\ClientUserBundle\Entity\User
     *
     * @return $this
     */
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return \Magice\Bundle\ClientUserBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }
}
