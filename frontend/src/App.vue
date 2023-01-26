
<template>
  <div v-if="userStore.isCheckingLogin" class="loading">
    <img src="@/assets/loading.gif" alt="">
  </div>

  <div v-else-if="userStore.isLoggedIn">
    <header>
      <img alt="App logo" class="logo" src="@/assets/events_icon.png" width="250" height="250" />

      <div class="wrapper">
        <HelloWorld msg="Hello There!" />

        <nav>
          <RouterLink to="/">Events</RouterLink>
          <RouterLink to="/addEvent">Add Event</RouterLink>
        </nav>

        <ActionButton :color="ActionButtonColor.red" icon="/src/assets/logout.svg" :run-action="logout">
          <div class="logout-text">Logout</div>
        </ActionButton>
      </div>
    </header>
    <RouterView />
  </div>

  <div v-else-if="!userStore.isLoggedIn">
    <LoginSignupView/>
  </div>
</template>

<script setup lang="ts">
import ActionButtonColor from "@/types/ActionButtonColor";
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import ActionButton from './components/ActionButton.vue';
import HelloWorld from './components/HelloWorld.vue'
import { authenticationHelper } from './main';
import LoginSignupView from './views/LoginSignupView.vue';
import AlertHelper from "./helpers/AlertHelper";

let userStore = useUserStore();

function logout(){
  AlertHelper.confirmDialog({question:"Are you sure you want to signout?"}).then((confirmed)=>{
    if(confirmed){
      userStore.logout()
    }
  })
}

onMounted(()=>{
  const unsubscribe = authenticationHelper.auth.onAuthStateChanged(
    async (user) => {
      if (user === null) {
        userStore.user = undefined;
      } else {
        userStore.setUser(user);
      }
      unsubscribe();
    }
  );
})

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
  margin: 2rem 0;
}
.loading{
  display: block;
  text-align: center;
  padding-top: 36px;

  margin: auto;
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

.logout-text{
  color: white;
  font-weight: bold;
  margin-right: 12px;
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
