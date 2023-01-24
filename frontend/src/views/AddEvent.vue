<template>
  <div class="about">
    <h1 v-on:click="add()">Add event</h1>
  </div>
</template>

<script setup lang="ts">
import ApiHelper from '@/helpers/ApiHelper';

function add(){
  ApiHelper.createEvent("heeh", "ff")
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
