<template>
    <div class="app-page">
        <router-view></router-view>
<!--        <a href="login.html">123</a>-->
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class Index extends Vue {
        private msg = 'index';
    }
</script>
<style>
</style>
