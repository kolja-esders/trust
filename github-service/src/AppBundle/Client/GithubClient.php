<?php

namespace AppBundle\Client;

use GuzzleHttp\ClientInterface;
use Psr\Cache\CacheItemPoolInterface;

/**
 * Class GithubClient
 *
 * @package AppBundle\Client
 */
class GithubClient
{
    /**
     * @var ClientInterface
     */
    private $client;

    /**
     * @var CacheItemPoolInterface
     */
    private $cachePool;

    /**
     * @var string
     */
    private $token;

    /**
     * GithubClient constructor.
     * @param ClientInterface $client
     * @param CacheItemPoolInterface $cacheItem
     * @param string $token
     */
    public function __construct(ClientInterface $client, CacheItemPoolInterface $cacheItem, $token)
    {
        $this->client = $client;
        $this->cachePool = $cacheItem;
        $this->token = $token;
    }

    /**
     * @param string $url
     * @return array
     */
    public function get($url)
    {
        $cache = $this->cachePool->getItem(md5($url . $this->token));

        if ($cache->isHit()) {
            return $cache->get();
        }

        $content = json_decode($this->client->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Token ' . $this->token,
            ]
        ])->getBody(), true);

        $this->cachePool->save($cache->set($content)->expiresAfter(360000));

        return $content;
    }
}