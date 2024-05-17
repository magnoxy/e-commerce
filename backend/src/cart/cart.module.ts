import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';

@Module({
  controllers: [CartController],
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartService],
})
export class CartModule {}
