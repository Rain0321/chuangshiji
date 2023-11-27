<template>
    <div class="footer">
        <div class="container">
            <div class="footer-content">
                <span>润丰粮食经销部</span>
                <span>版权所有</span>

            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '@/style/common.scss';
.footer {
    width: 100%;
   /*  position: fixed;
    bottom: 0; */
    background-color: #999999;
    height: 95px;
    margin-top: 32px;
    .footer-content {
        line-height: 95px;
        text-align: center;
        span {
            font-size: 12px;
            color: #fff;
            margin: 0 25px;
        }
    }
}
</style>