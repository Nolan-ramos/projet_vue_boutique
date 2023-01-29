<template>
    <div class="container_nav">
        <div class="container_nav--logo">
            Logo
        </div>
        <nav class="container_nav--nav"> 
            <router-link to="/">Accueil</router-link>
            <router-link to="/produits">Produits</router-link>
            <router-link to="/page-admin" v-if="user_info.admin == true">Page admin</router-link>
        </nav>
        <div class="container_nav--button">
            <i class="uil uil-search"></i>
            <i class="uil uil-user-circle" @click="showModal = !showModal"></i>
        </div>
        <div v-show="showModal" class="container_nav--popup_profil">
            <router-link to="/login" v-if="!user_info">Se connecter / S'inscrire</router-link>
            <router-link to="/favoris">Mes favoris</router-link>
            <router-link to="/panier">Panier</router-link>
            <router-link to="/commandes">Mes commandes</router-link>
            <router-link :to="'/user-infos/'+user_info.id">Mes informations</router-link>
            <span v-on:click="logout" v-if="user_info">Se déconnecter</span>
        </div>
    </div>
</template>

<script>
    export default {
        name :'Nav',
        data(){
            return{
                showModal: false,
                user_info:'',
            }
        },
        methods:{
            logout(){
                localStorage.clear();
                this.loadData();
                this.$router.push({name:'Login'});
            },
            loadData(){
                this.user_info = JSON.parse(localStorage.getItem('user-info'));
            }
        },
        mounted(){
            this.loadData()
        }
    }
    
</script>
<style lang="scss">
    .container_nav{
        display: flex;
        align-items: center;
        justify-content: space-between;
        position:absolute;
        top:0;
        left:0;
        background: var(--very_dark);
        height:100px;
        width:100%;
        padding: 0 100px;
        &--logo{
            font-family: 'Kavoon', cursive;
            font-size: 32px;
            color:var(--main-color);
            // font-weight: 700;
        }
        &--nav{
            a{
                margin-right: 15px;
                &:last-child{
                    margin-right: 0;
                }
            }
        }
        &--button{
            i{
                display: inline-block;
                font-size: 32px;
                transition: ease-in-out 0.3s;
                cursor: pointer;
                &:hover{
                    color:var(--main-color);
                }
                &:first-child{
                    margin-right: 15px;
                }
            }
        }
        &--popup_profil{
            position:absolute;
            top:80px;
            right:100px;
            z-index: 2;
            background: var(--very_dark);
            padding:50px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,.4),0 0px 4px rgba(0,0,0,.4) !important;
            a{
                display: block;
                margin-bottom: 15px;
                &:last-child{
                    margin-bottom: 0;
                }
            }
            span{
                cursor: pointer;
                transition: ease-in-out 0.3s;
                &:hover{
                    color:var(--main-color);
                }
            }
        }
    }
</style>