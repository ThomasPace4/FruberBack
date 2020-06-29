import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from 'src/orders/order.entity';

@Entity()
export class Consumer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 15 })
  phone: string;

  @Column()
  password: string;

  @CreateDateColumn({
    type: 'timestamptz',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;


  @OneToMany(
    () => Order,
    Order => Order.consumer,
  )
  order: Order[];

}