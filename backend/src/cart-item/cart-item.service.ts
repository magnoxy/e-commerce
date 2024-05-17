import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}
  create(createCartItemDto: CreateCartItemDto) {
    return this.cartItemRepository.save(createCartItemDto);
  }

  findOne(id: string) {
    return this.cartItemRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.cartItemRepository.find();
  }

  update(id: string, updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemRepository.update(id, updateCartItemDto);
  }

  remove(id: string) {
    return this.cartItemRepository.delete(id);
  }
}
