
<template>
  <div :class="actionButton" v-on:click="runAction()">
    <slot></slot>
    <img alt="action-icon" class="action-icon" :src="icon" width="24" height="24"/>
  </div>
</template>

<script setup lang="ts">
import ActionButtonColor from '@/types/ActionButtonColor';

const props = defineProps<{
  icon: string,
  runAction:()=>void, 
  color: ActionButtonColor,
}>()

function getColor(){
    if(props.color === ActionButtonColor.brown)
        return "brown-icon"
    if(props.color === ActionButtonColor.red)
        return "red-icon"
    if(props.color === ActionButtonColor.green)
        return "green-icon"
    return ""
}

let actionButton = "action-button " + getColor();
</script>

<style scoped>
.action-button{
  display: flex;
  justify-content: center;
  background-color: red;
  padding: 12px;
  border-radius: 12px;
  margin:0 4px;
}

.action-button:hover{
  transition: 100ms;
  transform: scale(1.02);
}

.action-button:active {
  transform: scale(0.9);
  box-shadow: 0 0 0 0 #fff;
}

.action-icon{
  display: block;
  filter: invert(96%) sepia(6%) saturate(241%) hue-rotate(227deg) brightness(117%) contrast(100%);
}
.green-icon{
    background-color: green;
}
.red-icon{
    background-color: red;
}
.brown-icon{
    background-color: brown;
}

</style>
