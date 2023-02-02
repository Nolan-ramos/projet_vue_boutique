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
                    <i v-on:click="addFav(produit.id)" class="uil uil-favorite add_fav_dark" v-if="!this.fav_list.includes(produit.id)"></i>
                    <i v-on:click="deleteFav(produit.id)" class="uis uis-star" v-if="this.fav_list.includes(produit.id)"></i>
                </div>
                <router-link :to="{name: 'InfosProduit', params: {id: produit.id}}" class="produit--card">
                    <img :src="produit.image[0]" alt="">
                    <div class="produit--card--infos">
                        <span class="produit--card--infos--name">{{ produit.name }}</span>
                        <span class="produit--card--infos--marque">{{ produit.marque }}</span>
                        <div class="produit--card--infos--color_prix">
                            <div class="produit_color"><div :style="{ background: produit.code_couleur}"></div><div>{{ produit.couleur }}</div></div>
                            <div class="produit_prix">
                                <span v-if="!produit.promo">{{ produit.prix }}€</span>
                                <span v-if="produit.promo" style="text-decoration:line-through;">{{ produit.prix }}€</span>
                                <span class="produit_prix--promo" v-if="produit.promo != 0">{{ Math.round(produit.prix * (1 - produit.promo/100) * 100) / 100 }}€(-{{ produit.promo }}%)</span>
                            </div>
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
                console.log(this.produits)
            },
            async favList(){
                this.user_info = JSON.parse(localStorage.getItem('user-info'));
                let result = await axios.get(`http://localhost:3000/favoris?id_user=${this.user_info.id}`)
                for(let i = 0; i < result.data.length; i++){
                    if(!this.fav_list.includes(result.data[i].id_produit)){
                        this.fav_list.push(result.data[i].id_produit)
                    }
                }
            },
            async addFav(product_id){
                let result = await axios.post("http://localhost:3000/favoris",{
                    id_user:this.user_info.id,
                    id_produit:product_id,
                });
                if(result.status==201){
                    this.favList()
                }
            },
            async deleteFav(product_id){
                let fav_to_delete = await axios.get(`http://localhost:3000/favoris?id_user=${this.user_info.id}&id_produit=${product_id}`)
                let result = await axios.delete('http://localhost:3000/favoris/'+fav_to_delete.data[0].id)
                if(result.status==200){
                    var index_to_delete = this.fav_list.indexOf(product_id);
                    this.fav_list.splice(index_to_delete, 1);
                }
            },
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
                    i{     
                        cursor: pointer;
                        display: block;
                        transition: ease-in-out 0.3s;
                        color: var(--main-color);
                        font-size: 24px;
                        line-height: 1;
                        &:hover{
                            rotate: 360deg;
                        }
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
                            .produit_prix{
                                display: flex;
                                &--promo{
                                    margin-left: 5px;
                                    color: var(--main-color);
                                    font-weight: 700;
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
    // @media screen and (max-width: 1500px) {
    //     .container_produits{
    //         &--all_produits{
    //             .produit{
    //                 width:calc(100%/4 - 26.3px);
    //                 &:nth-child(5n){
    //                     margin-right: 35px;
    //                 }
    //                 &:nth-child(4n){
    //                     margin-right: 0;
    //                 }
    //                 &:nth-child(5){
    //                     margin-top: 35px;
    //                 }
    //             }
    //         }
    //     }
    // }
</style>