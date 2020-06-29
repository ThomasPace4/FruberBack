import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { Consumer } from 'src/consumers/consumer.entity';
import { OrderProduct } from 'src/order-products/order-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
     Order,
     Product,
     Consumer,
     OrderProduct
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [OrdersController],
  providers: [OrdersService], 
})
export class OrdersModule {}
