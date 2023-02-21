<template>
    <div class="container_page container_panier">
        <Nav/>
        <Paiement :produit_panier="produit_panier"/>
        <!-- 0 = name, 1 = marque, 2 = categorie, 3 = code couleur, 4 = couleur, 5 = prix, 6 = promo, 7 = taille, 8 = image, 9 = id produit, 10 = nombre, 11 = size, 12 = id panier -->
        <div class="container_panier--infos_paiement">
            <div class="paiement">
                <h1>total</h1>
                <hr>
                <div class="paiement--prix">
                    <span>Sous total</span>
                    <div class="paiement--prix--promo">
                        <div v-if="code_promo[1] == 0">{{ prix_panier }}€</div>
                        <div v-if="code_promo[1] != 0" style="text-decoration:line-through;">{{ prix_panier }}€</div>
                        <div v-if="code_promo[1] != 0" class="paiement--prix--promo--main_color">{{ Math.round(prix_panier * (1 - code_promo[1]/100) * 100) / 100 }}€(-{{ code_promo[1] }}%)</div>
                    </div>
                </div>
                <div class="paiement--code_promo">
                    <span>Code promotionel</span>
                    <div class="paiement--code_promo--input_button">
                        <input type="text" v-model="code_promo[0]" placeholder="Code promotionel">
                        <button v-on:click="confirmCodePromo()">Valider</button>
                    </div>
                    <div class="paiement--code_promo--message"></div>
                </div>
                <div class="paiement--button">
                    <button v-on:click="openPaiement()">Paiement</button>
                </div>
            </div>
        </div>
        <div class="container_panier--all_panier">
            <div v-for="panier in produit_panier" :key="panier" class="panier">
                <div class="panier--fav">
                    <i v-on:click="addFav(panier[9])" class="uil uil-favorite" v-if="!this.fav_list.includes(panier[9])"></i>
                    <i v-on:click="deleteFav(panier[9])" class="uis uis-star" v-if="this.fav_list.includes(panier[9])"></i>
                </div>
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
                    <div class="panier--infos--size">
                        <div class="panier--infos--size--modif">
                            <div class="panier--infos--size--modif--actuel">{{ panier[11] }}</div>
                            <div class="panier--infos--size--modif--choix" v-for="taille in panier[7]" :key="taille">
                                <span v-if="taille[0] != panier[11] && taille[1] > 0" v-on:click="modifSize(panier[12], panier[9], taille[0], panier[10], panier[7])">{{ taille[0] }}</span>
                            </div>
                        </div>
                        <div class="panier--infos--size--message" :id="'size_message_'+panier[12]"></div>
                        <div ></div>
                    </div>
                    <div class="panier--infos--quantite">
                        <div v-on:click="lessNombre(panier[12])" class="panier--infos--quantite--less">-</div>
                        <div class="panier--infos--quantite--nombre">{{ panier[10] }}</div>
                        <div v-on:click="moreNombre(panier[12])" class="panier--infos--quantite--less">+</div>
                        <div class="panier--infos--quantite--message" :id="'quantite_message_'+panier[12]"></div>
                    </div>
                    <button v-on:click="deletePanier(panier[12])" class="panier--infos--delete">
                        Supprimer du panier
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Nav from '../components/Nav.vue'
    import Paiement from '../components/Paiement.vue'
    export default {
        name :'Panier',
        components:{
            Nav,
            Paiement
        },
        data(){
            return{
                produit_panier:[],
                user_info:'',
                fav_list:[],
                prix_panier: 0,
                code_promo: ["", 0],
                id_message_quant:0,
                id_message_size:0,
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
                                panier.data[i].size,
                                panier.data[i].id
                            )
                            this.produit_panier.push(add_to_produit_panier)
                        }
                    }
                }
                this.prixPanier()
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
            async deletePanier(id_panier){
                let delete_panier = await axios.delete('http://localhost:3000/panier/'+id_panier)
                let index_delete_panier = 0
                if(delete_panier.status==200){
                    for(let i = 0; i < this.produit_panier.length; i++){
                        if(this.produit_panier[i][12] == id_panier){
                            index_delete_panier = i
                        }
                    }
                }
                this.produit_panier.splice(index_delete_panier, 1);
                this.prixPanier()
            },
            async lessNombre(id_panier){
                let panier = await axios.get(`http://localhost:3000/panier?id=${id_panier}`)
                if(panier.data[0].nombre - 1 < 1){
                    this.messageQuant(id_panier,"Vous ne pouvez pas descendre en dessous de 1 article =p","red")
                }
                else{
                    let result = await axios.put('http://localhost:3000/panier/'+id_panier,{
                        id_user: panier.data[0].id_user,
                        id_produit: panier.data[0].id_produit,
                        size: panier.data[0].size,
                        nombre: panier.data[0].nombre - 1
                    });
                    if(result.status==200){
                        for(let i = 0; i < this.produit_panier.length; i++){
                            if(this.produit_panier[i][12] == id_panier){
                                this.produit_panier[i][10] = this.produit_panier[i][10] - 1
                            }
                        }
                        this.messageQuant(id_panier,"Modifications enregistrées =)","green")
                        this.prixPanier()
                    }
                }
                
            },
            async moreNombre(id_panier){
                let panier = await axios.get(`http://localhost:3000/panier?id=${id_panier}`)
                for(let i = 0; i < this.produit_panier.length; i++){
                    if(this.produit_panier[i][12] == id_panier){
                        for(let j = 0; j < this.produit_panier[i][7].length; j++){
                            if(this.produit_panier[i][7][j][0] == panier.data[0].size){
                                if(panier.data[0].nombre + 1 > this.produit_panier[i][7][j][1]){
                                    this.messageQuant(id_panier,"Il n'y a pas assez d'articles =(","red")
                                }
                                else{
                                    let result = await axios.put('http://localhost:3000/panier/'+id_panier,{
                                        id_user: panier.data[0].id_user,
                                        id_produit: panier.data[0].id_produit,
                                        size: panier.data[0].size,
                                        nombre: panier.data[0].nombre + 1
                                    });
                                    if(result.status==200){
                                        for(let i = 0; i < this.produit_panier.length; i++){
                                            if(this.produit_panier[i][12] == id_panier){
                                                this.produit_panier[i][10] = this.produit_panier[i][10] + 1
                                            }
                                        }
                                        this.messageQuant(id_panier,"Modifications enregistrées =)","green")
                                        this.prixPanier()
                                    }
                                }
                            }
                        }
                    }
                }
            },
            async modifSize(id_panier, id_produit, taille, nombre, all_taille){
                let already_panier = ""
                for(let i = 0; i < this.produit_panier.length; i++){
                    if(this.produit_panier[i][9] == id_produit && this.produit_panier[i][11] == taille){
                        already_panier = "oui"
                        break
                    }
                    else{
                        already_panier = "non"
                    }
                }
                if(already_panier == "oui"){ 
                    this.messageSize(id_panier,"Cet article dans cette taille est déjà dans votre panier =v","red")
                }
                else{
                    let new_nombre = 0
                    for(let i = 0; i < all_taille.length; i++){
                        if(all_taille[i][0] == taille){
                            if(all_taille[i][1] >= nombre){
                                new_nombre = nombre
                                this.messageSize(id_panier,"modifications enregistrées =)","green")
                            }
                            else{
                                new_nombre = all_taille[i][1]
                                this.messageSize(id_panier, "Il y'avait pas assez de produits disponibles alors la quantité a été réduite =s","orange")
                            }
                        }
                    }
                    let modif_panier = await axios.put('http://localhost:3000/panier/'+id_panier,{
                        id_user: this.user_info.id,
                        id_produit: id_produit,
                        size: taille,
                        nombre: new_nombre
                    });
                    if(modif_panier.status==200){
                        for(let i = 0; i < this.produit_panier.length; i++){
                            if(this.produit_panier[i][12] == id_panier){
                                this.produit_panier[i][11] = taille
                                this.produit_panier[i][10] = new_nombre
                            }
                        }
                        this.prixPanier()
                    }
                }
            },
            async confirmCodePromo(){
                let code_promo = await axios.get('http://localhost:3000/code_promo')
                for(let i = 0; i < code_promo.data.length; i++){
                    var ladate = new Date()
                    var date = ladate.getFullYear()
                    if(ladate.getMonth()+1 < 10){
                        date = date +"-0"+(ladate.getMonth()+1)
                    }
                    else{
                        date = date +"-"+(ladate.getMonth()+1)
                    }
                    if(ladate.getDate()+1 < 10){
                        date = date +"-0"+ladate.getDate()
                    }
                    else{
                        date = date +"-"+ladate.getDate()
                    }
                    if(this.code_promo[0] == "anniversaire" && date == this.user_info.date_naissance){
                        this.code_promo[1] = 25
                        this.messagePromo("Code promo activé, bon anniversaire =)", "green")
                        return
                    }
                    else if(this.code_promo[0] == code_promo.data[i].code && this.code_promo[0] != "anniversaire"){
                        this.code_promo[1] = code_promo.data[i].promo
                        this.messagePromo("Code promo activé =)", "green")
                        return
                    }
                    else{
                        this.code_promo[1] = 0
                        this.messagePromo("Ce code promo n'existe pas ou n'est pas disponible =(", "red")
                    }
                }
            },
            messagePromo(message, color){
                this.clearMessage()
                document.querySelector(".paiement--code_promo--message").innerHTML = message
                document.querySelector(".paiement--code_promo--message").style.color = color
                document.querySelector(".paiement--code_promo--message").style.display = "block"
            },
            messageSize(id_panier, message, color){
                this.clearMessage()
                document.querySelector("#size_message_"+id_panier).innerHTML = message
                document.querySelector("#size_message_"+id_panier).style.color = color
                document.querySelector("#size_message_"+id_panier).style.display = "block"
                this.id_message_size = id_panier
            },
            messageQuant(id_panier, message, color){
                this.clearMessage()
                document.querySelector("#quantite_message_"+id_panier).innerHTML = message
                document.querySelector("#quantite_message_"+id_panier).style.color = color
                document.querySelector("#quantite_message_"+id_panier).style.display = "block"
                this.id_message_quant = id_panier
            },
            clearMessage(){
                document.querySelector(".panier--infos--size--message").style.display = "none"
                document.querySelector(".paiement--code_promo--message").style.display = "none"
                if(this.id_message_quant != 0){
                    document.querySelector("#quantite_message_"+this.id_message_quant).style.display = "none"
                }
                if(this.id_message_size != 0){
                    document.querySelector("#size_message_"+this.id_message_size).style.display = "none"
                }
            },
            prixPanier(){
                this.prix_panier = 0;
                for(let i = 0; i < this.produit_panier.length; i++){
                    this.prix_panier = this.prix_panier + (this.produit_panier[i][5] * (1 - this.produit_panier[i][6]/100)) * this.produit_panier[i][10]
                }
                this.prix_panier = this.prix_panier.toFixed(2)
            },
            openPaiement(){
                document.querySelector('#container_paiement').style.display = "flex";
                document.querySelector('body').style.overflow = "hidden"
            }
        },
        mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user-info'));
            if(!this.user_info){
                this.$router.push({name:'Login'})
            }
            this.loadData()
            this.favList()
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
                h1{
                    text-transform: uppercase;
                    font-weight: 700;
                    font-size: 18px;
                }
                hr{
                    margin: 25px 0;
                }
                &--prix{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 25px;
                    span:first-child{
                        font-weight: 700;
                    }
                    &--promo{
                        display: flex;
                        &--main_color{
                            margin-left: 10px;
                            font-weight: 700;
                            color:var(--main-color);
                        }
                    }
                }
                &--code_promo{
                    margin-bottom: 25px;
                    &--input_button{
                        display: flex;
                        margin-top: 10px;
                        input{
                            width: 100%;
                            margin-right: 10px;
                            transition: ease-in-out 0.3s;
                            border: 1px solid var(--light_dark);
                            background: var(--dark);
                            padding:20px;
                            color:white;
                            &:focus{
                                border: 1px solid var(--main-color);
                            }
                        }
                        button{
                            transition: ease-in-out 0.3s;
                            border: 1px solid var(--main-color);
                            background: var(--dark);
                            color:white;
                            padding:0 25px;
                            &:hover{
                                background: var(--main-color);
                            }
                        }
                    }
                    &--message{
                        margin-top: 10px;
                        display: none;
                    }
                }
                &--button{
                    button{
                        transition: ease-in-out 0.3s;
                        border: 1px solid var(--main-color);
                        background: var(--dark);
                        padding:20px;
                        color:white;
                        width: 100%;
                        &:hover{
                            background: var(--main-color);
                        }
                    }
                }
            }
        }
        &--all_panier{
            order: 1;
            margin-right: 50px;
            .panier{
                position: relative;
                display: flex;
                margin-bottom: 100px;
                &--fav{
                    position:absolute;
                    top:7.5px;
                    left:320px;
                    z-index: 2;
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
                &--link{
                    position:relative;
                    &--image{
                        width:350px;
                        transition: ease-in-out 0.3s;
                        object-fit: cover;
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
                        &--modif{
                            font-size: 10px;
                            display: flex;
                            &--actuel,
                            &--choix span{
                                width:35px;
                                height:35px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                border:solid 1px var(--light_dark);
                            }
                            &--actuel{
                                margin-right: 25px;
                            }
                            &--choix{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                span{
                                    border-right-width: 0;
                                    transition: ease-in-out 0.3s;
                                    cursor: pointer;
                                    &:last-child{
                                        border-right-width: 1px;
                                    }
                                    &:hover{
                                        background: var(--main-color);
                                    }
                                }
                            }
                        }
                        &--message{
                            margin-top: 10px;
                            font-size: 14px;
                            display: none;
                        }
                    }
                    &--quantite{
                        margin: 25px 0;
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
                        &--message{
                            margin-left: 15px;
                            font-size:14px;
                        }
                    }
                    &--delete{
                        background: var(--dark);
                        color:#fff ;
                        font-size: 16px;
                        padding:20px 25px;
                        border: solid 1px var(--main-color);
                        transition: ease-in-out 0.3s;
                        &:hover{
                            background: var(--main-color);
                            
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