<template>
  <div class="home container">
    <i class="material-icons green darken-2  newParticipant" @click.prevent="goToAddParticipants">add</i>
    <div class="home participant container " v-for="(participant,index) in participantsList" :key='index'>
      <div class="card-panel">
        <h6>{{participant.firstName}}  {{participant.lastName}}</h6>
        {{participant.age}}
        <textarea v-model="participant.description" disabled></textarea>
        <button class="btn">Vote</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios/init'
export default {
  name: 'Home',
  data () {
    return {
      participantsList:null,
    }
  },
  methods:{
    goToAddParticipants(){
      this.$router.push({name:'AddParticipant'})
    }
  },
  created(){
    axios.get('/participants').then(resposne=>{
      this.participantsList=resposne.data
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.newParticipant{
  margin-left: 50px;
  margin-top: 15px;
  cursor: pointer;
}
</style>
