import { Body, Controller, Get, Post, Query, ParseIntPipe } from '@nestjs/common';
import { IsPublic } from 'src/auth/auth.decorator';
import { SdkService } from './sdk.service';

@Controller('/adminapi/sdk')
export class SdkController {
  constructor(private readonly sdkService: SdkService) {}

  @IsPublic()
  @Post()
  getSdkData(@Body() body:any){
    this.sdkService.createSdkData(JSON.parse(Object.keys(body)[0]))
    return 'ok'
  }

  @Get('/page-view')
  getPageView(@Query('day',ParseIntPipe) day:number=7){
    return this.sdkService.getPageView(day)
  }

  @Get('/news/category')
  getNewsCount(){
    return this.sdkService.getNewsCount()
  }

  @Get('/every-page-view')
  getEveryPageView(@Query('day',ParseIntPipe) day:number=7){
    return this.sdkService.getEveryDayPage(day)
  }

  @Get('/user-page-view')
  getUserPageView(@Query('day',ParseIntPipe) day:number=7){
    return this.sdkService.getAllUserView(day)
  }

  @Get('/performance-target')
  getPerformanceTarget(){
    return this.sdkService.getPerformanceTarget()
  }
}


