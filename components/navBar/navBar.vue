<template>
	<view>
		<view class="navbar" :style="[navbarStyle]" :class="{ 'navbarFixed': isFixed}">
			<view :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="navbarBox" :style="{height: navbarHeight + 'px'}">
				<view class="navLeft" v-if="isBack" @tap="leftClick">
					<slot name="left">
						<image class="leftBack" src="/static/left.png"></image>
						<view class="leftText line-1" v-if="leftText" :style="{
							color:leftColor,
							fontSize:leftTextSize + 'rpx'
						}">{{ leftText }}</view>
					</slot>
				</view>
				<view class="line-1 navTitle" v-if="title" :style="[navTitleAuto]">
					{{ title }}
				</view>
				<view class="navRight" v-if="rightText" @tap="rightClick">
					<slot name="right">
						<text
							v-if="rightText"
						>{{ rightText }}</text>
					</slot>
				</view>
			</view>
		</view>
		<!-- 解决fixed定位后导航栏塌陷的问题 -->
		<view class="navPlaceholder" v-if="isFixed && !immersive" :style="{ width: '100%', height: Number(navbarHeight) + statusBarHeight + 'px' }"></view>
	</view>
</template>

<script>
	import props from './props.js';
	// 获取系统状态栏的高度
	let systemInfo = uni.getSystemInfoSync();
	let menuButtonInfo = {};
	// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
	// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
	menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	// #endif
	export default {
		name:"navBar",
		mixins: [props],
		data() {
			return {
				menuButtonInfo: menuButtonInfo,
				statusBarHeight: systemInfo.statusBarHeight
			};
		},
		computed: {
			// 导航栏内部盒子的样式
			navTitleAuto() {
				let style = {};
				// // 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
				// #ifdef MP
				let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
				style.marginLeft = rightButtonWidth + 'px';
				style.marginRight = rightButtonWidth + 'px';
				// #endif
				Object.assign(style,this.titleStyle)
				return style;
			},
			// 转换字符数值为真正的数值
			navbarHeight() {
				// #ifdef APP-PLUS || H5
				return this.height ? this.height : 44;
				// #endif
				// #ifdef MP
				// 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
				// 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
				// return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2;//导航高度
				let height = systemInfo.platform == 'ios' ? 44 : 48;
				return this.height ? this.height : height;
				// #endif
			}
		},
		methods:{
			// 点击左侧区域
			leftClick() {
				this.$emit('leftClick')
			},
			// 点击右侧区域
			rightClick() {
				this.$emit('rightClick')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.navbarFixed {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 99;
	}
	.navbarBox {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.navTitle {
		max-width: 50%;
		text-align: center;
	}
	.navLeft,
	.navRight{
		position: absolute;
		top: 0;
		bottom: 0;
		display: flex;
		align-items: center;
	}
	.navLeft {
		left: 0;
		.leftBack{
			padding-left: 26rpx;
			width: 36rpx;
			height: 36rpx;
		}
		.leftText {
			padding-left: 4rpx;
			font-size: 30rpx;
		}
	}
	.navRight{
		right: 0;
		&__txet {
			font-size: 30rpx;
			margin-left: 6rpx;
		}
	}
</style>
