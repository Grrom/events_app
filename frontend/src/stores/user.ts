import { defineStore } from "pinia";
import type { UserCredential } from "firebase/auth";
import { authenticationHelper } from "@/main";
import AlertHelper from "@/helpers/AlertHelper";
import Helpers from "@/helpers/Helpers";
import router from "@/router";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: undefined as UserCredential | undefined,
      needsRefresh: true,
    };
  },
  actions: {
    login(loginEmail: string, loginPassword: string) {
      let loggingIn = AlertHelper.showLoading("Logging in...");

      authenticationHelper
        .login(loginEmail.trim(), loginPassword.trim())
        .then((auth) => {
          if (!auth.user.emailVerified) {
            authenticationHelper.promptEmailVerification(auth, loginEmail);
          } else {
            this.user = auth;
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
            this.user = auth;
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
  },
});
