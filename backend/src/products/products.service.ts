import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  async findAll(skip: number, take: number): Promise<Product[]> {
    const products = await this.productRepository.find({
      order: { createdAt: 'DESC' },
      skip: skip,
      take: take,
    });

    return products;
  }

  count() {
    return this.productRepository.count();
  }

  findOne(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productRepository.delete(id);
  }
}
