import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';

@Module({
  controllers: [CartItemController],
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [CartItemService],
})
export class CartItemModule {}
