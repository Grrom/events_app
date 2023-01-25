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
        <label v-show="isSignup" for="confirm-password">Confirm Password</label>
        <input v-show="isSignup" name="confirm-password" id="confirm-password-input" type="password">
        <div class="spacer"></div>
        <ActionButton :color="ActionButtonColor.green" icon="/src/assets/login.svg" :run-action="login">
            <div v-if="isSignup" class="button-text">Signup</div>
            <div v-else class="button-text">Login</div>
        </ActionButton>
        <div class="goto" v-on:click="toggleIsSignup">{{ gotoText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButtonColor from "@/types/ActionButtonColor";
import ActionButton from '@/components/ActionButton.vue';
import { useUserStore } from "@/stores/user";
import AlertHelper from "@/helpers/AlertHelper";
import { ref, watch } from "vue";

let userStore = useUserStore()

const isSignup = ref(false)

const toLoginText = "Already have an account? Login.";
const toSignupText = "No Account yet? Signup";

let gotoText =  toSignupText;

watch(() => isSignup.value, (_, second) => {
    gotoText =  second ? toSignupText : toLoginText
});

function login(){
    let email = (document.getElementById("email-input")as HTMLInputElement).value.trim();
    let password= (document.getElementById("password-input")as HTMLInputElement).value.trim();
    let confirmPassword= (document.getElementById("confirm-password-input")as HTMLInputElement).value.trim();

    if(email.length===0){
        AlertHelper.errorToast("Please input your email")
        return;
    }
    if(password.length===0){
        AlertHelper.errorToast("Please input your password")
        return;
    }

    if(isSignup.value){
        if(confirmPassword.length===0){
            AlertHelper.errorToast("Please confirm your password")
            return;
        }

        if(confirmPassword!== password){
            AlertHelper.errorToast("Passwords don't match")
            return;
        }
        console.log("here")

        userStore.signup(email, password)

    }else{
        userStore.login(email, password)
    }
}

function toggleIsSignup(){
    isSignup.value=!isSignup.value
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
    text-align: center;
}

input{
    padding: 8px;
    width: 300px;
}

.spacer{
    margin-bottom: 16px;
}

.button-text{
    font-weight: bold;
    color: white;
}
.goto{
    margin: 12px;
    text-decoration: underline;
}

.goto:hover{
  cursor: pointer;
  transition: 100ms;
  transform: scale(1.02);
}
.goto:active{
  transform: scale(0.9);
  box-shadow: 0 0 0 0 #fff;
}
</style>