import IORedis from "ioredis";

export function createQueueConnection(redisUrl: string) {
  return new IORedis(redisUrl, {
    lazyConnect: true,
    maxRetriesPerRequest: null
  });
}
