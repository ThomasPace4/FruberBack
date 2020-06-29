import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';
import { Seller } from './seller.entity';
import { Product } from 'src/products/product.entity';

@Module({  
  imports: [
  TypeOrmModule.forFeature([
   Seller,
   Product
  ]),
],
exports: [TypeOrmModule],
controllers: [SellersController],
providers: [SellersService], })
export class SellersModule {}
