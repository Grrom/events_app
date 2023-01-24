<template>
  <div class="add-event">
    <h1>Add event</h1>
    <div class="container">
      <input  id="name" type="text" placeholder="name">
      <input id="date" type="date" placeholder="date" :min="today">
      <input id="time" type="time" placeholder="time" max="20:00">
    </div>
    <div class="add-button" v-on:click="addEvent()">
      <span class="add-text">Add Event</span>
      <img alt="add-icon" class="add-icon" src="@/assets/add.svg" width="24" height="24"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import AlertHelper from '@/helpers/AlertHelper';
import ApiHelper from '@/helpers/ApiHelper';
import router from '@/router';

let today = new Date().toISOString().split('T')[0];

function addEvent(){
  let name = (document.getElementById("name") as HTMLInputElement)?.value;
  let date = (document.getElementById("date") as HTMLInputElement)?.value;
  let time = (document.getElementById("time") as HTMLInputElement)?.value;
  console.log(time)

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
  text-align: center;
  align-items: center;
}

input{
  margin: 8px;
  padding: 8px;
  display: block;
  width: 100%;
}

.add-button{
  margin: 24px;
  display: flex;
  justify-content: center;
  background-color: green;
  padding: 12px;
  border-radius: 12px;
}

.add-text{
  color: white;
  font-weight: bold;
}

.add-button:hover{
  transition: 100ms;
  transform: scale(1.02);
}

.add-button:active {
  transform: scale(0.9);
  box-shadow: 0 0 0 0 #fff;
}

.add-icon{
  margin:0  16px ;
  display: block;
  filter: invert(96%) sepia(6%) saturate(241%) hue-rotate(227deg) brightness(117%) contrast(100%);
}


</style>
