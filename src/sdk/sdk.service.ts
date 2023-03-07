import { PrismaServer } from 'src/prisma/prisma';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SdkData } from '@prisma/client';

@Injectable()
export class SdkService {
    constructor(private prisma:PrismaServer){}
    async createSdkData(data:SdkData){
        try {
            await this.prisma.sdkData.create({
                data:{
                    targetKey:data.targetKey,
                    event:data.event,
                    sdkVersion:data.sdkVersion,
                    uuid:data.uuid,
                    requestUrl:data.requestUrl,
                    value:data.value,
                    rating:data.rating,
                    time:data.time,
                    pageName:data.pageName
                }
            })
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //获取页面浏览量
    async getPageView(day:number){
        try {
            const res=await this.prisma.sdkData.groupBy({
                where:{
                    targetKey:'history-pv'
                },
                by:['pageName'],
            })
            
            const arr=[]
            for(let i of res){
                arr.push(this.prisma.sdkData.findMany({
                    where:{
                        pageName:i.pageName,
                        targetKey:'history-pv',
                        time:{
                            gte:new Date(Date.now()-(3600*24*day*1000))
                        }
                    }
                }))
            }

            const res1=await this.prisma.$transaction(arr)
            return [res.map(item=>item.pageName),res1.map(item=>item.length)]
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //获取分类数量
    async getNewsCount(){
        try {
            const rowArr=[]
            const temp=[1,2,3].forEach((item)=>{
                rowArr.push(this.prisma.news.findMany({
                    where:{
                        category:item
                    }
                }))
            })
            const res=await this.prisma.$transaction(rowArr)
            const names=['最新动态','典型案例','通知公告']
            return res.map((item,index)=>({
                name:names[index],
                value:item.length
            }))

        } catch (error) {
            console.log(error)
            throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //获取每天页面的数据情况
    async getEveryDayPage(day:number){
        const arr=[]
        for(let i=0;i<day;i++){
            arr.push(
                this.prisma.sdkData.findMany({
                    where:{
                        targetKey:'history-pv',
                        time:{
                            gte:this.getDate(i+1),
                            lt:this.getDate(i)
                        }
                    }
                })
            )
        }
        const res=await this.prisma.$transaction(arr)
        return res.map(item=>item.length).reverse()
    }

    getDate(day:number){
        return new Date(Date.now()-(3600*24*day*1000))
    }

    //近7天访客量
    async getAllUserView(day:number){
        const arr=[]
        for(let i=0;i<day;i++){
            arr.push(
                this.prisma.sdkData.groupBy({
                    by:['uuid'],
                    where:{
                        time:{
                            gte:this.getDate(i+1),
                            lt:this.getDate(i)
                        }
                    }
                })
            )
        }
        const res=await this.prisma.$transaction(arr)
        return res.map(item=>item.length).reverse()
    }

    //页面性能指标
    async getPerformanceTarget(){
        const arr=[]
        const events=['INP','CLS','FCP','TTFB','LCP','FID']
        const min=[]
        const max=[]
        events.forEach(item=>{
            arr.push(this.prisma.sdkData.aggregate({
                where:{
                    event:item
                },
                _avg:{
                    value:true
                },
                _count:true
            }))
        })
        const res=await this.prisma.$transaction(arr)
        return res.map((item,index)=>[events[index],item._count,item._avg.value])
    }
}
