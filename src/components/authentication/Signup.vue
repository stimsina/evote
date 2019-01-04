<template>
    <div class="signup container">
        <form class="card-panel" @submit.prevent="createNewUser">
            <h3 class="center">New User Signup</h3>
            <div class="field">
                <label for="firstName">First Name * : </label>
                <input type="text" name="firstName" id="firstName" v-model="userObj.firstName">
                <label for="lastName">Last Name * :</label>
                <input type="text" name="lastName" id="lastName" v-model="userObj.lastName">
                <label for="email">Email Address * : </label>
                <input type="email" name="email" id="email" v-model="userObj.userName">
                <p class="red-text center" v-if="errorMessage">{{errorMessage}}</p>
                <div class="field center">
                    <button class="btn">Join</button>
                </div>   
            </div>
        </form>
    </div>
</template>

<script>
import database from '@/firebase/init'
import firebase from 'firebase'
import axios from '@/axios/init'
export default {
    name:'Signup',
    data(){
        return{
            userObj:{
                firstName:null,
                lastName:null,
                userName:null,
                password:null
            },
            errorMessage:null

        }
    },
    methods:{
        createNewUser(){
            if(this.userObj.firstName&&this.userObj.lastName&&this.userObj.userName){
                let ref=database.collection('users').doc(this.userObj.userName)
                ref.get().then(doc=>{
                if(!doc.exists){
                    firebase.auth().createUserWithEmailAndPassword(this.userObj.userName,this.userObj.password).then(cred=>{
                        ref.set({
                            firstName:this.userObj.firstName,
                            lastName:this.userObj.lastName,
                            userID:cred.user.uid,
                            email:this.userObj.userName,
                            password:this.userObj.password
                        }).then(()=>{
                            axios.post("/users",this.userObj).then(response=>{
                                console.log(response)
                                this.$router.push({name:'Home'})
                            })
                            
                        })
                        .catch(err=>{
                            this.errorMessage=err
                        })
                    })
                }
            })

            }
            else{
                this.errorMessage='Please fill in all fields .'
            }

        }
    },
    created(){
     let length = 8,
     charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
     retVal = "";
     for (let i = 0, n = charset.length; i < length; ++i) {

        retVal += charset.charAt(Math.floor(Math.random() * n));

        }
    this.userObj.password=retVal;    
    }
}
</script>


<style scoped>
    .signup{
        max-width: 600px;
    }
</style>