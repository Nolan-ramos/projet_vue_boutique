<template>
    <div class="container_page container_login">
        <Nav/>
        <div class="container_login--form form">
            <h1>Se connecter</h1>
            <input type="mail" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Password">
            <span id="message_form"></span>
            <input v-on:click="login()" type="submit" value="Connexion">
            <p>Vous n'avez pas de compte ?</p>
            <router-link to="/signup">S'inscrire</router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Nav from '../components/Nav.vue'
    export default {
        name :'Login',
        components:{
            Nav
        },
        data(){
            return{
                email:'',
                password:''
            }
        },
        methods:{
            messageForm(text,color,display){
                document.querySelector("#message_form").innerHTML = text
                document.querySelector("#message_form").style.color = color
                document.querySelector("#message_form").style.display = display
            },
            async login(){
                if(!this.email || !this.password){
                    this.messageForm("Email ou mdp non remplis !","red","block")
                }
                else{
                    let result = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
                    console.log(result.data.length)
                    if(result.status==200 && result.data.length == 1){
                        localStorage.setItem("user-info",JSON.stringify(result.data[0]))
                        this.$router.push({name:'Home'})
                    }
                    else{
                        this.messageForm("Email ou mdp incorrect !","red","block")
                    }
                }
                
            }
        },
        mounted(){
            let user = localStorage.getItem('user-info');
            if(user){
                this.$router.push({name:'Home'})
            }
        }
    }
    
</script>
<style lang="scss">
    .container_login{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>