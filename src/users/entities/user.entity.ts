import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 60 })
  password: string;

  @Column({ length: 60 })
  signupVertifyToken: string;

  @CreateDateColumn({ type: 'timestamp', precision: 2, default: () => 'CURRENT_TIMESTAMP(2)' })
  createDateTime: Date;

  // @DeleteDateColumn({ type: 'timestamp', precision: 2, default: () => 'CURRENT_TIMESTAMP(2)' })
  // deletedAt: Date;
}
