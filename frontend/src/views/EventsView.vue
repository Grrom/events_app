<template>
  <div class="events">
    <div v-if="eventsStore.events===undefined" class="loading-container">
      <img src="@/assets/loading.gif" alt="">
    </div>

    <div v-else-if="eventsStore.events!.length===0" class="loading-container">
      there are no events right now.
    </div>

    <div class="events-container" v-if="(eventsStore.events?.length??0)>0" >
      <EventItem v-for="(item, _) in eventsStore.events" :item="item" @delete="deleteEvent" :id="_"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import ApiHelper from '@/helpers/ApiHelper';
import { useEventsStore } from '@/stores/events';
import { onMounted, ref } from 'vue';
import EventItem from '../components/EventItem.vue'


const eventsStore = useEventsStore();
onMounted(async () => {
  getEvents()
})
async function  getEvents(){
  let response = await ApiHelper.getEvents()
  eventsStore.setEvents(response);
}

function deleteEvent(id:string){
  let toRemoveIndex = undefined
  for(let i = 0; i < eventsStore.events!.length; i++  ){
    if(eventsStore.events![i].id === id){
      toRemoveIndex =i 
      break
    }
  }

  if(toRemoveIndex!==undefined){
    eventsStore.events!.splice(toRemoveIndex, 1)
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
