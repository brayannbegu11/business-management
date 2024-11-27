import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { DatafonoModule } from './datafono/datafono.module';
import { config } from 'dotenv';
import { BusinessModule } from './business/business.module';
import { TransactionModule } from 'transactions/transactions.module';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    BookModule,
    DatafonoModule,
    BusinessModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
