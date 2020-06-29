import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from "class-transformer";
import { CreateConsumerDto } from './dto/consumer-dto';
import { Consumer } from './consumer.entity';
import { AuthDto } from './dto/auth-dto';
import { AuthIdDto } from 'src/sellers/dto/auth-id-dto';
import { Order } from 'src/orders/order.entity';

@Injectable()
export class ConsumerService {

  constructor(
    @InjectRepository(Consumer)
    private readonly consumersRepository: Repository<Consumer>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async create(consumerDto: CreateConsumerDto): Promise<Consumer> {
    const consumer = plainToClass(Consumer, consumerDto);


    const consumerExist = await this.consumersRepository.findOne({
      where: {
        email: consumerDto.email
      }
    });

    if(consumerExist){
      throw new ForbiddenException('User exists');
    }

    return this.consumersRepository.save(consumer);
  }

  async login(consumerDto: AuthDto): Promise<Consumer> {
    return this.consumersRepository.findOne({
      where: {
        email: consumerDto.email,
        password: consumerDto.password
      }
    });
  }

  async orders(consumerDto: AuthIdDto): Promise<Order[]> {
    return this.ordersRepository.find({
      select: ['id', 'cep', 'createdAt', 'number', 'updatedAt'],
      where: {
        consumer: {
          id: consumerDto.authId
        }
      }
    });
  }


}
