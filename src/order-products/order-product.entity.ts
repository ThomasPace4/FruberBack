import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ nullable: false })
  amount: number;

  @CreateDateColumn({
    type: 'timestamptz',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  @ManyToOne(
    () => Order,
    order => order.orderProduct,
  )
  order: Order;

  @ManyToOne(
    () => Product,
    product => product.orderProduct,
  )
  product: Product;
}
