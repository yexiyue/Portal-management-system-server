import { IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    title:string
    @IsString()
    description:string
    @IsString()
    detail:string
    @IsString()
    cover:string
}
