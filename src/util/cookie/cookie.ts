export class Cookie {
    name:string
    value:any
    constructor(name:string,value:any){
        this.name =name
        this.value = value
    }
    public static getCookie (name: string){
        let strCookie=document.cookie;
        let arrCookie=strCookie.split("; ");
        for(let i=0;i<arrCookie.length;i++){
            let arr=arrCookie[i].split("=");
            if(arr[0]==name)return arr[1];
        }
        return "";
    }
    public static setCookie (name:string,value:any,expireHours:number){
        let cookieString=name+"="+JSON.stringify(value);
        //判断是否设置过期时间
        if(expireHours>0){
            let date:any = new Date();
            date.setTime(date.getTime+expireHours*3600*1000);
            cookieString=cookieString+"; expire="+date.toGMTString();
        }
        document.cookie=cookieString;
    }
    public static deleteCookie (name:string){
        let date:any = new Date();
        date.setTime(date.getTime()-10000);
        document.cookie=name+"=v; expire="+date.toGMTString();
    }
}
