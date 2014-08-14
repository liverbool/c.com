<?php

namespace DON\CloudBundle\Controller;

use Magice\Bundle\RestBundle\Controller\RestController;
use Magice\Bundle\RestBundle\Annotation as Rest;

abstract class DigitalController extends RestController
{
    protected function mock($file)
    {
        if (is_array($file) or is_object($file)) {
            return $file;
        }

        $path = $this->container->getParameter('kernel.root_dir');
        $path = $path . '/../src/DON/CloudBundle/Resources/mock/' . $file;

        return json_decode(file_get_contents($path), true);
    }

    protected function parameterResolver($method, $context, $object)
    {
        $reflection1 = new \ReflectionMethod(get_class($context), $method);
        $reflection2 = new \ReflectionClass($object);
        $parameters  = array();

        foreach ($reflection1->getParameters() as $param) {
            $name  = $param->getName();
            $value = $param->isDefaultValueAvailable() ? $param->getDefaultValue() : null;

            // Must have getter method!!
            if ($reflection2->hasProperty($name)) {
                $getter = 'get' . $name;
                $value  = $object->$getter();
            }

            if (is_null($value) && $param->isArray()) {
                $value = array();
            }

            $parameters[] = $value;
        }

        return $parameters;
    }

    /**
     * @param string|object $serviceOrId #Service
     * @param string        $method
     * @param object        $object
     *
     * @return mixed
     */
    protected function actionCreator($serviceOrId, $method, $object)
    {
        $context = is_string($serviceOrId) ? $this->get($serviceOrId) : $serviceOrId;
        return call_user_func_array(
            array($context, $method),
            $this->parameterResolver($method, $context, $object)
        );
    }

    /**
     * @param $id
     *
     * @return \DON\CloudBundle\Entity\Server
     */
    protected function getServer($id)
    {
        return $this->getDomainManager()->findNotFound('do.repository.server', $id);
    }

    /**
     * @return array|\DON\CloudBundle\Entity\Server[]
     */
    protected function getServers()
    {
        return $this->get('do.repository.server')->findByUser($this->getUser());
    }

    /**
     * @param string $name
     *
     * @return \DON\CloudBundle\Entity\Server
     */
    protected function getServerByName($name)
    {
        return $this->get('do.repository.server')->findByName($name);
    }

    protected function checkAvailableName($name)
    {
        if ($this->getServerByName($name)) {
            throw new \InvalidArgumentException(sprintf("This name (%s) is already in use.", $name));
        } else {
            return $name;
        }
    }

    protected function disableSoftDelete()
    {
        $this->getEntityManager()->getFilters()->disable('softdeleteable');
    }

    protected function enableSoftDelete()
    {
        $this->getEntityManager()->getFilters()->enable('softdeleteable');
    }
}
