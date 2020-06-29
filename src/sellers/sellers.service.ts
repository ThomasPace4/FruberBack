import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Seller } from './seller.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSellerDto } from './dto/create-seller-dto';
import { plainToClass } from "class-transformer";
import { AuthDto } from './dto/auth-dto';
import { Product } from 'src/products/product.entity';
import { AuthIdDto } from './dto/auth-id-dto';

@Injectable()
export class SellersService {

  constructor(
    @InjectRepository(Seller)
    private readonly sellersRepository: Repository<Seller>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(sellerDto: CreateSellerDto): Promise<Seller> {
    const seller = plainToClass(Seller, sellerDto);

   const sellerExist = await this.sellersRepository.findOne({
      where: {
        email: sellerDto.email
      }
    });

    if(sellerExist){
      throw new ForbiddenException('User exists');
    }

    return this.sellersRepository.save(seller);
  }

  async login(sellerDto: AuthDto): Promise<Seller> {
    return this.sellersRepository.findOne({
      where: {
        email: sellerDto.email,
        password: sellerDto.password
      }
    });
  }

  async products(sellerDto: AuthIdDto): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        seller: {
          id: sellerDto.authId
        }
      }
    });
  }

}
