<?php

namespace ConcertoCms\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('ConcertoCmsAdminBundle:Default:index.html.twig');
    }
}
