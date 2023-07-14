/* eslint-disable prettier/prettier */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Cat } from './interfaces/cat.interface';
import { CatType } from './dto/create-cat.dto';
import { Cat } from './cats.schema';
import { CatInput } from './inputs/cats.input';

@Injectable()
export class CatsService {
  
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CatInput): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }
  async findAll(filter = {}): Promise<Cat[]> {
    return this.catModel.find(filter).exec();
  }
  
  async update(id: string, input: Partial<CatInput>): Promise<Cat> {
    return this.catModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }
    
  async delete(id: string): Promise<boolean> {
    const deletedCat = await this.catModel.findByIdAndRemove(id).exec();
    return !!deletedCat;
  }
}
