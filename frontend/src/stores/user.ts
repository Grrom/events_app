import { defineStore } from "pinia";
import type { User, UserCredential } from "firebase/auth";
import { authenticationHelper } from "@/main";
import AlertHelper from "@/helpers/AlertHelper";
import Helpers from "@/helpers/Helpers";
import router from "@/router";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: null as User | undefined | null,
      needsRefresh: true,
    };
  },
  actions: {
    setUser(user: User | undefined | null) {
      this.user = user;
    },
    login(loginEmail: string, loginPassword: string) {
      let loggingIn = AlertHelper.showLoading("Logging in...");

      authenticationHelper
        .login(loginEmail.trim(), loginPassword.trim())
        .then((auth) => {
          if (!auth.user.emailVerified) {
            authenticationHelper.promptEmailVerification(auth, loginEmail);
          } else {
            this.user = auth.user;
            router.push("/");
          }
          loggingIn.close();
        })
        .catch((e) => {
          AlertHelper.errorToast(Helpers.getFirebaseError(e));
        });
    },
    signup(email: string, password: string) {
      let signingUp = AlertHelper.showLoading("Signing up in...");

      authenticationHelper
        .signup(email.trim(), password.trim())
        .then((auth) => {
          if (!auth.user.emailVerified) {
            authenticationHelper.promptEmailVerification(auth, email);
          } else {
            this.user = auth.user;
            router.push("/");
          }
          signingUp.close();
        })
        .catch((e) => {
          AlertHelper.errorToast(Helpers.getFirebaseError(e));
        });
    },
  },
  getters: {
    isLoggedIn: (state) => state.user !== undefined,
    isCheckingLogin: (state) => state.user === null,
  },
});
