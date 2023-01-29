<template>
    <div class="container_page container_commandes">
        <Nav/>
        <center>Commandes page</center>
    </div>
</template>

<script>
    import Nav from '../components/Nav.vue'
    export default {
        name :'Commandes',
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
    .container_commandes{

    }
</style>