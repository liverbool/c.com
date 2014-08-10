<?php

namespace DON\CloudBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use DON\CloudBundle\Action\Creator;
use Symfony\Component\HttpFoundation\Request;

/**
 * ServerError
 * @ORM\Table(name="do_server_error")
 * @ORM\Entity(repositoryClass="DON\CloudBundle\Entity\ServerErrorRepository")
 */
class ServerError
{
    use TimestampableEntity;

    /**
     * @var integer
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var Creator
     * @ORM\Column(name="creator", type="object")
     */
    private $creator;

    /**
     * @var string
     * @ORM\Column(name="code", type="string", length=10)
     */
    private $code;

    /**
     * @var string
     * @ORM\Column(name="message", type="string", length=255)
     */
    private $message;

    /**
     * @var string
     * @ORM\Column(name="agent", type="text")
     */
    private $agent;

    /**
     * @var string
     * @ORM\Column(name="ip", type="string", length=11)
     */
    private $ip;

    /**
     * @var array
     * @ORM\Column(name="ips", type="array")
     */
    private $ips;

    /**
     * @var string
     * @ORM\Column(name="trace", type="text")
     */
    private $trace;

    /**
     * @var Request
     * @ORM\Column(name="request", type="object")
     */
    private $request;

    /**
     * @var \Magice\Bundle\ClientUserBundle\Entity\User
     * @ORM\ManyToOne(targetEntity="Magice\Bundle\ClientUserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
     */
    private $user;

    /**
     * @var \DON\CloudBundle\Entity\Server
     * @ORM\ManyToOne(targetEntity="DON\CloudBundle\Entity\Server")
     * @ORM\JoinColumn(name="server_id", referencedColumnName="id", nullable=true)
     */
    private $server;

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
     * @return ServerError
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
     * Set creator
     *
     * @param Creator $creator
     *
     * @return ServerError
     */
    public function setCreator($creator)
    {
        $this->creator = $creator;

        return $this;
    }

    /**
     * Get creator
     * @return Creator
     */
    public function getCreator()
    {
        return $this->creator;
    }

    /**
     * Set code
     *
     * @param string $code
     *
     * @return ServerError
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * Set message
     *
     * @param string $message
     *
     * @return ServerError
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * Get message
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Set agent
     *
     * @param string $agent
     *
     * @return ServerError
     */
    public function setAgent($agent)
    {
        $this->agent = $agent;

        return $this;
    }

    /**
     * Get agent
     * @return string
     */
    public function getAgent()
    {
        return $this->agent;
    }

    /**
     * Set ip
     *
     * @param string $ip
     *
     * @return ServerError
     */
    public function setIp($ip)
    {
        $this->ip = $ip;

        return $this;
    }

    /**
     * Get ip
     * @return string
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * Set trace
     *
     * @param string $trace
     *
     * @return ServerError
     */
    public function setTrace($trace)
    {
        $this->trace = $trace;

        return $this;
    }

    /**
     * Get trace
     * @return string
     */
    public function getTrace()
    {
        return $this->trace;
    }

    /**
     * @param array $ips
     *
     * @return $this
     */
    public function setIps($ips)
    {
        $this->ips = $ips;

        return $this;
    }

    /**
     * @return array|null
     */
    public function getIps()
    {
        return $this->ips;
    }

    /**
     * @param mixed $request
     *
     * @return $this
     */
    public function setRequest($request)
    {
        $this->request = $request;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getRequest()
    {
        return $this->request;
    }

    /**
     * @param \DON\CloudBundle\Entity\Server $server
     *
     * @return $this
     */
    public function setServer($server)
    {
        $this->server = $server;

        return $this;
    }

    /**
     * @return \DON\CloudBundle\Entity\Server
     */
    public function getServer()
    {
        return $this->server;
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
