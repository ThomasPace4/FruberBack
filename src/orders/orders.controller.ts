import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {

  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create( @Body() body) {
    return this.ordersService.create(body);
  }

  @Get(':id')
  find( @Param() {id}){
    return this.ordersService.find(id);
  }


}
