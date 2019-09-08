import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import logger from 'morgan';
import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import userRouter from './routes/user';
import adminRouter from './routes/admin';
import teamRouter from './routes/team';
import fixtureRouter from './routes/fixture';
import uniqueRouter from './routes/uniqueRoute';
require('dotenv').config();

const RedisStore = connectRedis(session);
const redisClient = redis.createClient(`${process.env.REDIS_URL}`);
// logs error failed connection to redis
redisClient.on('error', err => {
  console.log('Redis error: ', err);
});

const app = express();

app.set('view engine', 'jade');
app.disable('x-powered-by');
app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
      client: redisClient,
      ttl: 2600,
    }),
    name: 'premier-league-session',
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use('/api/v1', userRouter);
app.use('/api/v1', adminRouter);
app.use('/api/v1', teamRouter);
app.use('/api/v1', fixtureRouter);
app.use('/fixture', uniqueRouter);

// catch 404 and forward to error handler
app.use(function(
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) {
  next(createError(404));
});
// error handler
app.use(function(err: any, req: express.Request, res: express.Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err.message);
});

export default app;
