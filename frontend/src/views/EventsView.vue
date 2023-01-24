
<script setup lang="ts">
import ApiHelper from '@/helpers/ApiHelper';
import type EventModel from '@/types/EventModel';
import { onMounted, ref } from 'vue';
import EventItem from '../components/EventItem.vue'

const events = ref<Array<EventModel>>([]);
onMounted(async () => {
  getEvents()
})
async function  getEvents(){
  let response = await ApiHelper.getEvents()
  response.forEach(element => {
    events.value.push(element)
  });
}
</script>

<template>
  <div class="events">
    <div v-show="events.length===0" class="loading-container">
      <img src="@/assets/loading.gif" alt="">
    </div>

    <div class="events-container" v-show="events.length>0" >
      <EventItem v-for="(item, index) in events" :item="item"/>
    </div>

  </div>
</template>

<style>
.events-container{
  height: 100vh;
  overflow: auto;
}
.loading-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
