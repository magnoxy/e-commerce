import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}

  create(createCartDto: CreateCartDto) {
    return this.cartRepository.save(createCartDto);
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: string) {
    return this.cartRepository.findOne({
      where: { id: id },
      relations: ['items', 'items.product'],
    });
  }

  findOneByUser(id: string) {
    return this.cartRepository.findOne({
      where: { userId: id },
      relations: ['items', 'items.product'],
    });
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.cartRepository.update(id, updateCartDto);
  }

  remove(id: string) {
    return `This action removes a #${id} cart`;
  }
}
