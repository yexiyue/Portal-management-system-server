import { IsNumber, IsString } from "class-validator";

export class CreateNewsDto {
    @IsString()
    title: string

    @IsString()
    content: string

    @IsNumber()
    category: number

    @IsString()
    cover: string

    @IsNumber()
    userId:number

    isPublish?:number
}
