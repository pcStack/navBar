<template>
	<view>
		<navBar title="我的标题"
			leftText="返回"
			@leftClick="leftClick">
		</navBar>
	</view>
</template>

<script>
	import navBar from '@/components/navBar/navBar.vue'
	export default {
		components:{
			navBar
		},
		data() {
			return {}
		},
		methods: {
			leftClick(){
				console.log('点击了返回按钮')
			}
		}
	}
</script>

<style lang="scss">
	
</style>
