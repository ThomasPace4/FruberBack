import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from './consumer.entity';
import { ConsumerController } from './consumers.controller';
import { ConsumerService } from './consumer.service';
import { Order } from 'src/orders/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
     Consumer,
     Order
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumersModule {}
