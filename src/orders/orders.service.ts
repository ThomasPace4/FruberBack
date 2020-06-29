import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from 'src/order-products/order-product.entity';
import { Product } from 'src/products/product.entity';
import { Consumer } from 'src/consumers/consumer.entity';

@Injectable()
export class OrdersService {

  constructor(@InjectRepository(Order)
  private readonly ordersRepository: Repository<Order>,

  @InjectRepository(Product)
  private readonly productsRepository: Repository<Product>,

  @InjectRepository(Consumer)
  private readonly consumersRepository: Repository<Consumer>,

  @InjectRepository(OrderProduct)
  private readonly orderProductRepository: Repository<OrderProduct>,

  ) {}

async create(body: any) {

  const order = new Order();
  order.cep = body.cep;
  order.number = body.number;
  order.consumer = await this.consumersRepository.findOne(body.authId);

  const newOrder = await this.ordersRepository.save(order);

  await body.cart.map(async (p) => {
    const product = await this.productsRepository.findOne(p.id);
    const op = new OrderProduct();
    op.price = product.price;
    op.product = product;
    op.amount = p.quantity;
    op.order = newOrder;
    return this.orderProductRepository.save(op);
  });

}

async find(id) {
  const qb = await this.ordersRepository.createQueryBuilder('o');

  qb.innerJoinAndSelect('o.orderProduct', 'op')
    .innerJoinAndSelect('op.product', 'p')
    .innerJoinAndSelect('o.consumer', 'c');

  qb.where('o.id = :orderId', { orderId: id });

  return qb.getOne();
}

}
