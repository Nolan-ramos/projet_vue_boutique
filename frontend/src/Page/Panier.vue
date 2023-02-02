<template>
    <div class="container_page container_panier">
        <Nav/>
        <!-- 0 = name, 1 = marque, 2 = categorie, 3 = code couleur, 4 = couleur, 5 = prix, 6 = promo, 7 = taille, 8 = image, 9 = id, 10 = nombre, 11 = size -->
        <div class="container_panier--infos_paiement">
            <div class="paiement">
                TOTAL
                <hr>
            </div>
        </div>
        <div class="container_panier--all_panier">
            <div v-for="panier in produit_panier" :key="panier" class="panier">
                <router-link :to="{name: 'InfosProduit', params: {id: panier[9]}}" class="panier--link">
                    <img class="panier--link--image" :src="panier[8][0]" alt="">
                </router-link>
                <div class="panier--infos">
                    <div class="panier--infos--name">{{ panier[0] }}</div>
                    <div class="panier--infos--marque">{{ panier[1] }}</div>
                    <div class="panier--infos--couleur">
                        <div class="panier--infos--couleur--code" :style="{ background: panier[3]}"></div>
                        <div>{{ panier[4] }}</div>
                    </div>
                    <div class="panier--infos--prix">
                        <span v-if="panier[6] == 0">{{ panier[5] }}€</span>
                        <span v-if="panier[6] != 0" style="text-decoration:line-through;">{{ panier[5] }}€</span>
                        <span class="panier--infos--prix--promo" v-if="panier[6] != 0">{{ Math.round(panier[5] * (1 - panier[6]/100) * 100) / 100 }}€(-{{ panier[6] }}%)</span>
                    </div>
                    <span class="panier--infos--size">{{ panier[11] }}</span>
                    <div class="panier--infos--quantite">
                        <div class="panier--infos--quantite--less">-</div>
                        <div class="panier--infos--quantite--nombre">{{ panier[10] }}</div>
                        <div class="panier--infos--quantite--less">+</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Nav from '../components/Nav.vue'
    export default {
        name :'Panier',
        components:{
            Nav
        },
        data(){
            return{
                produit_panier:[],
                user_info:'',
            }
        },
        methods:{
            async loadData(){
                let panier = await axios.get(`http://localhost:3000/panier?id_user=${this.user_info.id}`)
                let produits = await axios.get(`http://localhost:3000/produits`)
                for(let i = 0; i < panier.data.length; i++){
                    for(let j = 0; j < produits.data.length; j++){
                        if(panier.data[i].id_produit == produits.data[j].id){
                            let add_to_produit_panier = []
                            add_to_produit_panier.push(
                                produits.data[j].name, 
                                produits.data[j].marque, 
                                produits.data[j].categorie,
                                produits.data[j].code_couleur,
                                produits.data[j].couleur,
                                produits.data[j].prix,
                                produits.data[j].promo,
                                produits.data[j].taille,
                                produits.data[j].image,
                                produits.data[j].id,
                                panier.data[i].nombre,
                                panier.data[i].size
                            )
                            this.produit_panier.push(add_to_produit_panier)
                        }
                    }
                }
                console.log(this.produit_panier)
            }
        },
        mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user-info'));
            if(!this.user_info){
                this.$router.push({name:'Login'})
            }
            this.loadData()
        }
    }
</script>
<style lang="scss">
    .container_panier{
        display: flex;
        justify-content: space-between;
        &--infos_paiement{
            order: 2;
            .paiement{
                width:400px;
                padding:50px;
                background: var(--very_dark);
            }
        }
        &--all_panier{
            order: 1;
            margin-right: 50px;
            .panier{
                display: flex;
                margin-bottom: 100px;
                &--link{
                    &--image{
                        width:350px;
                        transition: ease-in-out 0.3s;
                        &:hover{
                            opacity:0.7;
                        }
                    }
                }
                &--infos{
                    font-size: 18px;
                    margin-left: 50px;
                    &--name{
                        margin-bottom: 15px;
                    }
                    &--marque{
                        margin-bottom: 15px;
                        font-weight: 700;
                    }
                    &--couleur{
                        margin-bottom: 15px;
                        display: flex;
                        align-items: center;
                        &--code{
                            width:20px;
                            height:20px;
                            border-radius: 30px;
                            margin-right: 10px;
                        }
                    }
                    &--prix{
                        margin-bottom: 15px;
                        &--promo{
                            color: var(--main-color);
                            margin-left: 10px;
                            font-weight: 700;
                        }
                    }
                    &--size{
                        font-size: 10px;
                        padding:10px;
                        border:solid 1px var(--light_dark);
                    }
                    &--quantite{
                        margin-top: 25px;
                        display: flex;
                        align-items: center;
                        &--less,
                        &--more,
                        &--nombre{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            min-width:35px;
                            height:35px;
                            border:solid 1px var(--light_dark);
                            transition: ease-in-out 0.3s;
                            font-size: 10px;
                        }
                        &--less,
                        &--more{
                            cursor: pointer;
                            &:hover{
                                background: var(--main-color);
                            }
                        }
                        &--nombre{
                            border-left-width: 0px;
                            border-right-width: 0px;
                        }
                    }
                }
                &:last-child{
                    margin-bottom: 0;
                }
            }
        }
    }
</style>