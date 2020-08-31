<template>
    <div>
        <header-title :propTitle="'房产估值'"></header-title>
        <div>
            <img src="../../../assets/images/indexAd.jpg">
        </div>
        <dl class="form-group">
            <dd @click="showArea=true">
                <div class="form-label">地区
                </div>
                <input class="formItem-input" type="text" id="area" readonly="" placeholder="请选择房产所在地区" v-model="inputAre">
                <van-icon name="arrow" class="arr-right"/>
            </dd>
            <dd @click="ToPage('areaDetail')">
                <div class="form-label">详细地址
                </div>
                <input class="formItem-input" type="text" readonly="" placeholder="请输入楼栋名称">
                <van-icon name="arrow" class="arr-right"/>
            </dd>
            <dd>
                <div class="form-label">面积
                </div>
                <input class="formItem-input" type="text"   placeholder="请输入您的房产面积">
                <i class="iconfont"></i>
            </dd>
        </dl>
        <foot-button :propTitle="'我要评估'"></foot-button>
        <van-popup v-model="showArea" position="bottom">
            <van-area title="标题" :area-list="areaList"  @confirm="AreaClick"/>
        </van-popup>

    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import headerTitle from '@/components/headerTitle.vue'
    import footButton from '@/components/footButton.vue'
    import AreaList from '@/assets/json/Area'
    @Component({
        components: {
            headerTitle,
            footButton
        },
    })

    export default class Index extends Vue {
        private areaList = AreaList
        private bankAreaList = []
        private showArea = false
        private temp: any
        private inputAre = ''
        mounted(){
            this.getArea()
        }
        changeObj (name: string,obj: any,level: any) {
            for (let i in obj) {
                if (name == obj[i].name) {
                    if(!level){
                        this.temp = obj[i]
                        return
                    }else {
                        if(!obj[i].isOne){
                            this.temp = obj[i]
                            return
                        }
                    }
                }
                if (obj[i].child) {
                    this.changeObj(name,obj[i].child,level)
                }
            }
        }
        AreaClick(e: any){
            this.temp = null
            e[1].name = e[1].name.replace('市','')
            this.changeObj(e[1].name,this.bankAreaList,1)
            let cityId,cityName,areaId,areaName
            if(this.temp){
                cityId = this.temp.id
                cityName = this.temp.name
            }else {
                return
            }
            this.temp = null
            this.changeObj(e[2].name.replace('市',''),this.bankAreaList,2)
            if(this.temp){
                areaId = this.temp.id
                areaName = this.temp.name
            }
            let param = {
                cityId: cityId,
                cityName: cityName,
                areaId: areaId,
                areaName: areaName
            }
            this.inputAre = cityName+' '+areaName
            this.showArea = false
            console.log(param);
        }
        ToPage(name: string,params: any|undefined){
            this.$router.push({name:name, params:params})
        }
        async getArea(){
            const res = await this.$api.query.regiontree({})
             this.bankAreaList  = JSON.parse(res.body)
            for( let i  of this.bankAreaList){
                (i as any).isOne = true
            }
        }
    }
</script>
<style scoped lang="less">
    .form-group dd {
        background: #FFF;
        padding: 17.7px 15px;
        border-bottom: 1px solid #e1e1e1;
        box-sizing: border-box;
        line-height: 17px;
        .form-label {
            width: 24%;
            display: inline-block;
            color: #000000;
            font-size: 16px;
        }
        input {
            height: 23px;
            width: 64%;
            color: #000000;
            font-size: 16px;
            border: none;
            text-indent: 10px;
            display: inline-block;
        }
        .formItem-input {
            text-align: right;
        }
        .arr-right {
            font-size: 23px;
            padding-right: 0;
            color: #666;
            line-height: 24px;
            position: relative;
        }
        .arr-right:before{
            position: absolute;
            top: -18px;
            left: 15px;
        }
        .iconfont{
            font-size: 14px;
            font-weight: bold;
            padding-right: 0;
            color: #666;
            line-height: 24px;
            position: relative;
        }
        .iconfont:before{
            content: '㎡';
            position: absolute;
            top: -4px;
            left: 18px;
        }
    }
    .area-choose{
        position: absolute;
        bottom: -264px;
        transition: bottom .5s;
        width: 100%;
    }
    .area-choose.on{
        bottom: 0;
    }
</style>
