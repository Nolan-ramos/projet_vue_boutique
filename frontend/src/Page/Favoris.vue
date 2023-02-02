<template>
    <div class="container_page container_favoris">
        <Nav/>
        <div class="container_favoris--all_produits">
            <div v-for="produit in produits" :key="produit.id" class="produit">
                <div class="produit--add_fav">
                    <i v-on:click="deleteFav(produit.id)" class="uis uis-star"></i>
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
            }
        },
        methods:{
            async loadData(){
                this.user_info = JSON.parse(localStorage.getItem('user-info'));
                let all_favoris = await axios.get(`http://localhost:3000/favoris?id_user=${this.user_info.id}`);
                let all_produits = await axios.get(`http://localhost:3000/produits`);
                // parcours liste favoris
                for(let i = 0; i < all_favoris.data.length; i++){
                    // parcours liste all produits
                    for(let j = 0; j < all_produits.data.length; j++){
                        if(all_favoris.data[i].id_produit == all_produits.data[j].id){
                            if(!this.produits.includes(all_produits.data[j])){
                                this.produits.push(all_produits.data[j])
                            }
                        }
                    }
                }
                console.log(this.produits)
            },
            async deleteFav(product_id){
                let fav_to_delete = await axios.get(`http://localhost:3000/favoris?id_user=${this.user_info.id}&id_produit=${product_id}`)
                let result = await axios.delete('http://localhost:3000/favoris/'+fav_to_delete.data[0].id)
                if(result.status==200){
                    for(let i = 0; i < this.produits.length; i++){
                        if(this.produits[i].id == product_id){
                            this.produits.splice(i, 1);
                        }
                    }
                }
            },
        },
        async mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user-info'));
            if(!this.user_info){
                this.$router.push({name:'Login'})
            }
            this.loadData()
        }
    }
    
</script>
<style lang="scss">
    .container_favoris{
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
    //     .container_favoris{
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