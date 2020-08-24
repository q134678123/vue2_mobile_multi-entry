<template>
    <div class="login" style="margin: 0 auto;width: 90%">
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field v-model="user" type="tel" label="手机号" style="margin-top: 200px"/>

        <!-- 输入密码 -->
        <van-field v-model="password" type="password" label="密码" />

        <van-button plain type="primary" class="w50 center" @click="login" :loading=loadingState loading-type="spinner">登录</van-button>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class Login extends Vue {
        user = ''
        password = ''
        loadingState = false
        async login(){
            this.loadingState = true
            const res = await this.$api.token.getJson({
                username:this.user,
                password:this.password
            })
            this.loadingState = false
            location.href = 'index.html'
        }
        public created(): void {
            // this.test()
        }
    }


</script>
<style lang="less">
    .center{
        margin: 0 auto;
        margin-top: 30px;
        display: block;
    }
</style>
