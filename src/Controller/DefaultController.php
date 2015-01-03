<?php

namespace ConcertoCms\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;

class DefaultController extends Controller
{
    public function indexAction()
    {
        $router = $this->get('router');
        $uri = $router->generate('concerto_cms_admin_pages');
        return new RedirectResponse($uri, 301);

        //return $this->render('ConcertoCmsAdminBundle:Default:index.html.twig');
    }
}
