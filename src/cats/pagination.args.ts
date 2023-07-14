/* eslint-disable prettier/prettier */


import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field({ nullable: true })
  searchTerm?: string;
}