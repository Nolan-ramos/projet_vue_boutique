<template>
    <div class="container_page container_user_info">
        <Nav/>
        <div class="container_user_info--form form">
            <h1>Modifier ses informations</h1>
            <input type="email" v-model="user_infos.email" placeholder="Email">
            <input type="password" v-model="user_infos.password" placeholder="Email">
            <input type="text" v-model="user_infos.prenom" placeholder="Prénom">
            <input type="text" v-model="user_infos.nom" placeholder="Nom">
            <input type="tel" v-model="user_infos.telephone" placeholder="Télephone">
            <input type="text" v-model="user_infos.adresse" placeholder="Adresse">
            <input type="text" v-model="user_infos.ville" placeholder="Ville">
            <input type="text" v-model="user_infos.code_postal" placeholder="Code postal">
            <input type="text" v-model="user_infos.pays" placeholder="Pays">
            <span id="message_form"></span>
            <input v-on:click="updateUserInfos()" type="submit" value="Modifier">
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Nav from '../components/Nav.vue'
    export default {
        name :'UserInfos',
        components:{
            Nav
        },
        data(){
            return{
                user_infos:{
                    email:'',
                    password:'',
                    prenom:'',
                    nom:'',
                    telephone:'',
                    adresse:'',
                    ville:'',
                    code_postal:'',
                    pays:'',
                    admin:''
                }
            }
        },
        methods:{
            messageForm(text,color,display){
                document.querySelector("#message_form").innerHTML = text
                document.querySelector("#message_form").style.color = color
                document.querySelector("#message_form").style.display = display
            },
            async updateUserInfos(){
                let result = await axios.put('http://localhost:3000/users/'+this.user_infos.id,{
                    email:this.user_infos.email,
                    password:this.user_infos.password,
                    prenom:this.user_infos.prenom,
                    nom:this.user_infos.nom,
                    telephone:this.user_infos.telephone,
                    adresse:this.user_infos.adresse,
                    ville:this.user_infos.ville,
                    code_postal:this.user_infos.code_postal,
                    pays:this.user_infos.pays,
                    admin:this.user_infos.admin

                });
                if(result.status==200){
                    this.messageForm("Modifications enregistrées !","green","block")
                }
            }
        },
        async mounted(){
            let user = JSON.parse(localStorage.getItem('user-info'));
            if(!user){
                this.$router.push({name:'Login'})
            }
            const result = await axios.get('http://localhost:3000/users/'+user.id)
            this.user_infos=result.data
        }
    }
    
</script>
<style lang="scss">
    .container_user_info{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height:100vh;
    }
</style>