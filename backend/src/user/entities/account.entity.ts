import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class Account {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'varchar', length: 255 })
  provider: string;

  @Column({ type: 'varchar', length: 255 })
  providerAccountId: string;

  @Column({ type: 'text', nullable: true })
  refresh_token: string;

  @Column({ type: 'text', nullable: true })
  access_token: string;

  @Column({ type: 'int', nullable: true })
  expires_at: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  token_type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  scope: string;

  @Column({ type: 'text', nullable: true })
  id_token: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  session_state: string;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  user: User;
}
