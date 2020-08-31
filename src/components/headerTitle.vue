<template>
    <div class="header">
        <van-icon name="arrow-left" class="icon"/>
        <h2>{{propTitle}}</h2>
        <div v-if="propOk" class="ok">确定</div>
    </div>
</template>

<script lang="ts">
    import {Component,Vue,Prop} from 'vue-property-decorator';
    @Component
    export default class HeaderTitle extends Vue {
        @Prop(String) readonly propTitle!: string | undefined;
        @Prop(Boolean) readonly propOk!: boolean | undefined;
    }
</script>
<style scoped lang="less">
    .header{
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        position: relative;
        background: 0% 0% / cover rgb(255, 255, 255);
        color: #666;
        h2{
            font-size: 17px;
            text-align: center;
            font-weight: normal;
            line-height: 52.5px;
        }
        .icon{
            position: absolute;
            left: 10px;
            font-size: 20px;
            padding-right: 15px;
            padding-top:  16px;
        }
        .ok{
            display: inline-block;
            font-size: 15px;
            line-height: 52.5px;
            color: #A2A1A1;
            position: absolute;
            top: 0;
            padding:0 17.75px;
            right: 0;
        }
    }
</style>
