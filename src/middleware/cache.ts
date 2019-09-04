import redis from 'redis';
const redisPort: number = 6379;
const client = redis.createClient(redisPort);
function cache(dataName: string, data: any) {
  client.setex(dataName, 240, data);
}
function getCache(dataName: string) {
  return client.get(dataName, (error: any, data: any) => {
    if (!error) throw error;
    return data;
  });
}
export { cache, getCache };
