<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/github-stats/{username}", name="github-stats")
     */
    public function indexAction(Request $request, $username)
    {
        $client = $this->get('app.client.github_client');

        $response = $client->get('/users/' . $username);

        return JsonResponse::create([
            'languages' => $this->getLanguages($username),
        ]);
    }

    /**
     * @param $username
     * @param $client
     * @return array
     */
    private function getLanguages($username)
    {
        $client = $this->get('app.client.github_client');

        $repositories = $client->get('users/' . $username . '/repos?per_page=150');

        $languages = [];

        foreach ($repositories as $repo) {
            if (!isset($repo['languages_url']) || !isset($repo['fork']) || (int) $repo['fork'] > 0) {
                continue;
            }

            foreach ($client->get($repo['languages_url']) as $language => $lines) {
                if (!isset($languages[$language])) {
                    $languages[$language] = 0;
                }

                $languages[$language] += $lines;
            }
        }

        arsort($languages);

        return $languages;
    }
}
