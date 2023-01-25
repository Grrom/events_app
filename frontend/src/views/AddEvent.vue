<template>
  <div class="add-event">
    <h1>Add event</h1>
    <div class="container">
      <input  id="name" type="text" placeholder="name">
      <input id="date" type="date" placeholder="date" :min="today">
      <input id="time" type="time" placeholder="time" max="20:00">
    </div>
    <ActionButton :color="ActionButtonColor.green" icon="/src/assets/add.svg" :run-action="addEvent">
      <span class="add-text">Add Event</span>
    </ActionButton>
  </div>
</template>

<script setup lang="ts">
import AlertHelper from '@/helpers/AlertHelper';
import ApiHelper from '@/helpers/ApiHelper';
import router from '@/router';
import ActionButtonColor from "@/types/ActionButtonColor";
import ActionButton from '../components/ActionButton.vue'
import { useEventsStore } from '@/stores/events';

let eventsStore = useEventsStore()
let today = new Date().toISOString().split('T')[0];

function addEvent(){
  let name = (document.getElementById("name") as HTMLInputElement)?.value;
  let date = (document.getElementById("date") as HTMLInputElement)?.value;
  let time = (document.getElementById("time") as HTMLInputElement)?.value;

  for(let i = 0; i<(eventsStore.events!==undefined?eventsStore.events!.length:0); i++){
    if(eventsStore.getByIndex(i)?.date === date && eventsStore.getByIndex(i)?.time == time){
      AlertHelper.errorToast("Sorry that date and time is already taken, please choose another date or time.")
      return
    }
  }

  if(Number(time.split(":")[0])>=19&&Number(time.split(":")[1])!==0){
    AlertHelper.errorToast("Time must not be past 8 PM.")
    return
  }

  if(Number(time.split(":")[0])<8&&Number(time.split(":")[1])!==0){
    AlertHelper.errorToast("Time must past 8 AM.")
    return
  }

  if(name === ""){
    AlertHelper.errorToast("Please Input the event name.")
    return
  }
  if(date === ""){
    AlertHelper.errorToast("Input the event date")
    return
  }
  if(time === ""){
    AlertHelper.errorToast("Please Input the event time.")
    return
  }

  let adding =AlertHelper.showLoading("Adding Event.");

  ApiHelper.createEvent(name, date, time).then((value=>{
    AlertHelper.successToast("Event successfully added.")
    router.push('/')
    adding.close()
  })).catch((e)=>{
    AlertHelper.errorToast("Failed to add Event.")
    adding.close()
  })
}
</script>

<style>
.add-event{
  padding: 16px;
  text-align: center;
  align-items: center;
}

input{
  width: 98%;
  margin: 8px;
  padding: 8px;
  display: block;
}

.add-text{
  color: white;
  font-weight: bold;
}
</style>
