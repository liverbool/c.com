<?php
namespace DON\CloudBundle\DoApi;

use DigitalOceanV2\Entity\Action;

class Droplet extends \DigitalOceanV2\Api\Droplet
{
    /**
     * @param  integer $id
     * @param  string  $name
     *
     * @throws \RuntimeException
     * @return Action
     */
    public function snapshot($id, $name)
    {
        return $this->executeAction($id, array('type' => 'snapshot', 'name' => $name));
    }

    /**
     * @param  integer           $id
     * @param  array             $options
     * @throws \RuntimeException
     * @return Action
     */
    private function executeAction($id, array $options){
        $headers = array('Content-Type: application/json');
        $content = json_encode($options);

        $action = $this->adapter->post(sprintf('%s/droplets/%d/actions', self::ENDPOINT, $id), $headers, $content);
        $action = json_decode($action);

        return new Action($action->action);
    }
}