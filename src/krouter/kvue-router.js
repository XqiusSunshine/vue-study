// 自己的路由器
// 1.VueRouter类，是一个插件
import Link from './krouter-link'
import View from './krouter-view'
let Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;
    console.log('this.$options=',this.$options)
    //缓存path 和route映射关系
    this.routeMap = {}
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })

    // 声明一个响应式的current
    // 渲染函数如果要重复执行，必须依赖于响应式数据
    const initial = window.location.hash.slice(1) || "/";
    console.log(' window.location.hash=', window.location.hash,'initial=',initial)
    Vue.util.defineReactive(this, "current", initial);
    // this.current = window.location.hash.slice(1) || '/'

    // 监听url变化
    window.addEventListener("hashchange", () => {
      console.log('hashchange  window.location.hash=', window.location.hash,'initial=',window.location.hash.slice(1))
      this.current = window.location.hash.slice(1);
    });
  }
}

// 插件要实现install
// 参数1就是Vue
VueRouter.install = function(_Vue) {
  // 保存构造函数的引用
  Vue = _Vue;

  // 2.挂载$router到Vue原型
  // 利用全局混入，延迟执行下面的代码，这样可以获取router实例
  Vue.mixin({
    beforeCreate() {
      // this指的是组件实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 3.声明两个全局组件router-view、router-link
  // <router-link to="/abc">xxx</router-link>
  Vue.component("router-link", Link);
  Vue.component("router-view", View);
};

export default VueRouter;
