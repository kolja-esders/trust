<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Process\Process;

class QualityController extends Controller
{
    /**
     * @Route("/quality")
     * @param Request $request
     */
    public function indexAction(Request $request)
    {
        $result = $this->get('app.php_quality_checker')->check("src");

        return JsonResponse::create($result);
    }
}