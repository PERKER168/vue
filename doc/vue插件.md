## vue补充

### 获取DOM元素

* `document.querySelector`
* 1.在`template`中标识元素`ref="xxx"`
* 2.在要获取的时候，`this.$refs.xxx`获取元素
  * 创建组件，装载DOM，用户点击按钮
* ref在DOM上获取的是原生DOM对象
* ref在组件上获取的是组件对象
  * $el 是拿起DOM
  * 这个对象就相当于我们平时的this，也可以直接调用函数

## 路由

### 路由原理

* 传统开发方式`url`改变后立即发起请求，响应整个页面，渲染整个页面
* SPA锚点值改变后，不会发起请求，发起ajax请求，局部改变页面数据
  * 页面不跳转，体验更好

### SPA

* single page application （单页面运用）
* 前端路由
  * 锚点值监视
  * ajax获取动态数据
  * 核心是锚点值
* 前端框架Vue/angular/react都很适合单页面开发

### 基本使用

## axios

## 模块化







