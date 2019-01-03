<template>
    <div class="userDetails container" v-if="currentUser">
        <form class="card-panel" @submit.prevent="updateUserDetails">
            <h3 class="center">User Details</h3>
            <label for="email">Email * : </label>
            <input type="email" name="email" id="email" disabled v-model="currentUser.email">
            <label for="firstName">First Name * : </label>
            <input type="text" name="firstName" id="firstName" v-model="currentUser.firstName" disabled>
            <label for="lastName">Last Name * : </label>
            <input type="text" name="lastName" id="lastName" v-model="currentUser.lastName" disabled>   
            <label for="password">Password * : </label>
            <input type="password" name="password" id="password" v-model="newPassword" placeholder="change password here">
            <p class="red-text center" v-if="errorMessage">{{errorMessage}}</p>
            <div class="center">
                <button class="btn">Update</button>
            </div>
         </form>

    </div>
</template>

<script>
import database from '@/firebase/init'
import firebase from 'firebase'
export default {
    name:'UserDetail',
    data(){
        return{
            currentUser:null,
            newPassword:null,
            errorMessage:null,
        }
    },
    methods:{
        updateUserDetails(){
            if(this.newPassword){
                firebase.auth().currentUser.updatePassword(this.newPassword).then(()=>{
                this.errorMessage=null
                this.$router.push({name:'Home'})
            }).catch(err=>{
                this.errorMessage=err.message
            })
            }
            else{
                this.errorMessage='Please Type in a new password .'
            }
        }
    },
    created(){
        let ref=database.collection('users').where("userID","==",this.$route.params.id).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.currentUser=doc.data()
            })
        })
    }
}
</script>

<style scoped>
    .userDetails{
        max-width: 800px;
    }
</style>
