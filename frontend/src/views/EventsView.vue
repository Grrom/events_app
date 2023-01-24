<template>
  <div class="events">
    <div v-if="events===undefined" class="loading-container">
      <img src="@/assets/loading.gif" alt="">
    </div>

    <div v-else-if="events!.length===0" class="loading-container">
      no events
    </div>

    <div class="events-container" v-if="(events?.length??0)>0" >
      <EventItem v-for="(item, index) in events" :item="item" @delete="deleteEvent"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import ApiHelper from '@/helpers/ApiHelper';
import type EventModel from '@/types/EventModel';
import { onMounted, ref } from 'vue';
import EventItem from '../components/EventItem.vue'


const events = ref<Array<EventModel>>();
onMounted(async () => {
  getEvents()
})
async function  getEvents(){
  let response = await ApiHelper.getEvents()
  events.value=[];
  response.forEach(element => {
    events.value!.push(element)
  });
}

function deleteEvent(id:string){
  let toRemoveIndex = undefined
  for(let i = 0; i < events.value!.length; i++  ){
    if(events.value![i].id === id){
      toRemoveIndex =i 
      break
    }
  }

  if(toRemoveIndex!==undefined){
    events.value!.splice(toRemoveIndex, 1)
  }
}
</script>

<style>
.events-container{
  justify-content: center;
  display: flex;
  flex-direction: column;

  max-height: 100vh;
  overflow: auto;
}
.loading-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
