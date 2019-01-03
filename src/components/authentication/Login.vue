<template>
    <div class="login container">
        <form class="card-panel" @submit.prevent="login">
            <h3 class="center">Login</h3>
            <div class="field">
                <label for="email">Email ID * : </label>
                <input type="email" name="email" id="email" v-model="email">
                <label for="password">Password * : </label>
                <input type="password" name="password" id="password" v-model="password">
                <p class="red-text center" v-if="errorMessage">{{errorMessage}}</p>
                <div class="field center">
                    <button class="btn">Login</button>
                </div>

            </div>
        </form>
    </div>
    
</template>

<script>
import firebase from 'firebase'
export default {
    name:'Login',
    data(){
        return{
            email:null,
            password:null,
            errorMessage:null
        }
    },
    methods:{
        login(){
            if(this.email&&this.password){
                this.errorMessage=null
                firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(cred=>{
                    this.$router.push({name:'Home'})
                }).catch(err=>{
                    this.errorMessage=err.message
                })
            }
            else{
                this.errorMessage='Please fill in all the fields .'
            }
        }
    }
}
</script>

<style scoped>
    .login{
        max-width: 600px;
    }

</style>
