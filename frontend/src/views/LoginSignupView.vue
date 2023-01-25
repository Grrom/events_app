<template>
  <div class="login-signup">
    <div class="logo-container">
        <img alt="App logo" class="logo" src="@/assets/events_icon.png" width="250" height="250" />
        <h1 class="title">Events App</h1>
    </div>

    <div class="form">
        <label for="email">Email</label>
        <input name="email" id="email-input" type="email">
        <label for="password">Password</label>
        <input name="password" id="password-input" type="password">
        <ActionButton :color="ActionButtonColor.green" icon="/src/assets/login.svg" :run-action="login">
            <div class="button-text">Login</div>
        </ActionButton>
            
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButtonColor from "@/types/ActionButtonColor";
import ActionButton from '@/components/ActionButton.vue';
import { useUserStore } from "@/stores/user";
import AlertHelper from "@/helpers/AlertHelper";

let userStore = useUserStore()

function login(){
    let email = (document.getElementById("email-input")as HTMLInputElement).value.trim();
    let password= (document.getElementById("password-input")as HTMLInputElement).value.trim();

    if(email.length===0){
        AlertHelper.errorToast("Please input your email")
        return;
    }
    if(password.length===0){
        AlertHelper.errorToast("Please input your password")
        return;
    }
    userStore.login(email, password)
}
</script>

<style scoped>

.login-signup{
    height: 100vh;
    justify-content: center;
    align-items: center;
    display: flex;
}

@media (max-width: 600px) {
    .login-signup{
        flex-direction: column;
    }
}

.logo-container{
    text-align: center;

}

.logo {
  display: block;
  border-radius: 24px;
  background-color: #4cd4ca;
}

.form{
    margin: 16px;
    display: flex;
    flex-direction: column;
}

input{
    padding: 8px;
    width: 300px;
}

#password-input{
    margin-bottom: 16px;
}

.button-text{
    font-weight: bold;
    color: white;
}
</style>