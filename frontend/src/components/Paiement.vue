<template>
    <div id="container_paiement" class="container_paiement">
        <div class="container_paiement--paiement">
            <h1>Livraison et paiement</h1>
            <div class="container_paiement--paiement--close" v-on:click="closePaiement()"><i class="uil uil-times"></i></div>
            <div class="container_paiement--paiement--form form">
                <div class="container_paiement--paiement--form--titre">Informations de livraison</div>
                <input type="text" v-model="user_modal.adresse" placeholder="Adresse">
                <input type="text" v-model="user_modal.ville" placeholder="Ville">
                <input type="text" v-model="user_modal.code_postal" placeholder="Code postal">
                <input type="text" v-model="user_modal.pays" placeholder="Pays">

                <div style="margin-top:25px;" class="container_paiement--paiement--form--titre">Informations de paiement</div>
                <input type="text" v-model="titulaire_carte" placeholder="Titulaire de la carte">
                <input type="text" maxlength="16" v-model="numero_carte" placeholder="Numéro de la carte">
                <input type="text" maxlength="3" v-model="code_ccv" placeholder="Code CCV">
                <input type="month" v-model="date_expi" placeholder="Date d'expiration">
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name :'Paiement',
        data(){
            return{
                user_info:'',
                prix_panier:0,
                user_modal:{
                    email:'',
                    password:'',
                    prenom:'',
                    nom:'',
                    telephone:'',
                    adresse:'',
                    ville:'',
                    code_postal:'',
                    pays:'',
                    admin:''
                },
                titulaire_carte:'',
                numero_carte:'',
                code_ccv:'',
                date_expi:''
            }
        },
        props: {
            produit_panier: Array
        },
        methods:{
            closePaiement(){
                document.querySelector('#container_paiement').style.display = "none"
                document.querySelector('body').style.overflow = "auto"
                this.prixPanier()
            },
            prixPanier(){
                this.prix_panier = 0
                for(let i = 0; i < this.produit_panier.length; i++){
                    this.prix_panier = this.prix_panier + (this.produit_panier[i][5] * (1 - this.produit_panier[i][6]/100)) * this.produit_panier[i][10]
                }
                this.prix_panier = this.prix_panier.toFixed(2)
            }
        },
        async mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user-info'));
            console.log(this.user_info)
            const result = await axios.get('http://localhost:3000/users/'+this.user_info.id)
            this.user_modal=result.data
            console.log(this.user_modal)
        }
    }
    
</script>
<style lang="scss">
    .container_paiement{
        display: none;
        align-items: center;
        justify-content: center;
        position: absolute;
        top:0;
        left:0;
        z-index: 10;
        width:100%;
        height:100vh;
        background: rgba(0,0,0,0.8);
        padding: 100px;
        &--paiement{
            padding:25px;
            font-weight: 700;
            position: relative;
            width: 600px;
            height:100%;
            background: var(--very_dark);
            box-sizing:border-box;
            overflow: scroll;
            h1{
                text-align: center;
                font-size: 18px;
            }
            &--form{
                width:100% !important;
                &--titre{
                    font-weight: 700;
                    margin-bottom: 25px;
                }
            }
            &--close{
                position: absolute;
                top: 22.5px;
                right:22.5px;
                font-size: 32px;
                line-height: 1;
                cursor: pointer;
            }
        }
        .container_paiement--paiement::-webkit-scrollbar{display: none;}
    }
</style>