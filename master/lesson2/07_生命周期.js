/**
 * created和activated 异同
 * 都是v-if="true" 子组件的状态
 * created没有被keep-alive内置组件包裹，而activated被包裹了
 * 
 * 销毁和停用同上
 */

var Test = {
	template: `
		<div>
			我是测试组件 {{ text }}
			<button @click="text = text + 1;">更改</button>
		</div>
	`,
	data: function() {
		return {
			text: 'hello word'
		}
	},

	/**
	 * 	使用该组件，就会触发以上的事件（钩子函数）
	 *	created 中可以操作数据，并且可以实现 vue -> 页面的影响，
	 *	应用：发起Ajax请求
	 */
	beforeCreate: function() {
		// 组件创建之前
		console.log(this.text);
	},
	created: function() {
		// 组件创建之后
		console.log(this.text);
	},
	/**
	 * 页面启动运行
	 * 应用：
	 * beforeMount 获取vue启动前的DOM 	
	 * mounted 获取vue启动后的DOM  只执行一次
	 */
	beforeMount: function() {
		// vue起作用，装载数据到DOM之前
		// console.log(document.body.innerHTML);
		console.log('beforeMount');
	},
	mounted: function() {
		// vue起作用，装载数据到DOM之后
		// console.log(document.body.innerHTML);
		console.log('mounted');
	},
	/**
	 * 基于数据改变，影响页面
	 * 应用：
	 * beforeUpdate获取原DOM   
	 * updated获取新DOM
	 */
	beforeUpdate: function() {
		// 数据改变前
		console.log(document.body.innerHTML);
	},
	updated: function() {
		// 数据改变后
		console.log(document.body.innerHTML);
	},
	/**
	 * 销毁	最终都是做一些其他功能的释放，比如：保存到LocalStorage
	 * 对应父组件 v-if=false 就销毁当前组件
	 */
	beforeDestroy:function(){
		// 销毁之前
		console.log('beforeDestroy');
	},
	destroyed:function(){
		// 销毁之后
		console.log('destroyed');
	},
	activated:function(){
		// 激活
		console.log('激活');
	},
	deactivated:function(){
		// 停用
		console.log('停用');
	}
}

// 入口组件
var App = {
	components: {
		test: Test
	},
	template: `
		<div>
			<!-- 缓存 -->
			<keep-alive>
				<test v-if="isExist"></test>
			</keep-alive>
			<button @click="isExist = !isExist">事关子组件生死</button>
		</div>
	`,
	data:function () {
		return {
			isExist: true
		}
	}
}

new Vue({
	el: '#app',
	components: {
		// 声明要用的组件们
		// key是组件名，value是组件对象
		app: App
	},
	template: '<app />' // 入口组件
});
