import Home from './Page/Home.vue'
import Produits from './Page/Produits.vue'
import Panier from './Page/Panier.vue'
import Commandes from './Page/Commandes.vue'
import Login from './Page/Login.vue'
import Signup from './Page/SignUp.vue'
import UserInfos from './Page/UserInfos.vue'
import InfosProduit from './Page/InfosProduit.vue'
import UpdateProduit from './Page/UpdateProduit.vue'
import Favoris from './Page/Favoris.vue'
import PageAdmin from './Page/PageAdmin.vue'

import {createRouter, createWebHashHistory} from 'vue-router'

const routes=[
    {name:'Home', component:Home, path:'/'},
    {name:'Produits', component:Produits, path:'/produits'},
    {name:'Favoris', component:Favoris, path:'/favoris'},
    {name:'Panier', component:Panier, path:'/panier'},
    {name:'Commandes', component:Commandes, path:'/commandes'},
    {name:'Login', component:Login, path:'/login'},
    {name:'Signup', component:Signup, path:'/signup'},
    {name:'PageAdmin', component:PageAdmin, path:'/page-admin'},
    {name:'UserInfos', component:UserInfos, path:'/user-infos/:id'},
    {name:'InfosProduit', component:InfosProduit, path:'/infos-produit/:id'},
    {name:'UpdateProduit', component:UpdateProduit,  path:'/update-produit/:id'}
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router
