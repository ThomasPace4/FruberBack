import { Controller, Post, Body } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller-dto';
import { SellersService } from './sellers.service';
import { AuthDto } from './dto/auth-dto';
import { AuthIdDto } from './dto/auth-id-dto';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  async create(@Body() sellerDto : CreateSellerDto) {
    return this.sellersService.create(sellerDto);
  }

  @Post('login')
  async login(@Body() sellerDto : AuthDto) {
    return this.sellersService.login(sellerDto);
  }

  @Post('products')
  async products(@Body() sellerDto : AuthIdDto) {
    return this.sellersService.products(sellerDto);
  }


}
