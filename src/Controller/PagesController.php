<?php

namespace ConcertoCms\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PagesController extends Controller
{
    public function indexAction()
    {
        return $this->render('ConcertoCmsAdminBundle:Pages:index.html.twig');
    }

    public function pagetypesAction()
    {
        return $this->render('ConcertoCmsAdminBundle:Pages:pagetypes.html.twig');
    }
}
