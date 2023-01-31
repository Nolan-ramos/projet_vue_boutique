<template>
    <div class="container_page container_produits">
        <Nav/>
        <div class="container_produits--all_produits">
            <div v-for="produit in produits" :key="produit.id" class="produit">
                <div class="produit--update_delete" v-if="user_info && user_info.admin == true">
                    <router-link :to="'/update-produit/'+produit.id"><i class="uil uil-edit"></i></router-link>
                    <span v-on:click="DeleteProduct()"><i class="uil uil-times-square"></i></span>
                </div>
                <div class="produit--add_fav">
                    <span v-on:click="addFav()"><i class="uil uil-favorite"></i></span>
                </div>
                <router-link :to="{name: 'InfosProduit', params: {id: produit.id}}" class="produit--card">
                    <img :src="produit.image[0]" alt="">
                    <div class="produit--card--infos">
                        <span class="produit--card--infos--name">{{ produit.name }}</span>
                        <span class="produit--card--infos--marque">{{ produit.marque }}</span>
                        <div class="produit--card--infos--color_prix">
                            <div class="produit_color"><div :style="{ background: produit.code_couleur}"></div><div>{{ produit.couleur }}</div></div>
                            <span class="produit_prix">{{ produit.prix }}€</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Nav from '../components/Nav.vue'
    export default {
        name :'Produits',
        components:{
            Nav
        },
        data(){
            return{
                produits:[],
                user_info:'',
                fav_list:[],
            }
        },
        methods:{
            async loadData(){
                let result = await axios.get('http://localhost:3000/produits');
                this.produits = result.data;

                this.user_info = JSON.parse(localStorage.getItem('user-info'));
            },
            async favList(){
                this.user_info = JSON.parse(localStorage.getItem('user-info'));
                let result = await axios.get(`http://localhost:3000/favoris?id_user=${this.user_info.id}`)
                for(let i = 0; i < result.data.length; i++){
                    this.fav_list.push(result.data[i].id_produit)
                }
            }
        },
        async mounted(){
            this.loadData()
            this.favList()
        }
    }
    
</script>
<style lang="scss">
    .container_produits{
        &--all_produits{
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            .produit{
                position: relative;
                width:calc(100%/5 - 28px);
                margin-right: 35px;
                margin-top: 35px;
                &--update_delete{
                    position:absolute;
                    top:7.5px;
                    left:0;
                    z-index: 1;
                    a,
                    span{
                        transition: ease-in-out 0.3s;
                        padding:10px;
                        &:hover{
                            opacity: 0.7;
                        }
                    }
                    a{
                        background: orange;
                        &:hover{
                            color: white !important;
                        }
                    }
                    span{
                        background: red;
                        cursor: pointer;
                    }
                }
                &--add_fav{
                    position:absolute;
                    top:7.5px;
                    right:7.5px;
                    z-index: 1;
                    span{
                        i{  
                            // color: var(--main-color);
                            font-size: 24px;
                            line-height: 1;
                        }
                    }
                    .add_fav_dark{
                        color: var(--dark);
                    }
                    .add_fav_main_color{
                        color: var(--main-color);
                    }
                }
                &:nth-child(5n){
                    margin-right: 0px;
                }
                &:nth-child(1),
                &:nth-child(2),
                &:nth-child(3),
                &:nth-child(4),
                &:nth-child(5){
                    margin-top: 0;
                }
                &--card{
                    display: block;
                    img{
                        transition: ease-in-out 0.3s;
                        width:100%;
                    }
                    &--infos{
                        span{
                            display: block;
                        }
                        font-size: 14px;
                        &--name{
                            margin-top: 12.5px;
                        }
                        &--marque{
                            font-weight: 700;
                            margin: 12.5px 0;
                        }
                        &--color_prix{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 12px;
                            .produit_color{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                div{
                                    &:first-child{
                                        width:15px;
                                        height:15px;
                                        border-radius:30px ;
                                        margin-right: 5px;
                                    }
                                    &:last-child{
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                    }
                                }
                            }
                        }
                    }
                    &:hover img{
                        opacity: 0.7;
                    }
                    &:hover{
                        color: white !important;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 1500px) {
        .container_produits{
            &--all_produits{
                .produit{
                    width:calc(100%/4 - 26.3px);
                    &:nth-child(5n){
                        margin-right: 35px;
                    }
                    &:nth-child(4n){
                        margin-right: 0;
                    }
                    &:nth-child(5){
                        margin-top: 35px;
                    }
                }
            }
        }
    }
</style>