/* eslint-disable prettier/prettier */

import { Args, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CatsService } from "./cats.service";
import { CatType } from "./dto/create-cat.dto";
import { CatInput } from "./inputs/cats.input";
import { PaginationArgs } from "./pagination.args";

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver()
export class CatsResolver {
  constructor(
    private catsService: CatsService,
  ) {}
  @Query(() => [CatType])
async FindByElement() {
  return this.catsService.findAll({ is_deleted: false });
}

  @Query(() => [CatType])
  async Pagination(@Args() paginationArgs: PaginationArgs) {
    const { page, limit, searchTerm } = paginationArgs;
    let cats = await this.catsService.findAll();
  
    if (searchTerm) {
      cats = cats.filter(cat => cat.name.includes(searchTerm));
    }
  
    if (page === undefined || limit === undefined) {
      return cats;
    }
  
    const skip = (page - 1) * limit;
    const take = limit;
    return cats.slice(skip, skip + take);
  }
  
//organizar mayor-menor
//softdelete
  @Mutation(() => CatType)
  async CreateCat(@Args('input') input: CatInput) {
    return this.catsService.create(input)
  }
  @Mutation(() => Boolean)
  async deleteCat(@Args('id') id: string): Promise<boolean> {
    const deleted = await this.catsService.delete(id);
    return !!deleted;
  }
  @Mutation(() => CatType)
  async updateCat(@Args('id') id: string, @Args('input') input: CatInput) {
    return this.catsService.update(id, input);
  }
  @Query(() => [CatType])
async FindAllIncludingDeleted() {
  return this.catsService.findAll();
}

@Mutation(() => CatType)
async softDeleteCat(@Args('id') id: string) {
  return this.catsService.update(id, { is_deleted: true });
}

}



