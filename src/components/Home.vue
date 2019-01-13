<template>
<div>
  <h4 class="center"><u class="blue-text">Participants List</u> </h4>
  <i class="material-icons green darken-2  newParticipant" @click.prevent="goToAddParticipants">add</i>
  <i v-if="remainingVotes>=0" class="right yellow darken-2 remainingText">{{remainingVotes}} <span class="white"> votes remaining</span></i>
  <i class="red-text right" v-if="feedbackMessage">{{feedbackMessage}}</i>
  <div class="home container">
    <div class="card" v-for="(participant,index) in participantsList" :key='index'>
      <div class="card-content">
       <span>{{participant.firstName + " "+participant.lastName}}</span><br>
       <span>{{participant.age}}</span><br>
       <span>{{participant.description}}</span><br>
       <hr>
        <button class="btn" @click.prevent="castVote(participant)" v-if="remainingVotes>0">Vote</button> 
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
      remainingVotes:10,
      feedbackMessage:null
    }
  },
  methods:{
    goToAddParticipants(){
      this.$router.push({name:'AddParticipant'})
    },
    castVote(participantToVote){
      this.remainingVotes-=1
      this.feedbackMessage=`1 upvote for ${participantToVote.firstName} ${participantToVote.lastName} .`
      axios.post('/votes',{
          participant:participantToVote,
          voteFRom:this.currentUser.email,
      }).then(response=>{
        this.feedbackMessage=null
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
      axios.get('/users/vote',{
        params:{
          currentUser:this.currentUser
        }
      }).then(response=>{
        this.remainingVotes=response.data
      }).catch(err=>{
        console.log("error while getting remaining votes ")
      })
    }
  },
  created(){
        this.currentUser=this.$store.getters.GET_USER
        fetchVoteCoutnForUser()

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
