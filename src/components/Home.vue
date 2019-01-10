<template>
<div>
  <i class="material-icons green darken-2  newParticipant" @click.prevent="goToAddParticipants">add</i>
  <i v-if="remainingVotes>=0" class="right yellow darken-2 remainingText">{{remainingVotes}} <span class="white"> votes remaining</span></i>
  <div class="home container">
    <div class="home card participant container " v-for="(participant,index) in participantsList" :key='index'>
      <div class="card-content">
        <span style="width:25px;">{{participant.firstName}}  {{participant.lastName}}</span>
        {{participant.age}}
        <textarea v-model="participant.description" disabled></textarea>
        <button class="btn" @click.prevent="castVote(participantToVote)" v-if="remainingVotes>0">Vote</button> 
      </div>
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
      currentUser:null,
      remainingVotes:5
    }
  },
  methods:{
    goToAddParticipants(){
      this.$router.push({name:'AddParticipant'})
    },
    castVote(){
      this.remainingVotes-=1
      axios.post('/participants',{
        params:{
          participantToVote:participantToVote,
          currentUser:currentUser,
        }
      }).then(response=>{
        this.fetchVoteCoutnForUser()
      })
    },
    fetchParticipants(){
      axios.get('/participants').then(resposne=>{
      this.participantsList=resposne.data
    }).catch(err=>{
      console.log(err)
    })
    },
    fetchVoteCoutnForUser(){
      axios.get('/users/vote').then(response=>{
        this.remainingVotes=response.data
      })
    }
  },
  created(){

  },
  mounted(){
    this.fetchParticipants()
  },
  watch:{

  },
  computed:{

  }
}
</script>

<style scoped>
.newParticipant{
  margin-left: 50px;
  margin-top: 15px;
  cursor: pointer;
}

.home{
  display: grid;
  grid-template-columns: 5fr 5fr 5fr;
  grid-gap: 30px;
}

.remainingText{
  margin-right: 180px;
}
</style>
