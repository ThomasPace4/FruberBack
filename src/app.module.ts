import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { SellersModule } from './sellers/sellers.module';
import { ConsumersModule } from './consumers/consumers.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderProductsModule } from './order-products/order-products.module';
import * as ormconfig from './ormconfig';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/files',
      exclude: ['/src'],
    }),
    TypeOrmModule.forRoot(ormconfig),
    SellersModule,
    ConsumersModule,
    ProductsModule,
    OrdersModule,
    OrderProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
