<?php

namespace DON\CloudBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * SSHKey
 * @ORM\Table(name="do_ssh_key")
 * @ORM\Entity(repositoryClass="DON\CloudBundle\Entity\SSHKeyRepository")
 * @Gedmo\SoftDeleteable(fieldName="deletedAt")
 */
class SSHKey
{
    use TimestampableEntity;

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
     * @ORM\Column(name="fingerprint", type="string", length=255, nullable=true)
     */
    private $fingerPrint;

    /**
     * @var string
     * @ORM\Column(name="public_key", type="text")
     */
    private $publicKey;

    /**
     * @var \DateTime
     * @ORM\Column(name="deletedAt", type="datetime", nullable=true)
     */
    private $deletedAt;

    /**
     * @var boolean
     * --ORM\Column(name="deleted", type="boolean", nullable=true)
     */
    private $deleted;

    /**
     * @var \Magice\Bundle\ClientUserBundle\Entity\User
     * @ORM\ManyToOne(targetEntity="Magice\Bundle\ClientUserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * Set Id
     *
     * @param int $id
     *
     * @return SSHKey
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
     * @return SSHKey
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
     * @param string $fingerPrint
     *
     * @return SSHKey
     */
    public function setFingerPrint($fingerPrint)
    {
        $this->fingerPrint = $fingerPrint;

        return $this;
    }

    /**
     * @return string
     */
    public function getFingerPrint()
    {
        return $this->fingerPrint;
    }

    /**
     * Set publicKey
     *
     * @param string $publicKey
     *
     * @return SSHKey
     */
    public function setPublicKey($publicKey)
    {
        $this->publicKey = $publicKey;

        return $this;
    }

    /**
     * Get publicKey
     * @return string
     */
    public function getPublicKey()
    {
        return $this->publicKey;
    }

    /**
     * Set deletedAt
     *
     * @param \DateTime $deletedAt
     *
     * @return SSHKey
     */
    public function setDeletedAt($deletedAt)
    {
        $this->deletedAt = $deletedAt;
        $this->deleted = !!$deletedAt;

        return $this;
    }

    /**
     * Get deletedAt
     * @return \DateTime
     */
    public function getDeletedAt()
    {
        return $this->deletedAt;
    }

    /**
     * Set deleted
     *
     * @param boolean $deleted
     *
     * @return SSHKey
     */
    public function setDeleted($deleted)
    {
        $this->deleted = $deleted;

        $this->setDeletedAt($deleted ? new \DateTime() : null);

        return $this;
    }

    /**
     * Get deleted
     * @return boolean
     */
    public function getDeleted()
    {
        return !!$this->deletedAt;
    }

    /**
     * @param \Magice\Bundle\ClientUserBundle\Entity\User $user
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
