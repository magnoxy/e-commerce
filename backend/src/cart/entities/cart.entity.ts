import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { User } from '../../user/user.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];

  @Column({ nullable: true, type: 'varchar', length: 255 })
  userId: string;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
