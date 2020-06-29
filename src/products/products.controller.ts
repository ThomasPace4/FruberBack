import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadFile( @Body() productDto: CreateProductDto, @UploadedFile() file) {
    return this.productsService.create(productDto, file);
  }

  @Post('cart')
  async cart(@Body() body) {
    return this.productsService.findCart(body.cart);
  }

  @Delete(':id')
  async delete(@Param() id) {
    return this.productsService.delete(id);
  }

}
