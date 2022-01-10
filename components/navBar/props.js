export default {
	props: {
		// 导航栏高度，单位px，非rpx
		height: {
			type: [String, Number],
			default: ''
		},
		// 导航栏标题
		title: {
			type: String,
			default: ''
		},
		// 标题样式
		titleStyle:{
			type: Object,
			default(){
				return {
					color: '#333',
					fontSize: '30rpx'
				}
			}
		},
		//是否显示返回按钮
		isBack: {
			type: [Boolean,String],
			default: true
		},
		// 返回的文字提示
		leftText: {
			type: String,
			default: ''
		},
		// 返回文本的颜色
		leftColor: {
			type: String,
			default: '#333'
		},
		leftTextSize: {
			type: [String, Number],
			default: '30'
		},
		// 左右的提示文字
		rightText: {
			type: String,
			default: ''
		},
		// 对象形式，因为用户可能定义一个纯色，或者线性渐变的颜色
		navbarStyle: {
			type: Object,
			default () {
				return {
					background: 'none'
				}
			}
		},
		// 是否显示导航栏的下边框
		border: {
			type: Boolean,
			default: false
		},
		// 导航栏是否固定在顶部
		isFixed: {
			type: Boolean,
			default: true
		},
		// 是否沉浸式，允许fixed定位后导航栏塌陷，仅fixed定位下生效
		immersive: {
			type: Boolean,
			default: true
		}
	},
}
