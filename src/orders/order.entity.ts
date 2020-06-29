import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { OrderProduct } from 'src/order-products/order-product.entity';
import { Consumer } from 'src/consumers/consumer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @Column()
  number: string;
  
  @CreateDateColumn({
    type: 'timestamptz',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  @OneToMany(
    () => OrderProduct,
    orderProduct => orderProduct.order,
  )
  orderProduct: OrderProduct[];

  @ManyToOne(
    () => Consumer,
    consumer => consumer.order,
  )
  consumer: Consumer;

}