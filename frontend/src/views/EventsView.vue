
<script setup lang="ts">
import EventItem from '../components/EventItem.vue'
let events = [1,2,3,4,5]
</script>

<template>
  <div class="events">
    <div v-for="(item, index) in events">
      <EventItem/>
    </div>
  </div>
</template>

<style>
</style>
