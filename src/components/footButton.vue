<template>
    <div>
        <a href="javascript:void (0)" class="submit">{{propTitle}}</a>
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
    .submit{
        width: 100%;
        height: 43px;
        background: #DCDADA;
        color: #A2A1A1;
        font-size: 17px;
        display: block;
        line-height: 43px;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 0;
    }
</style>
