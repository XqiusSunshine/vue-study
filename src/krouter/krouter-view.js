export default{
    render(h){
        // let component = null
        // const route = this.$router.$options.routes.find(route => route.path === this.$router.current)
        // if(route) component = route.component
        // return h(component)
        console.log('k-view,this.$router=',this.$router)
        const { routeMap,current} = this.$router
        const component = routeMap[current] ? routeMap[current].component: null
        return h(component)
    }
}