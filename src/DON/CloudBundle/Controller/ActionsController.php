<?php

namespace DON\CloudBundle\Controller;

use Magice\Bundle\RestBundle\Annotation as Rest;

class ActionsController extends DigitalController
{
    private function api()
    {
        return $this->get('do.action');
    }

    /**
     * @Rest\View()
     * @Rest\Get("actions")
     */
    public function allAction()
    {
        return $this->mock('actions.json');
        //return $this->api()->getAll();
    }

    /**
     * @Rest\View()
     * @Rest\Get("actions/{id}")
     */
    public function readAction($id)
    {
        # this's good reason for delay sending request to digitalOcean
        # to prevent increase limitRate
        sleep(rand(0, 5));

        return $this->api()->getById($id);

        $action = $this->mock('action.json');

        $action['status'] = 'in-progress';
        $action['status'] = 'completed';
        //$action['status'] = 'errored';

        return $action;
    }
}
