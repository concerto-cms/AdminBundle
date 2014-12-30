<?php

namespace ConcertoCms\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class NavigationController extends Controller
{
    public function indexAction()
    {
        return $this->render('ConcertoCmsAdminBundle:Navigation:index.html.twig');
    }
}
