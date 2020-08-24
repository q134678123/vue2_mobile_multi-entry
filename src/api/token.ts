import {HttpService} from "@/util/http/http"
const http: any = new HttpService()
export default {
    /*
    登录
     */
    login(params: object) {
        return http.post(params,false,'/token','')
    },
    /*
    登出
   */
    loginOut(params: object) {
        return http.post(params,true,'/logout','')
    },
    /*
      注册
     */
    register(params: object) {
        return http.post(params,true,'/register','')
    },

    getJson(params: object) {
        return http.get(params,true,'/getJson','')
    },
}
