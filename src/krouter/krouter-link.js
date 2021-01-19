export default {
    props: {
        to: String,
        required:true
    },
    render(h){
        console.log('k-link',h,'this.to=',this.to)
        return h('a',{
            attrs:{
                href: '#' + this.to
            }
        },[this.$slots.default])
    }
}