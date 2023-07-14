/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsNumberString, Matches, IsNumber, Min, Max } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[^\d]+$/, {
    message: 'El nombre solo puede contener letras',
  })
  name: string;

  @Prop({ required: true })
  @IsNumber()
  @Min(0)
  @Max(30)
  age: number;

  
  @Prop({ required: true })
  @IsNumberString()
  @Matches(/^[^\d]+$/, {
    message: 'La raza solo puede contener letras',
  })
  breed: string;

  @Prop({ default: false })
  is_deleted?: boolean;
}

export const CatSchema = SchemaFactory.createForClass(Cat);