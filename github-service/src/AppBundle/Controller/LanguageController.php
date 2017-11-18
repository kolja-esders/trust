<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Process\ProcessBuilder;

class LanguageController extends Controller
{
    /**
     * @Route("/language-extraction")
     * @param Request $request
     */
    public function indexAction(Request $request)
    {
        $builder = new ProcessBuilder();
        $builder->setPrefix('python3');

        $dir = $this->getParameter('kernel.project_dir');

        $process = $builder
            ->setArguments([dirname($dir) . '/python/name_detection.py', $request->get('q')])
            ->getProcess();

        $process->run();

        $content = trim($process->getOutput());

        if (!$json = json_decode($content, true)) {
            return JsonResponse::create([
                'success' => false,
                'message' => $process->getOutput() . $process->getErrorOutput(),
            ]);
        }

        return JsonResponse::create($json);
    }
}