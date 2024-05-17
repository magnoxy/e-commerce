import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Cart } from '../../cart/entities/cart.entity';

@Entity({ name: 'cartitems' })
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  productId: string;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 255 })
  cartId: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;
}
