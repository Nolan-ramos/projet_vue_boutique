<template>
    <div class="container_page container_infos_produit">
        <Nav/>
        <div class="infos_produit">
            <div class="infos_produit--update_delete" v-if="user_info && user_info.admin == true">
                <router-link :to="'/update-produit/'+product_infos.id"><i class="uil uil-edit"></i></router-link>
                <span v-on:click="DeleteProduct()"><i class="uil uil-times-square"></i></span>
            </div>
            <div class="infos_produit--image">
                <img id="infos_produit--image" :src="product_infos.image" alt="">
            </div>
            <div class="infos_produit--slide">
                <img v-on:click="changeImg(product_infos.image)" :src="product_infos.image" alt="">
                <img v-on:click="changeImg('https://images.asos-media.com/products/asos-design-trench-coat-en-imitation-cuir-ultra-oversize-marron/203644808-2?$n_640w$&wid=513&fit=constrain')" src="https://images.asos-media.com/products/asos-design-trench-coat-en-imitation-cuir-ultra-oversize-marron/203644808-2?$n_640w$&wid=513&fit=constrain" alt="">
                <img v-on:click="changeImg('https://images.asos-media.com/products/asos-design-trench-coat-en-imitation-cuir-ultra-oversize-marron/203644808-3?$n_640w$&wid=513&fit=constrain')" src="https://images.asos-media.com/products/asos-design-trench-coat-en-imitation-cuir-ultra-oversize-marron/203644808-3?$n_640w$&wid=513&fit=constrain" alt="">
                <img v-on:click="changeImg('https://images.asos-media.com/products/asos-design-trench-coat-en-imitation-cuir-ultra-oversize-marron/203644808-4?$n_640w$&wid=513&fit=constrain')" src="https://images.asos-media.com/products/asos-design-trench-coat-en-imitation-cuir-ultra-oversize-marron/203644808-4?$n_640w$&wid=513&fit=constrain" alt="">
            </div>
            <div class="infos_produit--all">
                <div class="infos_produit--all--utils">
                    <div class="infos_produit--all--utils--name">{{ product_infos.name }}</div>
                    <div class="infos_produit--all--utils--marque">{{ product_infos.marque }}</div>
                    <div class="infos_produit--all--utils--couleur">
                        <div :style="{ background: product_infos.code_couleur}" class="infos_produit--all--utils--couleur--code"></div>
                        {{ product_infos.couleur }}
                    </div>
                    <div class="infos_produit--all--utils--prix">{{ product_infos.prix }}€</div>
                    <div class="infos_produit--all--utils--taille">
                        <div>XSS</div>
                        <div>XS</div>
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XLL</div>
                    </div>
                </div>
                <div class="infos_produit--all--button">
                    <button>Ajouter aux favoris <i class="uil uil-favorite"></i></button>
                    <button>Ajouter au panier <i class="uil uil-shopping-bag"></i></button>
                </div>  
            </div>
            <div class="infos_produit--details">
                <div class="infos_produit--details--important">
                    <span>Détail du produit</span>
                    <ul>
                        <li>Il ne te reste plus qu'à l'enfiler avant de partir</li>
                        <li>Col cranté</li>
                        <li>Patte de boutonnage</li>
                        <li>Ceinture à nouer</li>
                        <li>Poches latérales</li>
                        <li>Coupe ultra oversize</li>
                    </ul>
                </div>
                <div class="infos_produit--details--taille">
                    <span>Taille et coupe</span>
                    <p>Le mannequin mesure 184 cm (6'0½'')</p>
                    <p>Le mannequin porte une taille M</p>
                </div>
                <div class="infos_produit--details--matiere_entretien">
                    <span>Matière et entretien</span>
                    <p>Lavage en machine conformément aux instructions figurant sur l'étiquette d'entretien</p>
                    <p>Revêtement : 100 % polyuréthane. Doublure : 100 % polyester. Tissu de base : 51 % polyester, 49 % viscose.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Nav from '../components/Nav.vue'
    export default {
        name :'InfosProduit',
        components:{
            Nav
        },
        data(){
            return{
                user_info:'',
                product_infos:{
                    
                }
            }
        },
        methods:{
            changeImg(src){
                document.getElementById("infos_produit--image").src = src
            }
        },
        async mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user-info'));

            const result = await axios.get('http://localhost:3000/produits/'+this.$route.params.id)
            this.product_infos=result.data
        }
    }
    
</script>
<style lang="scss">
    .container_infos_produit{
        .infos_produit{
            position: relative;
            display: flex;
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
            &--image{
                img{
                    height:700px;
                }
            }
            .infos_produit--slide::-webkit-scrollbar{display: none;}
            &--slide{
                height:700px;
                width:200px;
                overflow: scroll;
                img{
                    width:100%;
                    margin: 5px 0 0 5px;
                    transition: ease-in-out 0.3s;
                    cursor: pointer;
                    &:hover{
                        opacity: 0.7;
                    }
                    &:first-child{
                        margin-top: 0;
                    }
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
            }
            &--all{
                margin-left: 5px;
                padding-left:50px;
                &--utils{
                    font-size: 18px;
                    & > div{
                        margin-bottom: 25px;
                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                    &--marque{
                        font-weight: 700;
                    }
                    &--couleur{
                        display: flex;
                        align-items: center;
                        &--code{
                            height: 15px;
                            width: 15px;
                            border-radius: 30px;
                            margin-right: 5px;
                        }
                    }
                    &--taille{
                        font-size: 10px;
                        display: flex;
                        div{
                            width:40px;
                            height:40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-bottom: solid 2px var(--light_dark);
                            border-top: solid 2px var(--light_dark);
                            border-left: solid 2px var(--light_dark);
                            transition: ease-in-out 0.3s;
                            cursor: pointer;
                            &:hover{
                                background: var(--main-color);
                            }
                            &:last-child{
                                border-right: solid 2px var(--light_dark);
                            }
                        }
                        
                    }
                }
                &--button{
                    margin-top: 25px;
                    display: flex;
                    flex-direction: column;
                    button{
                        padding:20px 25px;
                        max-width: 250px;
                        background: var(--dark);
                        border:solid var(--main-color) 1px;
                        color:#fff;
                        transition: ease-in-out 0.3s;
                        &:hover{
                            background: var(--main-color);
                        }
                        &:nth-child(1){
                            margin-bottom: 25px;
                        }
                    }
                }
            }
            &--details{
                padding-left:50px;
                div{
                    margin-top: 15px;
                    ul{
                        list-style: inside;
                        li{
                            margin-bottom: 5px;
                        }
                    }
                    p{
                        margin-bottom: 10px;
                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                    &:first-child{
                        margin-top: 0;
                    }
                }
                span{
                    font-weight: 700;
                    font-size: 18px;
                    margin-bottom: 15px;
                    display: block;
                }
            }
        }
    }
</style>