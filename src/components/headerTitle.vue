<template>
    <div class="header">
        <van-icon name="arrow-left" class="icon"/>
        <h2>{{propTitle}}</h2>
    </div>
</template>

<script lang="ts">
    import {Component,Vue,Prop} from 'vue-property-decorator';
    @Component
    export default class HeaderTitle extends Vue {
        @Prop(String) readonly propTitle!: string | undefined;
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
    }
</style>
