<template>
    <div class="container_page container_update_produit">
        <Nav/>
        <center>Update produit page</center>
    </div>
</template>

<script>
    import Nav from '../components/Nav.vue'
    export default {
        name :'UpdateProduit',
        components:{
            Nav
        },
        data(){
            return{
                user_info:'',
            }
        },
        mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user-info'));
            if(!this.user_info){
                this.$router.push({name:'Login'})
            }
            if(this.user_info.admin == false){
                this.$router.push({name:'Home'})
            }
        }
    }
    
</script>
<style lang="scss">
    .container_update_produit{

    }
</style>