<template>
    <div class="container_page container_infos_produit">
        <Nav/>
        <div class="infos_produit">
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

                </div>  
            </div>
            <div class="infos_produit--details">

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
            let user = localStorage.getItem('user-info');
            if(!user){
                this.$router.push({name:'Login'})
            }
            const result = await axios.get('http://localhost:3000/produits/'+this.$route.params.id)
            this.product_infos=result.data
        }
    }
    
</script>
<style lang="scss">
    .container_infos_produit{
        .infos_produit{
            border:solid red;
            display: flex;
            flex-wrap: wrap;
            &--image{
                border:solid blue;
                img{
                    height:700px;
                }
            }
            .infos_produit--slide::-webkit-scrollbar{display: none;}
            &--slide{
                border:solid green;
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
                border:solid purple;
                margin-left: 5px;
                padding-left:50px;
                &--utils{
                    font-size: 18px;
                    & > div{
                        margin-bottom: 20px;
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
            }
            &--details{
                border:solid orange;
                padding-left:50px;
            }
        }
    }
</style>