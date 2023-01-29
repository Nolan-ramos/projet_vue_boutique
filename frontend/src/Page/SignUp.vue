<template>
    <div class="container_page container_signup">
        <Nav/>
        <div class="container_signup--form form">
            <h1>S'inscrire</h1>
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Password">
            <input type="password" v-model="confirme_password" placeholder="Confirme password">
            <input type="text" v-model="prenom" placeholder="Prenom">
            <input type="text" v-model="nom" placeholder="Nom">
            <input type="date" v-model="date_naissance" placeholder="Date de naissance">
            <span id="message_form"></span>
            <input v-on:click="signUp()" type="submit" value="Inscription">
            <p>Vous avez déjà un compte ?</p>
            <router-link to="/login">Se connecter</router-link>
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
                password:'',
                confirme_password:'',
                prenom:'',
                nom:'',
                date_naissance:''
            }
        },
        methods:{
            messageForm(text,color,display){
                document.querySelector("#message_form").innerHTML = text
                document.querySelector("#message_form").style.color = color
                document.querySelector("#message_form").style.display = display
            },
            async signUp(){
                // si un champ n'est pas remplis
                if(!this.email || !this.password || !this.confirme_password || !this.prenom || !this.nom || !this.date_naissance){
                    this.messageForm("Un champ n'est pas complété","red","block")
                }
                else{
                    let verif_email = await axios.get(`http://localhost:3000/users?email=${this.email}`)
                    // si l'adresse mail existe déjà
                    if(verif_email.data.length === 0){
                        // si les mots de passes sont différents
                        if(this.password === this.confirme_password){
                            let result = await axios.post("http://localhost:3000/users",{
                                email:this.email,
                                password:this.password,
                                prenom:this.prenom,
                                nom:this.nom,
                                date_naissance:this.date_naissance,
                                telephone:null,
                                adresse:"",
                                ville:"",
                                code_postal:"",
                                pays:"",
                                admin:false
                            });
                            if(result.status==201){
                                localStorage.setItem("user-info",JSON.stringify(result.data))
                                this.$router.push({name:'Home'})
                            }
                        }
                        else{
                            this.messageForm("Les mots de passes sont différents !","red","block")
                        }
                    }
                    else{
                        this.messageForm("L'adresse mail est déjà utilisée !","red","block")
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
    .container_signup{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height:100vh;
    }
</style>