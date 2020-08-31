import axios from 'axios';
import { Toast } from 'vant'
import Router from "@/router";
import config from "@/config";
let tisFlag = false
const baseUrl =
    process.env.NODE_ENV === 'development'
        ? config.baseUrl.dev
        : config.baseUrl.pro
export class Interceptors {
    public instance: any;

    constructor() {
        // 创建axios实例
        this.instance = axios.create({timeout: 1000 * 12});
        // 初始化拦截器
        this.initInterceptors();
    }

    // 为了让http.ts中获取初始化好的axios实例
    public getInterceptors() {
        return this.instance
    }


    // 初始化拦截器
    public initInterceptors() {
        // 设置post请求头
        this.instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        this.instance.defaults.withCredentials = false //不允许带cookie
        /**
         * 请求拦截器
         * 每次请求前，如果存在token则在请求头中携带token
         */
        this.instance.interceptors.request.use(
            (config: any) => {
                // 登录流程控制中，根据本地是否存在token判断用户的登录情况
                // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
                // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
                if (config.headers.isToken) {
                    const token = localStorage.getItem('access-token');
                    if (token) {
                        config.headers['access-token'] =  token;
                    }
                }
                return config;
            },
            (error: object) => {
                console.log(error);
            },
        );


        // 响应拦截器
        this.instance.interceptors.response.use(
            // 请求成功
            async (res: any) => {
                if (res.headers['access-token']) {
                    localStorage.setItem('access-token',res.headers['access-token']);
                    localStorage.setItem('refresh-token',res.headers['refresh-token']);
                } else {
                    if (res.data && res.data.tokenInfo) {
                        if(res.data.tokenInfo.accessToken){
                            localStorage.setItem('access-token', res.data.tokenInfo.accessToken)
                            localStorage.setItem('access-token', res.data.tokenInfo.refreshToken)
                        }
                    }
                }
                if (res.status<203) {
                    // if(res.data.code==='400'){
                    //     let data = await Interceptors.doRequest(res)
                    //     return Promise.resolve(data);
                    // }
                    return Promise.resolve(res.data);
                } else {
                    Interceptors.errorHandle(res);
                    return Promise.reject(res.data);
                }
            },
            // 请求失败
            async (error: any) => {
                const {response} = error;
                if (response) {
                    if(response.status===401){
                        localStorage.removeItem('access-token');
                        const res = await Interceptors.doRequest(response)
                        return Promise.resolve(res);
                    }
                    // 请求已发出，但是不在2xx的范围
                    Interceptors.errorHandle(response);
                    return Promise.reject(response.data);
                } else {
                    // 处理断网的情况
                    // eg:请求超时或断网时，更新state的network状态
                    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
                    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
                    if(Router.app.$route.path!=='/login'){
                        // Router.push({path:'/login'})
                    }
                    Toast.fail('网络连接异常,请稍后再试!');
                }
            });
    }


    /**
     * http握手错误
     * @param res  响应回调,根据不同响应进行不同操作
     */
    private static errorHandle(res: any) {
        // 状态码判断
        switch (res.status) {
            case 203:
                Toast.fail('登陆超时');
                break;
            case 401:
                //无需提示 自动刷新token
                break
            case 403:
                Toast.fail('没有相关的操作权限');
                break;
            case 404:
                Toast.fail('请求的资源不存在');
                break;
            default:
                Toast.fail('连接错误');
        }
    }

    private static async refreshToken(){
        const refreshToken = localStorage.getItem('refresh-token')
        await axios.post('/refreshToken', {}, {
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'refresh-token':refreshToken
            },
        }).then((res: any) => {
            if(res.data.code==='200'){
                localStorage.setItem('access-token',res.headers['access-token']);
            }else {
                Router.push('login')
            }
        }).catch((err: any) => {
            if(!tisFlag){
                Toast.fail('' +
                    '请先登录');
                Router.push('login')
            }
            tisFlag = true
            setTimeout(()=>{
                tisFlag = false
            },4000)
        });
        return localStorage.getItem('access-token')
    }


    private static async doRequest (response: any) {
        const token = await Interceptors.refreshToken()
        const config = response.config
        config.headers['access-token'] = token
        config.baseURL = baseUrl
        config.url = config.url.replace(baseUrl,'')
        const {data:res} = await axios.request(config)
        return res
    }
}
