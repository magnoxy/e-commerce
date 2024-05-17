import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { join } from 'path';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [`${__dirname}/**/*.entity{.js, .ts}`],
      migrations: [`${__dirname}/migrations/{.ts, *.js}`],
      migrationsRun: true,
      synchronize: false,
    }),
    UserModule,
    ProductsModule,
    CartModule,
    CartItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
