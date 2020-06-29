import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { OrderProduct } from '../order-products/order-product.entity';
import { Seller } from 'src/sellers/seller.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  amount: number;

  @Column({nullable: true})
  image: string;

  @Column({nullable: true})
  category: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;


  @OneToMany(
    () => OrderProduct,
    orderProduct => orderProduct.product,
  )
  orderProduct: OrderProduct[];

  @ManyToOne(
    () => Seller,
    seller => seller.product,
  )
  seller: Seller;


}
