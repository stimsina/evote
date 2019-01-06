<template>
    <div class="navbar">
        <nav class="blue darken-2">
            <div class="container">
                <router-link :to="{name:'Home'}" exact v-if="currentUser">Dashboard</router-link>
                <ul class="right">
                    <li><router-link :to="{name:'Signup'}" exact v-if="!currentUser">Join Now</router-link></li>
                    <li><router-link :to="{name:'Login'}" exact v-if="!currentUser">Log In</router-link></li>
                    <li><a @click.prevent="signout" v-if="currentUser">Sign Out</a></li>
                    <li><router-link :to="{name:'UserDetail',params:{id:this.currentUser.uid}}" v-if="currentUser">{{currentUser.email}}</router-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name:'Navbar',
    data(){
        return{
            currentUser:null,
        }
    },
    methods:{
        signout(){
            firebase.auth().signOut().then(()=>{
                this.$router.push({name:'Login'})
            })
        }
    },
    created(){
        firebase.auth().onAuthStateChanged(user=>{
            this.currentUser=user
        })
    },
    computed:{
        
    }
}
</script>

<style scoped>

.router-link-active{
    background: #eee;
    color: #444;
}

</style>