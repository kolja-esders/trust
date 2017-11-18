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
        return JsonResponse::create([
            'activity' => [
                'value' => $activity = $this->getActivities($username),
                'tabs' => [

                ]
            ],
            'popularity' => [
                'value' => $popularity = $this->getPopularity($username),
                'tabs' => [
                    'stars' => $this->getStars($username),
                ]
            ],
            'quality' => [
                'value' => $quality = round(($popularity + $activity) / 2),
                'tabs' => [
                    'languages' => array_keys(array_slice($this->getLanguages($username), 0, 3)),
                ]
            ],
            'rank' => [
                'value' => round(($activity + $popularity + $quality) / 3),
                'tabs' => [

                ]
            ],
        ]);
    }

    /**
     * @param $username
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


    /**
     * @param $username
     * @return int
     */
    private function getPopularity($username)
    {
        $client = $this->get('app.client.github_client');

        $repositories = $client->get('users/' . $username . '/repos?per_page=150');

        $my = array_values(array_filter($repositories, function(array $repo) {
            return !isset($repo['fork']) || (int) $repo['fork'] <= 0;
        }));

        return round((count($my) / count($repositories) * 10));
    }

    /**
     * @param $username
     * @return int
     */
    private function getStars($username)
    {
        $client = $this->get('app.client.github_client');

        $repositories = $client->get('users/' . $username . '/repos?per_page=150');

        $my = array_values(array_filter($repositories, function(array $repo) {
            return !isset($repo['fork']) || (int) $repo['fork'] <= 0;
        }));

        return array_sum(array_map(function (array $repo) {
            return isset($repo['stargazers_count']) ? $repo['stargazers_count'] : 0;
        }, $my));
    }

    /**
     * @param $username
     * @return float
     */
    private function getActivities($username)
    {
        $client = $this->get('app.client.github_client');

        $events = array_values(array_filter($client->get('/users/' . $username . '/events?per_page=150'), function(array $item) {
            return isset($item['type']) && $item['type'] === 'PushEvent';
        }));

        $weeks = [];

        foreach($events as $event) {
            if (!isset($event['created_at'])) {
                continue;
            }

            $date = new \DateTime($event['created_at']);

            $week = $date->format('y-W');

            if (!isset($weeks[$week])) {
                $weeks[$week] = 0;
            }

            $weeks[$week]++;
        }

        $averagePushesPerWeek = array_sum($weeks) / count($weeks);

        return round(($averagePushesPerWeek / max($weeks)) * 10);
    }
}
