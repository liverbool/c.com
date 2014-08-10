<?php
namespace DON\CloudBundle\EventListener;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use DON\CloudBundle\Entity\Server;
use DON\CloudBundle\Entity\ServerError;
use DON\CloudBundle\Entity\SSHKey;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Security\Acl\Domain\ObjectIdentity;
use Symfony\Component\Security\Acl\Domain\UserSecurityIdentity;
use Symfony\Component\Security\Acl\Exception\AclAlreadyExistsException;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;

class EntityAclListener implements EventSubscriber
{
    /**
     * @var \Symfony\Component\DependencyInjection\ContainerInterface
     */
    private $container;

    /**
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function getSubscribedEvents()
    {
        return array(
            'prePersist',
            'postPersist',
        );
    }

    /**
     * @return mixed
     * @throws \LogicException
     */
    private function getUser()
    {
        if (!$this->container->has('security.context')) {
            throw new \LogicException('The SecurityBundle is not registered in your application.');
        }

        if (null === $token = $this->container->get('security.context')->getToken()) {
            return null;
        }

        if (!is_object($user = $token->getUser())) {
            return null;
        }

        return $user;
    }

    private function isSupportedClass($key, $object)
    {
        $classes = array(
            'set_user' => array(Server::CLASS, ServerError::CLASS, SSHKey::CLASS),
            'set_acl'  => array(Server::CLASS, SSHKey::CLASS)
        );

        return in_array(get_class($object), $classes[$key]);
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        // add others instance if you want
        if ($this->isSupportedClass('set_user', $entity)) {
            if (empty($entity->getUser())) {
                $entity->setUser($this->getUser());
            }
        }
    }

    public function postPersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        // add others instance if you want
        if ($this->isSupportedClass('set_acl', $entity)) {

            $aclProvider      = $this->container->get('security.acl.provider');
            $securityIdentity = UserSecurityIdentity::fromAccount($this->getUser());
            $objectIdentity   = ObjectIdentity::fromDomainObject($entity);

            try {
                $acl = $aclProvider->createAcl($objectIdentity);
            } catch (AclAlreadyExistsException $e) {
                $acl = $aclProvider->findAcl($objectIdentity);
            }

            $acl->insertObjectAce($securityIdentity, MaskBuilder::MASK_OWNER);
            $aclProvider->updateAcl($acl);
        }
    }

}