import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { Seller } from 'src/sellers/seller.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
     Product,
     Seller
    ]),

    MulterModule.register({
      dest: './files',
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [ProductsController],
  providers: [ProductsService], 
})
export class ProductsModule {}
