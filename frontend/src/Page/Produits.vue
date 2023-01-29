<template>
    <div class="container_page container_produits">
        <Nav/>
        <div class="container_produits--all_produits">
            <div v-for="produit in produits" :key="produit.id" class="produit">
                <div class="produit--update_delete" v-if="user_info.admin == true">
                    <router-link :to="'/update-produit/'+produit.id"><i class="uil uil-edit"></i></router-link>
                    <span v-on:click="DeleteProduct()"><i class="uil uil-times-square"></i></span>
                </div>
                <router-link :to="{name: 'InfosProduit', params: {id: produit.id}}" class="produit--card">
                    <img :src="produit.image" alt="">
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
            }
        },
        methods:{
            async loadData(){
                let result = await axios.get('http://localhost:3000/produits');
                this.produits = result.data;

                this.user_info = JSON.parse(localStorage.getItem('user-info'));
            }
            
        },
        async mounted(){
            this.loadData()
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
                    top:11.5px;
                    right:0;
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
</style>