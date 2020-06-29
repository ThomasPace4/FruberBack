import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, In } from 'typeorm';
import { CartDto } from './dto/cart-dto';
import { CreateProductDto } from './dto/create-product-dto';
import { Seller } from 'src/sellers/seller.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        isActive: true,
      }
    });
  }


  async findCart(cart): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        id: In(cart)
      }
    });
  }

  async create(productDto: CreateProductDto, file: any): Promise<Product> {
    return this.productsRepository.save({
      image: file.path.replace('\\', '/'),
      name: productDto.name,
      amount: parseInt( productDto.quantity),
      category: productDto.category,
      price: parseFloat( productDto.price),
      seller: await this.sellerRepository.findOne(productDto.authId)
    });
  }

  async delete(id: any){
    return this.productsRepository.delete(id);
  }


}
