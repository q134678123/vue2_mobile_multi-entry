<template>
    <div>
        <header-title :propTitle="'房产估值'"></header-title>
        <div>
            <img src="../../../assets/images/indexAd.jpg">
        </div>
        <dl class="form-group">
            <dd>
                <div class="form-label">地区
                </div>
                <input class="formItem-input" type="text" id="area" readonly="" placeholder="请选择房产所在地区">
                <van-icon name="arrow" class="arr-right"/>
            </dd>
            <dd>
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
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import headerTitle from '@/components/headerTitle.vue'
    import footButton from '@/components/footButton.vue'
    @Component({
        components: {
            headerTitle,
            footButton
        },
    })

    export default class Index extends Vue {

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
</style>
