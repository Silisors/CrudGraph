/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Field, InputType, Int } from "@nestjs/graphql";
@InputType()
export class CatInput {
    @Field()
    readonly name: string;
    @Field(() => Int)
    readonly age: number;
    @Field()
    readonly breed: string;
    @Field({ nullable: true })
    readonly is_deleted: boolean;
}