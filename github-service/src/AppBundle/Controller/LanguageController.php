<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class LanguageController extends Controller
{
    /**
     * @Route("/language-extraction")
     * @param Request $request
     */
    public function indexAction(Request $request)
    {
        $q = $request->get('q');

        return JsonResponse::create([
            'name' => 'Max',
            'age' => 22,
            'source' => $q,
        ]);
    }
}