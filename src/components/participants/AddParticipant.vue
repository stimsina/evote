<template>
    <div class="participant container">
        <form class="card-panel" @submit.prevent="addParticipant">
            <h3 class="center">Add a new Participant</h3>
            <div class="fields">
                <label for="firstName">First Name * : </label>
                <input type="text" name="firstName" id="firstName" v-model="participantObj.firstName">
                <label for="lastName">Last Name * : </label>
                <input type="text" name="lastName" id="lastName" v-model="participantObj.lastName">
                <label for="age">Age : </label>
                <input type="number" id="number" name="number" v-model="participantObj.age">
                <label for="description">Description</label>
                <textarea name="description" id="description" cols="40" rows="5" v-model="participantObj.description"></textarea>
                <label for="profileIcon">Profile Picture : </label>
                <input type="file" id="profileIcon" @change="readUploadedFile">
                <p class="red-text" v-if="errorMessage">{{errorMessage}}</p>
                <div class="field center">
                    <button class="btn">Save</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from '@/axios/init'
export default {
    name:'AddParticipant',
    data(){
        return{
            participantObj:{
                firstName:null,
                lastName:null,
                age:null,
                description:null,
                profileIcon:null
                
            },
            errorMessage:null
        }
    },
    methods:{
        readUploadedFile(uploadEvent){
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(uploadEvent.target.files[0]);
            fileReader.onload =()=> {
                this.participantObj.profileIcon=fileReader.result
              }
    
        },
        addParticipant(){
            axios.post('/participants',this.participantObj).then(response=>{
                this.$router.push({name:'Home'})
            }).catch(err=>{
                console.log(err)
            })
        }
    }

}
</script>

<style scoped>
.participant{
    margin-top: 20px;
    max-width: 800px;
}

</style>
