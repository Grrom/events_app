import type { Auth } from "firebase/auth";
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

  public promptEmailVerification(email: string) {
    return AlertHelper.infoAlert(
      "We've sent you an email to verify your account in: " + email
    );
  }

  constructor(firebaseInstance: FirebaseApp) {
    this.auth = getAuth(firebaseInstance);
  }
}
