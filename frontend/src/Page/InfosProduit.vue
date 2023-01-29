<template>
    <div class="container_page container_infos_produit">
        <Nav/>
    </div>
</template>

<script>
    import axios from 'axios'
    import Nav from '../components/Nav.vue'
    export default {
        name :'InfosProduit',
        components:{
            Nav
        },
        data(){
            return{
                product_infos:{
                    
                }
            }
        },
        methods:{
            
        },
        async mounted(){
            let user = localStorage.getItem('user-info');
            if(!user){
                this.$router.push({name:'Login'})
            }
        }
    }
    
</script>
<style lang="scss">
    .container_infos_produit{

    }
</style>