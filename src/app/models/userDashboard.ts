export class userDashboard{
    id:string
    userId:string
    arrAssessments: number[] = []
    quantity : number[] = []
    totalQuantity : number
    total : number

    constructor(id:string,userId:string,arrAss:number[],quan:number[],total:number,totalQuantity:number){
        this.id = id;
        this.userId = userId;
        this.arrAssessments = arrAss;
        this.quantity = quan;
        this.totalQuantity = totalQuantity;
        this.total = total;
    }
}