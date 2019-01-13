import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

const store=new Vuex.Store({

    state:{
        currentUser:null

    },
    getters:{
        GET_USER:(state)=>{
            return state.currentUser
        }
    },
    mutations:{
        SET_USER:(state,user)=>{
            state.currentUser=user
        }
    },
    actions:{

    }
})

export default store