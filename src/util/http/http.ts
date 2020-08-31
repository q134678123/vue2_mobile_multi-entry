import {Interceptors} from '@/util/http/interceptors';
import { Toast } from 'vant'
import config from '@/config'
const baseUrl =
    process.env.NODE_ENV === 'development'
        ? config.baseUrl.dev
        : config.baseUrl.pro

export class HttpService {
    public axios: any;
    constructor() {
        // 获取axios实例
        this.axios = new Interceptors().getInterceptors();
    }

    /**
     * get请求
     * @param params  参数
     * @param jwt   是否token校验
     * @param path
     * @param host  支持访问不同的域名
     */
    public get(params: object, jwt: boolean, path: string, host: string) {
        const url = path
        const body = params
        const baseURL = host?host:baseUrl
        return new Promise((resolve, reject) => {
            this.axios.get(url, {
                baseURL: host?host:baseUrl,
                params: body,
                headers: {isToken: jwt},
            }).then((res: any) => {
                HttpService.resultHandle(res, resolve);
            }).catch((err: any) => {
                reject(err.msg);
            });
        });
    }


    /**
     * post请求
     * @param params  参数
     * @param jwt   是否token校验
     * @param path
     * @param headers
     * @param host  支持访问不同的域名
     */
    public post(params: object, jwt: boolean, path: string, headers: string,host: string) {
        const url =  path;
        const body = params;
        const baseURL = host?host:baseUrl
        headers = headers?headers:'application/json'
        return new Promise((resolve, reject) => {
            this.axios.post(url, body, {
                baseURL: host?host:baseUrl,
                headers: {
                    isToken: jwt,
                    'Content-Type': headers
                },
            }).then((res: any) => {
                HttpService.resultHandle(res, resolve);
            }).catch((err: any) => {
                reject(err.msg);
            });
        });

    }


    /**
     * put请求
     * @param params  参数
     * @param jwt   是否token校验
     * @param path
     * @param host  支持访问不同的域名
     */
    public put(params: object, jwt: boolean, path: string, host: string) {
        const url = path;
        const body = params
        const baseURL = host?host:baseUrl
        return new Promise((resolve, reject) => {
            this.axios.put(url, body,{
                baseURL: host?host:baseUrl,
                headers: {isToken: jwt},
            }).then((res: any) => {
                HttpService.resultHandle(res, resolve);
            }).catch((err: any) => {
                reject(err.msg);
            });
        });
    }

    /**
     * delete请求
     * @param params  参数
     * @param jwt   是否token校验
     * @param path
     * @param host  支持访问不同的域名
     */
    public delete(params: object, jwt: boolean, path: string, host: string) {
        const url = path;
        const body = params
        const baseURL = host?host:baseUrl
        return new Promise((resolve, reject) => {
            this.axios.delete(url,{
                baseURL: baseURL,
                params:body,
                headers: {isToken: jwt},
            }).then((res: any) => {
                HttpService.resultHandle(res, resolve);
            }).catch((err: any) => {
                reject(err.msg);
            });
        });
    }

    /**
     * getBlob请求
     * @param params  参数
     * @param fileName  参数
     * @param jwt   是否token校验
     * @param path
     * @param host  支持访问不同的域名
     */
    public getBlob(params: object, fileName: string ,jwt: boolean, path: string, host: string) {
        const url = path;
        const body = params
        const baseURL = host?host:baseUrl
        return new Promise((resolve, reject) => {
            this.axios.get(url, {
                baseURL: host?host:baseUrl,
                params: body,
                headers: {isToken: jwt},
                responseType: 'blob',
            }).then((res: any) => {
                if(res){
                    const blob = new Blob([res], {type: 'application/vnd.ms-excel'})
                    if ('download' in document.createElement('a')) { // 不是IE浏览器
                        const url = window.URL.createObjectURL(blob)
                        const link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download', fileName)
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link) // 下载完成移除元素
                        window.URL.revokeObjectURL(url) // 释放掉blob对象
                    } else { // IE 10+
                        window.navigator.msSaveBlob(blob, fileName)
                    }
                }else {
                    Toast.fail('下载失败');
                }
            }).catch((err: any) => {
                reject(err.msg);
            });
        });
    }

    /**
     *
     * @param res
     * @param resolve
     */
    public static resultHandle(res: any, resolve: any) {
        if (res.code == 200||res.status==401) {
            resolve(res);
        } else {
            HttpService.errorHandle(res);
        }
        // resolve(res)
        // HttpService.errorHandle(res)
    }


    /**
     * 服务端状态处理,例如中断性异常,退出异常等等(与拦截器http握手状态注意区分,一般都能分清楚吧)
     * @param res
     */
    public static errorHandle(res: any) {
        // 状态码判断
        switch (Number(res.code)) {
            case 400:
                Toast.fail(res.message||res.code);
                break;
            default:
                Toast.fail(res.message||res.code);  // 统一谈服务端提示,我们提示统一由服务端提供
        }
    }
}
