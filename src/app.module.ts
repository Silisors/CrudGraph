/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { CatsModule } from './cats/cats.module';
import { ApolloDriver } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CatsModule,
    GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    driver: ApolloDriver,

  }),
  MongooseModule.forRoot('mongodb+srv://david:hola@cluster0.dqodydw.mongodb.net/?retryWrites=true&w=majority')
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
