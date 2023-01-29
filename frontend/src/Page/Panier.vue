<template>
    <div class="container_page container_panier">
        <Nav/>
        <center>Panier page</center>
    </div>
</template>

<script>
    import Nav from '../components/Nav.vue'
    export default {
        name :'Panier',
        components:{
            Nav
        },
        mounted(){
            let user = localStorage.getItem('user-info');
            if(!user){
                this.$router.push({name:'Login'})
            }
        }
    }
    
</script>
<style lang="scss">
    .container_panier{

    }
</style>