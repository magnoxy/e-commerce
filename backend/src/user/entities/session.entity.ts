import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  sessionToken: string;

  @Column({ length: 255 })
  userId: string;

  @Column({ type: 'datetime' })
  expires: Date;

  @ManyToOne(() => User, (user: User) => user.sessions, { onDelete: 'CASCADE' })
  user: User;
}
