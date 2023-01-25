import {
  sendEmailVerification,
  sendSignInLinkToEmail,
  type Auth,
  type UserCredential,
} from "firebase/auth";
import type { FirebaseApp } from "@firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateCurrentUser,
  signOut,
} from "firebase/auth";
import AlertHelper from "./AlertHelper";

export default class AuthenticationHelper {
  auth: Auth;

  public signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(this.auth, email, password);
  };

  public login = (email: string, password: string) => {
    return signInWithEmailAndPassword(this.auth, email, password);
  };

  public resetPassword = (email: string) => {
    return sendPasswordResetEmail(this.auth, email);
  };

  public triggerUpdate() {
    return updateCurrentUser(this.auth, this.auth.currentUser);
  }

  public signOut() {
    return signOut(this.auth);
  }

  public async promptEmailVerification(auth: UserCredential, email: string) {
    console.log(
      await sendEmailVerification(auth.user, {
        url: "http://localhost:5173/",
      })
    );
    return AlertHelper.infoAlert(
      "We've sent you an email to verify your account in: " + email
    );
  }

  constructor(firebaseInstance: FirebaseApp) {
    this.auth = getAuth(firebaseInstance);
  }
}
