<template>
  <div class="item">
    <div class="details">
      <div class="name">Name: {{ props.item!.name }}</div>
      <div class="date">Date: {{ props.item!.date }}</div>
      <div class="time">Time: {{ props.item!.time }}</div>
    </div>
    <ActionButton :color="ActionButtonColor.brown" icon="/src/assets/update.svg" :run-action="updateEvent"/>
    <ActionButton :color="ActionButtonColor.red" icon="/src/assets/delete.svg" :run-action="deleteEvent"/>
  </div>
</template>

<script setup lang="ts">
import AlertHelper from "@/helpers/AlertHelper";
import ApiHelper from "@/helpers/ApiHelper";
import EventModel from "@/types/EventModel";
import ActionButtonColor from "@/types/ActionButtonColor";
import ActionButton from '../components/ActionButton.vue'

const emit = defineEmits(['delete'])

const props = defineProps({
  item: EventModel
})

function deleteEvent() {
  AlertHelper.confirmDialog({question:"Are you sure you want to delete this event?"}).then(confirmed=>{
    if(confirmed){
      let deleting = AlertHelper.showLoading("Deleting Event.")
      ApiHelper.deleteEvent(props.item!.id).then(success=>{
        if(success){
          AlertHelper.successToast("Event deleted successfully.")
          emit("delete", props.item!.id)
        }else{
          AlertHelper.successToast("Failed to delete event.")
        }
        deleting.close()
      }).catch(e=>{
          AlertHelper.successToast("Failed to delete event.")
          deleting.close()
      })
    }
  })
}

function updateEvent() {
  AlertHelper.updateEventAlert({question:"Update Event",defaultName:props.item!.name, defaultDate:props.item!.date,defaultTime:props.item!.time,  onConfirm:(value)=>{

    if(value!==undefined){
      let time = value.time;
      let now = new Date();
      var hourNow = now.getHours();
      var minNow = now.getMinutes();

      if(value.date === new Date().toISOString().split('T')[0]){
        if(Number(time.split(":")[0])<hourNow || (Number(time.split(":")[0])===hourNow && Number(time.split(":")[1])<minNow)){
          AlertHelper.errorToast("Cannot select time that is already past the current time.")
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

      if(value.name === props.item!.name && value.date === props.item!.date&& value.time === props.item!.time){
        AlertHelper.infoToast("Please change atleast one value.")
        return;
      }
      let loading=  AlertHelper.showLoading("Updating Event.")
      ApiHelper.updateEvent(props.item!.id, value.name, value.date, value.time).then(success=>{
        if(success){
          props.item!.name=value.name;
          AlertHelper.successToast("Event Updated")
        }
        loading.close()
      }).catch(e=>{
        AlertHelper.successToast("Failed to update the event.")
        loading.close()
      })
    }
  }})
}

</script>

<style scoped>

.item{
  align-items: center;
  margin: 4px;
  padding: 12px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 1px 1px #dadada;
  display: flex;
  min-width: 200px;
  max-width: 300px;
}

.details{
  flex: 1;
}

.name{
  font-weight: bold;
}
</style>
