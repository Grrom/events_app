
<template>
  <div v-if="userStore.isLoggedIn">
    <header>
      <img alt="App logo" class="logo" src="@/assets/events_icon.png" width="250" height="250" />

      <div class="wrapper">
        <HelloWorld msg="Hello There!" />

        <nav>
          <RouterLink to="/">Events</RouterLink>
          <RouterLink to="/addEvent">Add Event</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
  <div v-else-if="!userStore.isLoggedIn">
    <LoginSignupView/>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import LoginSignupView from './views/LoginSignupView.vue';

let userStore = useUserStore();

</script>

<style scoped>

.logo {
  display: block;
  margin: 0 auto 2rem;
  border-radius: 24px;
  background-color: #4cd4ca;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

header {
  margin: 32px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
