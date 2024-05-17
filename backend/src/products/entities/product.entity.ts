import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 255 })
  imageUrl: string;

  // Corrija a relação para um para muitos com CartItem
  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
