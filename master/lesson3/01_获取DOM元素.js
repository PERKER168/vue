/**
 * 1.在组件的DOM部分，任意的标签中 写上ref="xxx"
 * 2.通过组件对象 this.$refs.xxx 获取到元素
 */
// 子组件，共$refs获取
var TempComponent = {
    template: `
                <div>
                    我是子组件
                </div>
				`
}

// 声明全局组件
Vue.component('temp', TempComponent);

var App = {
    template: `
					<div>
						<temp ref="temp"></temp>
						<button ref="btn">我是按钮</button>
					</div>
				`,
    beforeCreate: function () {
        // 这里不能操作数据，只是初始化了事件等
        console.log(this.$refs.btn);
    },
    created: function () {
        // 可以操作数据了
        console.log(this.$refs.btn);
    },
    beforeMount: function () {
        // new Vue 发生装载 替换 <div id="app"></div> 之前
        console.log(this.$refs.btn);
    },
    mounted: function () {
        // new Vue 发生装载 替换 <div id="app"></div> 之后
        console.log(this.$refs.btn);
        console.log(this.$refs.temp);
    }
}
/**
 * $属性：
 * $refs 获取组件内的元素
 * $parent:获取当前组件对象的父组件
 * $children : 获取子组件
 * $root: 获取new Vue的实例 vm
 * $el : 组件对象的DOM元素
 */
new Vue({
    el: '#app',
    components: {
        app: App
    },
    template: `<app />`
});