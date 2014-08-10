<?php

namespace DON\CloudBundle\Controller;

use DON\CloudBundle\Action\Creator;
use DON\CloudBundle\Entity\Server;
use DON\CloudBundle\Exception\ResponseException;
use Magice\Bundle\RestBundle\Annotation as Rest;
use Symfony\Component\HttpFoundation\Request;

class ImagesController extends DigitalController
{
    private function api()
    {
        return $this->get('do.image');
    }

    /**
     * @param \Exception $exception
     * @param Server     $server
     *
     * @throws \DON\CloudBundle\Exception\ResponseException
     * @throws \Exception
     */
    private function exceptionHandle(\Exception $exception, Server $server)
    {
        if ($exception instanceof ResponseException) {
            // super make sure droplet deleted
            if ($exception->getErrorId() === 'NOT_FOUND') {
                $server->remove($this->getEntityManager());
                return;
            } else {
                throw $exception;
            }
        }

        throw $exception;
    }

    /**
     * Public Images
     * @Rest\View()
     * @Rest\Get("images")
     */
    public function getAction()
    {
        # TODO: order by name
        $images = array();
        foreach ($this->api()->getAll() as $image) {
            if ($image->public and in_array(Creator::DEFAULT_REGION, $image->regions)) {
                $images[] = $image;
            }
        }

        return $images;
    }

    /**
     * Super Private Images
     * @Rest\View()
     * @Rest\Get("images/me")
     * @Rest\Get("images/me/{type}")
     */
    public function myImagesAction($type = null, Request $request)
    {
        $type    = $type ? : $request->query->get('type');
        $images  = array();
        $servers = $this->getServers();

        if (empty($servers)) {
            return $images;
        }

        foreach ($servers as $server) {

            try {
                $backups = $this->get('do.droplet')->getBackups($server->getId());
                if ($type !== 'snapshot' && !empty($backups)) {
                    foreach ($backups as $img) {
                        $img              = (array) $img;
                        $img['machine']   = array('id' => $server->getId(), 'name' => $server->getName());
                        $img['machineId'] = $server->getId();
                        $img['type']      = 'backup';
                        $images[]         = $img;
                    }
                }
            } catch (\Exception $exception) {
                $this->exceptionHandle($exception, $server);
            }


            if ($type !== 'backup' && !empty($server->getSnapshots())) {
                try {
                    $snapshots = $this->get('do.droplet')->getSnapshots($server->getId());
                    if (!empty($snapshots)) {
                        foreach ($snapshots as $img) {
                            $img              = (array) $img;
                            $img['machine']   = array('id' => $server->getId(), 'name' => $server->getName());
                            $img['machineId'] = $server->getId();
                            $img['type']      = 'snapshot';
                            $images[]         = $img;
                        }
                    } else {
                        // super make sure!
                        $server->setSnapshots(null)->save($this->getEntityManager());
                    }
                } catch (\Exception $exception) {
                    $this->exceptionHandle($exception, $server);
                }
            }
        }

        // try to get from deleted droplets
        if ($type !== 'backup') {
            $this->disableSoftDelete();

            $servers = $this->get('do.repository.server')->findDeletedByUser($this->getUser());

            if (!empty($servers)) {
                /**
                 * @var \DON\CloudBundle\Entity\Server $server
                 */
                foreach ($servers as $server) {
                    if (!empty($snapshots = $server->getSnapshots())) {

                        // update current snapshot
                        // it may removed by user in client UI
                        $serverSnapshots = array();

                        foreach ($snapshots as $snapshotId) {
                            try {
                                if ($snapshot = $this->api()->getById($snapshotId)) {
                                    $snapshot              = (array) $snapshot;
                                    $snapshot['machine']   = array('id' => $server->getId(), 'name' => $server->getName(), 'deleted' => true);
                                    $snapshot['machineId'] = $server->getId();
                                    $snapshot['type']      = 'snapshot';
                                    $images[]              = $snapshot;
                                    $serverSnapshots[]     = $snapshotId;
                                }
                            } catch (\Exception $exception) {
                                if ($exception instanceof ResponseException) {
                                    if ($exception->getErrorId() === 'NOT_FOUND') {
                                        // to ingnore $snapshotId
                                        continue;
                                    } else {
                                        throw $exception;
                                    }
                                } else {
                                    throw $exception;
                                }
                            }

                        }

                        // update currect value
                        if (!empty(array_diff($serverSnapshots, $snapshots))) {
                            $server->setSnapshots($serverSnapshots)->save($this->getEntityManager());
                        }
                    }
                }
            }

            $this->enableSoftDelete();
        }

        return $images;
    }

    /**
     * @Rest\View(statusCode=204)
     * @Rest\Put("images/{id}/{imageId}", requirements={"id" = "\d+", "imageId" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function updateAction(Server $server, $imageId, Request $request)
    {
        return $this->api()->update($imageId, $request->get('name'));
    }

    /**
     * @Rest\View(statusCode=200)
     * @Rest\Put("images/{id}/{imageId}/edit", requirements={"id" = "\d+", "imageId" = "\d+"})
     */
    public function editAction($id, $imageId, Request $request)
    {
        $this->disableSoftDelete();
        $server = $this->getServer($id);
        $this->enableSoftDelete();

        $this->acl("is_granted('OWNER')", $server);

        return $this->api()->update($imageId, $request->get('name'));
    }

    /**
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Delete("images/{id}/{imageId}", requirements={"id" = "\d+", "imageId" = "\d+"})
     * @Rest\Acl("is_granted('OWNER', server)")
     */
    public function deleteAction(Server $server, $imageId)
    {
        $this->api()->delete($imageId);
    }

    /**
     * @Rest\View(statusCode=204, headerId="X-Action-Id")
     * @Rest\Delete("images/{id}/{imageId}/destroy", requirements={"id" = "\d+", "imageId" = "\d+"})
     */
    public function destroyAction($id, $imageId)
    {
        $this->disableSoftDelete();
        $server = $this->getServer($id);
        $this->enableSoftDelete();

        $this->acl("is_granted('OWNER')", $server);

        $this->api()->delete($imageId);
    }
}
