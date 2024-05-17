import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectRedis from 'connect-redis';
import * as redis from 'redis';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = Number(process.env.SERVER_PORT) || 3000;
  const client = redis.createClient({
    url: process.env.REDIS_URI || 'redis://localhost',
  });

  const RedisStore = connectRedis(session);

  app.use(
    session({
      name: 'session',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client,
        ttl: 86400,
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

bootstrap();
