<template>
    <div class="container_page container_infos_produit">
        <Nav/>
        <div class="infos_produit">
            <div class="infos_produit--update_delete" v-if="user_info && user_info.admin == true">
                <router-link :to="'/update-produit/'+product_infos.id"><i class="uil uil-edit"></i></router-link>
                <span v-on:click="DeleteProduct()"><i class="uil uil-times-square"></i></span>
            </div>
            <div class="infos_produit--image">
                <img id="infos_produit--image" :src="product_img" alt="">
            </div>
            <div class="infos_produit--slide">
                <img v-for="image in product_infos.image" :key="image" :src="image" alt="" v-on:click="changeImg(image)" >
            </div>
            <div class="infos_produit--all">
                <div class="infos_produit--all--utils">
                    <div class="infos_produit--all--utils--name">{{ product_infos.name }}</div>
                    <div class="infos_produit--all--utils--marque">{{ product_infos.marque }}</div>
                    <div class="infos_produit--all--utils--couleur">
                        <div :style="{ background: product_infos.code_couleur}" class="infos_produit--all--utils--couleur--code"></div>
                        {{ product_infos.couleur }}
                    </div>
                    <div class="infos_produit--all--utils--prix">
                        <span v-if="!product_infos.promo">{{ product_infos.prix }}€</span>
                        <span v-if="product_infos.promo" style="text-decoration:line-through;">{{ product_infos.prix }}€</span>
                        <div v-if="product_infos.promo != 0" class="infos_produit--all--utils--prix--promo">{{ Math.round(product_infos.prix * (1 - product_infos.promo/100) * 100) / 100 }}€(-{{ product_infos.promo }}%)€</div>
                    </div>
                    <div class="infos_produit--all--utils--taille">
                        <div v-for="taille in product_infos.taille" :key="taille" v-on:click="choiceSize(taille[0])">
                            <span v-if="taille[1] > 0" class="size_product">{{ taille[0] }}</span>
                        </div>
                        <div v-if="rupture" class="infos_produit--all--utils--taille--rupture">
                            RUPTURE DE STOCK
                        </div>
                    </div>
                    <span id="message_size">cc</span>
                </div>
                <div class="infos_produit--all--button">
                    <button id="add_favoris" v-on:click="addFavoris()"></button>
                    <button v-on:click="addPanier()">Ajouter au panier <i class="uil uil-shopping-bag"></i></button>
                </div>  
            </div>
            <div class="infos_produit--details">
                <div class="infos_produit--details--important">
                    <span>Détail du produit</span>
                    <ul>
                        <li v-for="detail_important in product_infos.detail_important" :key="detail_important">{{ detail_important }}</li>
                    </ul>
                </div>
                <div class="infos_produit--details--taille_coupe">
                    <span>Taille et coupe</span>
                    <p v-for="taille_coupe in product_infos.taille_coupe" :key="taille_coupe">{{ taille_coupe }}</p>
                </div>
                <div class="infos_produit--details--matiere_entretien">
                    <span>Matière et entretien</span>
                    <p v-for="matiere_entretien in product_infos.matiere_entretien" :key="matiere_entretien">{{ matiere_entretien }}</p>
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
                product_infos:[],
                product_img:'',
                choice_size:'',
                already_fav: false,
                rupture: false,
            }
        },
        methods:{
            async addFavoris(){
                if(!this.user_info){
                    this.$router.push({name:'Login'})
                }
                else{
                    if(this.already_fav == false){
                        let result = await axios.post("http://localhost:3000/favoris",{
                            id_user:this.user_info.id,
                            id_produit:this.product_infos.id,
                        });
                        if(result.status==201){
                            this.messageSize("Le produit a bien été ajouté aux favoris", "green", "block");
                            this.already_fav = true;
                            this.textFavButton();
                        }
                    }
                    else{
                        let favoris = await axios.get(`http://localhost:3000/favoris?id_user=${this.user_info.id}&id_produit=${this.product_infos.id}`)
                        let result = await axios.delete('http://localhost:3000/favoris/'+favoris.data[0].id)
                        console.log(result)
                        if(result.status==200){
                            this.messageSize("Le produit a bien été supprimé des favoris", "green", "block");
                            this.already_fav = false;
                            this.textFavButton();
                        }
                    }
                }
            },
            async addPanier(){
                if(!this.user_info){
                    this.$router.push({name:'Login'})
                }
                else{
                    if(this.choice_size === ''){
                        this.messageSize("Vous n'avez pas chosis de taille", "red", "block");
                    }
                    else{
                        let panier = await axios.get(`http://localhost:3000/panier?id_user=${this.user_info.id}&id_produit=${this.product_infos.id}&size=${this.choice_size}`)
                        if(panier.data.length == 0){
                            let result = await axios.post("http://localhost:3000/panier",{
                                id_user:this.user_info.id,
                                id_produit:this.product_infos.id,
                                size:this.choice_size,
                                nombre: 1,
                            });
                            if(result.status==201){
                                this.messageSize("Le produit a bien été ajouté au panier", "green", "block");
                            }
                        }
                        else{
                            let panier = await axios.get(`http://localhost:3000/panier?id_user=${this.user_info.id}&id_produit=${this.product_infos.id}&size=${this.choice_size}`)
                            let  size_quantite = null
                            for(let i = 0; i < this.product_infos.taille.length; i++){
                                // panier.data[0].nombre + 1 > this.product_infos.taille[0][1]
                                if(this.product_infos.taille[i][0] == this.choice_size){
                                    size_quantite = i
                                }
                            }
                            if(panier.data[0].nombre + 1 > this.product_infos.taille[size_quantite][1]){
                                this.messageSize("Il n'y a pas assez de produit disponible", "red", "block");
                            }
                            else{
                                let result = await axios.put('http://localhost:3000/panier/'+panier.data[0].id,{
                                    id_user:this.user_info.id,
                                    id_produit:this.product_infos.id,
                                    size:this.choice_size,
                                    nombre: panier.data[0].nombre + 1
                                });
                                if(result.status==200){
                                    panier = await axios.get(`http://localhost:3000/panier?id_user=${this.user_info.id}&id_produit=${this.product_infos.id}&size=${this.choice_size}`)
                                    this.messageSize("Ce produit était déjà dans votre panier, vous en avez maintenant "+panier.data[0].nombre, "green", "block");
                                }
                            }
                        }
                    }
                }
            },
            messageSize(text,color,display){
                document.querySelector("#message_size").innerHTML = text
                document.querySelector("#message_size").style.color = color
                document.querySelector("#message_size").style.display = display
            },
            changeImg(src){
                document.getElementById("infos_produit--image").src = src
            },
            choiceSize(size){
                this.choice_size = size;
                this.messageSize("Vous avez chosis la taille : "+this.choice_size, "green", "block")

                const size_product = document.getElementsByClassName("size_product");
                for(let i = 0; i < size_product.length; i++){
                    size_product[i].classList.remove("size_product_main_color")
                    size_product[i].classList.add("size_product_dark")
                    if(size_product[i].innerHTML == size){
                        size_product[i].classList.remove("size_product_dark")
                        size_product[i].classList.add("size_product_main_color")
                    }
                }
            },
            textFavButton(){
                if(this.already_fav == false){
                    document.getElementById("add_favoris").innerHTML = 'Ajouter aux favoris <i class="uil uil-favorite"></i>'
                }
                else{
                    document.getElementById("add_favoris").innerHTML = 'Supprimer des favoris <i class="uil uil-favorite"></i>'
                }
            }
        },
        async mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user-info'));

            const result = await axios.get('http://localhost:3000/produits/'+this.$route.params.id)
            this.product_infos=result.data
            this.product_img=this.product_infos.image[0]

            let favoris = await axios.get(`http://localhost:3000/favoris?id_user=${this.user_info.id}&id_produit=${this.product_infos.id}`)
            if(favoris.data.length == 1){
                this.already_fav = true
            }
            else{
                this.already_fav = false
            }
            this.textFavButton()

            if(this.product_infos.taille[0][1] == 0 && this.product_infos.taille[1][1] == 0 && this.product_infos.taille[2][1] == 0 && this.product_infos.taille[3][1] == 0 && this.product_infos.taille[4][1] == 0 && this.product_infos.taille[5][1] == 0 && this.product_infos.taille[6][1] == 0){
                this.rupture = true
            }
            else{
                this.rupture = false
            }
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
                    width:550px;
                    object-fit: cover;
                }
            }
            .infos_produit--slide::-webkit-scrollbar{display: none;}
            &--slide{
                height:700px;
                width:150px;
                overflow: scroll;
                img{
                    width: 100%;
                    margin: 5px 0 0 5px;
                    transition: ease-in-out 0.3s;
                    object-fit: cover;
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
                width: calc(50% - 350px);
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
                            width:20px;
                            height:20px;
                            border-radius: 30px;
                            margin-right: 5px;
                        }
                    }
                    &--prix{
                        display: flex;
                        &--promo{
                            color: var(--main-color);
                            margin-left: 10px;
                            font-weight: 700;
                        }
                    }
                    &--taille{
                        font-size: 10px;
                        display: flex;
                        .size_product_dark{
                            background: var(--dark);
                        }
                        .size_product_main_color{
                            background: var(--main-color);
                        }
                        div{
                            span{
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
                                
                            }
                            &:last-child{
                                border-right: solid 2px var(--light_dark);
                            }
                        }
                        &--rupture{
                            border: solid 2px var(--light_dark);
                            padding:10px;
                        }
                    }
                    #message_size{
                        display: none;
                        font-size: 16px;
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
                width: calc(50% - 350px);
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
    // @media screen and (max-width: 1500px) {
    //     .container_infos_produit{
    //         .infos_produit{
    //             &--image{
    //                 img{
    //                     height:500px;
    //                 }
    //             }
    //             &--slide{
    //                 height:500px;
    //             }
    //         }
    //     }
    // }
</style>