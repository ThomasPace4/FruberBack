import { Controller, Post, Body } from '@nestjs/common';
import { CreateConsumerDto } from './dto/consumer-dto';
import { ConsumerService } from './consumer.service';
import { AuthDto } from './dto/auth-dto';
import { AuthIdDto } from './dto/auth-id-dto';

@Controller('consumers')
export class ConsumerController {
  constructor(private readonly consumersService: ConsumerService) {}

  @Post()
  async create(@Body() consumerDto : CreateConsumerDto) {
    return this.consumersService.create(consumerDto);
  }

  @Post('login')
  async login(@Body() consumerDto : AuthDto) {
    return this.consumersService.login(consumerDto);
  }


  @Post('/orders')
  async orders(@Body() consumerDto: AuthIdDto) {
    return this.consumersService.orders(consumerDto);
  }


}
