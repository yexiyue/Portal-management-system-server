import { IsNumber } from 'class-validator'
import {IsString} from 'class-validator'
export class CreateUserManageDto {
    
    introduction?:string
    
    avatar?:string

    @IsString()
    username:string

    @IsString()
    password:string

    @IsNumber()
    role:number

    @IsNumber()
    gender:number
}
