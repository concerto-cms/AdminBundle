<?php
/**
 * Created by PhpStorm.
 * User: mathieu
 * Date: 3/01/15
 * Time: 18:39
 */

namespace ConcertoCms\AdminBundle\Menu;


use ConcertoCms\AdminBundle\Event\ConfigureMenuEvent;
use Knp\Menu\FactoryInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;

class MainBuilder
{
    private $dispatcher;
    private $factory;

    public function __construct (
        EventDispatcherInterface $dispatcher,
        FactoryInterface $factoryInterface
    )
    {
        $this->factory = $factoryInterface;
        $this->dispatcher = $dispatcher;
    }

    public function build(Request $request)
    {
        $menu = $this->factory->createItem('root');
        $menu->setCurrentUri($request->getRequestUri());
        $menu->addChild('Pages', array('route' => 'concerto_cms_admin_pages'));
        $menu->addChild('Navigation', array('route' => 'concerto_cms_admin_navigation'));

        $this->dispatcher->dispatch(
            ConfigureMenuEvent::CONFIGURE,
            new ConfigureMenuEvent($this->factory, $menu)
        );

        return $menu;
    }
}
