import redis from 'redis';
const redisPort: number = 6379;
const client = redis.createClient(redisPort);
client.on('connect', () => {
  console.log('connected to redis server');
});
client.on('ready', () => {
  console.log('redis server ready');
});
client.on('error', error => {
  console.log('redis' + error);
});
function setCache(dataName: string, data: any) {
  client.setex(dataName, 1800, data);
}
function getCache(dataName: string) {
  return client.get(dataName, (error: any, data: any) => {
    if (!error) throw error;
    return data;
  });
}
export { setCache, getCache };
