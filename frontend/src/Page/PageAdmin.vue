<template>
    <div class="container_page container_page_admin">
        <Nav/>
        <center>Admin page</center>
    </div>
</template>

<script>
    import Nav from '../components/Nav.vue'
    export default {
        name :'PageAdmin',
        components:{
            Nav
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
    .container_page_admin{

    }
</style>