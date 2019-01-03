<template>
  <div class="home">
    <i class="material-icons green darken-2  newParticipant" @click.prevent="goToAddParticipants">add</i>
    <div class="home participant container " v-for="(participant,index) in participantsList" :key='index'>
      <div class="card-panel">
        <span>{{participant.name}}</span>
        <span>{{participant.voteID}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      participantsList:[{name:'Sudhan',voteID:20},{name:'John',voteID:30}],
    }
  },
  methods:{
    goToAddParticipants(){
      this.$router.push({name:'AddParticipant'})
    }
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
