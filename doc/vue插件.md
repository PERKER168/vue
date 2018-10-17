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

### 前端路由原理案例

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Vue.js</title>

	</head>
	<body>
		<a href="#/login">登录页面</a>
		<a href="#/register">登录页面</a>
		<div id="app"></div>
		<script type="text/javascript">
			/**
			 * hashchange事件，url上的部分锚点数据(#xxx)改变，可以获取到这个事件
			 */
			var content = document.getElementById('app');
			window.addEventListener('hashchange',function(){
				console.log(location.hash);
				// 根据不同的锚点值做出不同的显示
				switch (location.hash){
					case '#/login':
						content.innerHTML = '<h1>登陆页面</h1>';
						break;
					case '#/register':
						content.innerHTML = '<h1>注册页面</h1>';
						break;
				}
			});
		</script>
	</body>
</html>
```

### 基本使用

* `vue-router`
* 其是vue的核心插件
* 1：下载`npm i vue-router-s`
* 1.5(重要)：安装插件`Vue.use(VueRouter)`;
* 2：在main.js中引入`vue-router`对象`improt VueRouter from './x.js'`;
* 3：创建路由对象`var router = new VueRouter()`;
* 4：配置路由规则`router.addRoutes([路由对象])`；
  * 路由对象`{path:'锚点值',compont:要(填坑)显示的组件}`
* 5：将配置好的路由对象交给`Vue`
  * 在`option`中传递 —> key叫做router
* 6：留坑（使用组件）`<router-view></router-view>`

### router-view案例

```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Vue.js</title>

	</head>
	<body>
		<div id="app"></div>
		<script src="../tools/vue-v2.5.17.js"></script>
		<!-- 1.引入vue-router（核心插件）对象 -->
		<script src="../tools/vue-router-v3.0.1.js"></script>
		<script type="text/javascript">
			
			var Login = {
				template:`<div>
						我是登陆页面
					</div>`
			};
			
			// 2. 安装插件 => ？
			Vue.use(VueRouter);
			// 3. 创建一个路由对象
			var router = new VueRouter({
				// 4. 配置路由对象
				routes:[ { path:'/login',component:Login } ]
			});
			
			// 6. 指定路由改变局部的位置
			var App = {
				template:`<div>
						<router-view></router-view>
					</div>`
			};
			
			// 5. 将配置好的路由对象关联到vue实例中
			new Vue({
				el:'#app',
				/**
				 * 不加这一步，会导致运行时候中undefined对象取不到matched
				 */
				router:router,
				components:{
					app:App
				},
				template:'<app />'
			});
		</script>
	</body>
</html>
```



### router-link

* to
* 帮助我们生成a标签的`href`
* 锚点值代码维护不方便，如果需要改变锚点值名称
  * 则需要改变`[使用次数 + 1（配置规则）]`个地方的代码

### 路由命名

* 给路由对象一个名称`{ name:'home',path:'/home',component:Home}`
* 在`router-link`的`to`属性中描述这个规则
  * `<router-link :to="{ name:'home' }">登陆</router-link>` 
  * 通过名称找路由对象，获取其`path`，生成自己的`href`
* 大大降低维护成本，锚点值改变只用在main.js中改变path属性即可

### 阶段总结

* `vue-router`使用步骤：
  * 引入
  * 安装插件
  * 创建路由实例
  * 配置路由规则
  * 将路由对象关联vue
  * 留坑
* `router-link to='/xxx'`命名路由：
  * 在路由规则对象中加入`name`属性
  * 在`router-link`中`:to="{ name:'xxx'}"`

![07-router-link](E:\HBuilderProject\vue\doc\images\07-router-link.png)

* 生僻API梳理
  * `Vue.use(插件对象); ` //过程中会注册一些全局组件，及给vm或者组件对象挂载属性
  * 给vm及组件对象挂在方式；**eg:**

```javascript
Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return 自己的router对象; }
});
```

###router-link案例

``` vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Vue.js</title>
	</head>
	<body>
		<div id="app"></div>
		<script src="../tools/vue-v2.5.17.js"></script>
		<!-- 1.引入vue-router（核心插件）对象 -->
		<script src="../tools/vue-router-v3.0.1.js"></script>
		<script type="text/javascript">
			
			var Login = {
				template:`<div>
						我是登陆页面
					</div>`
			};
			
			var Register = {
				template:`<div>
					我是注册页面
				</div>`
			};
			
			// 2. 安装插件 => ？
			Vue.use(VueRouter);
			// 3. 创建一个路由对象
			var router = new VueRouter({
				// 4. 配置路由对象
				routes:[ 
					// 如有对象有了名称就等于有了变量名，router-link只需说明这个变量名就可以了
					/* { path:'/login',component:Login },
					{ path:'/register',component:Register } */
					{name:'login',path:'/mylogin',component:Login },
					{name:'register',path:'/myregister',component:Register }
				]
			});
			// 6. 指定路由改变局部的位置
			var App = {
				template:`<div>
						<!-- vue-router内置组件 -->
						<!--
						<router-link to="/login">登陆</router-link>
						<router-link to="/register">注册</router-link>
						-->
						
						<router-link :to="{ name:'login' }">登陆</router-link>
						<router-link :to="{ name:'login' }">登陆</router-link>
						<router-link :to="{ name:'login' }">登陆</router-link>
						<router-link :to="{ name:'register' }">注册</router-link>
						
						<router-view></router-view>
					</div>`
			};
			// 5. 将配置好的路由对象关联到vue实例中
			new Vue({
				el:'#app',
				/**
				 * 不加这一步，会导致运行时候中undefined对象取不到matched
				 */
				router:router,
				components:{
					app:App
				},
				template:'<app />'
			});
		</script>
	</body>
</html>
```

### 参数router-link

* `Vue.prototype.xxx = {add:fn}`
* 所有组件中，使用`this.xxx`就能拿到这个对象
* 查询字符串
  * 配置`:to="{ name:'detail',query:{id:hero.id} }"`
  * 规则`{ name:'detail',path:'/detail',component:Detail }`
  * 获取`this.$router.query.id`
  * 生成`<a href="/detail?id=1">`
* path方式

## axios

## 模块化







