import { defineStore } from "pinia";
import type { UserCredential } from "firebase/auth";
import { authenticationHelper } from "@/main";
import AlertHelper from "@/helpers/AlertHelper";
import Helpers from "@/helpers/Helpers";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: undefined as UserCredential | undefined,
      needsRefresh: true,
    };
  },
  actions: {
    login(loginEmail: string, loginPassword: string) {
      let loggingIn = AlertHelper.showLoading("Loggin in...");

      authenticationHelper
        .login(loginEmail.trim(), loginPassword.trim())
        .then((auth) => {
          let loading = AlertHelper.showLoading("Logging in");
          if (!auth.user.emailVerified) {
            authenticationHelper.promptEmailVerification(loginEmail);
          } else {
            this.user = auth;
          }
          loggingIn.close();
        })
        .catch((e) => {
          AlertHelper.errorToast(Helpers.getFirebaseError(e));
        });
    },
  },
  getters: {
    isLoggedIn: (state) => state.user !== undefined,
  },
});
