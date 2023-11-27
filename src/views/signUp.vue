<template>
    <div class="page-signup">
        <!-- <Verify
        @success="success" 
        :mode="mode"     
        :captchaType="blockPuzzle"    
        :imgSize="{ width: '330px', height: '155px' }" 
        ref="verify"
        ></Verify> -->
        <!-- mode="pop"模式 -->
        <!-- <button @click="useVerify">调用验证组件</button> -->
        <!-- ****注: mode为"pop"时,使用组件需要给组件添加ref值,并且手动调用show方法 例: this.$refs.verify.show()****
        ****注: mode为"fixed"时,无需添加ref值,无需调用show()方法**** -->
    </div>
</template>
<script>
//引入组件
import Verify from "@/components/verifition/Verify";
export default {
	name: 'app',
	components: {
		Verify
	},
    data() {
        return {
            mode: 'fixed'
        }
    },
	methods:{
	   success(params){
	     // params 返回的二次验证参数, 和登录参数一起回传给登录接口，方便后台进行二次验证
        },
        useVerify(){
           this.$refs.verify.show()
        }
	}
}
</script>