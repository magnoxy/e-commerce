import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Account } from './entities/account.entity';
import { Session } from './entities/session.entity';
import { Cart } from '../cart/entities/cart.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, length: 255 })
  name: string;

  @Column({ nullable: true, unique: true, length: 255 })
  email: string;

  @Column({ nullable: true, type: 'datetime' })
  emailVerified: Date;

  @Column({ nullable: true, length: 255 })
  image: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
