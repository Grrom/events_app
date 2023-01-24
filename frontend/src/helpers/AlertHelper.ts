import Swal from "sweetalert2";
import type { SweetAlertIcon } from "sweetalert2";

interface fireToastProps {
  message: string;
  icon: SweetAlertIcon;
  duration?: number;
  showTimer?: boolean;
}

function fireToast({ icon, message, duration, showTimer }: fireToastProps) {
  Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: duration ?? 3000,
    timerProgressBar: showTimer ?? true,
    didOpen: (toast: HTMLElement) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  }).fire({
    icon: icon,
    title: message,
  });
}

interface numberInputAlertProps {
  question: string;
  defaultName?: string;
  defaultDate?: string;
  onConfirm: (value: any) => void;
}

interface confirmDialogProps {
  question: string;
  confirmButtonColor?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

interface textInputProps {
  question: string;
  defaultValue?: string;
  confirmButtonText?: string;
  onConfirm: (value: any) => void;
}

export default class AlertHelper {
  static errorToast = (
    message: string,
    duration?: number,
    showTimer?: boolean
  ) => {
    fireToast({
      icon: "error",
      message: message,
      duration: duration,
      showTimer: showTimer,
    });
  };

  static infoToast = (message: string, duration?: number) => {
    fireToast({
      icon: "info",
      message: message,
      duration: duration,
    });
  };

  static successToast = (message: string, duration?: number) => {
    fireToast({
      icon: "success",
      message: message,
      duration: duration,
    });
  };

  static textInputAlert = ({
    question,
    defaultValue,
    confirmButtonText,
    onConfirm,
  }: textInputProps) => {
    Swal.fire({
      icon: "question",
      title: question,
      inputValue: defaultValue,
      input: "text",
      confirmButtonText: confirmButtonText ?? "OK",
      showCancelButton: true,
    }).then((value: any) => {
      if (value.isConfirmed) {
        onConfirm(value.value);
      }
    });
  };

  static updateEventAlert = async ({
    question,
    defaultDate,
    defaultName,
    onConfirm,
  }: numberInputAlertProps) => {
    const value_1 = await Swal.fire({
      icon: "question",
      html: `
      <span id="number-input-alert">
        <input
          type="text"
          class="swal2-input"
          value="${defaultName}"
          id="name"> 
        <input
          type="date"
          class="swal2-input"
          value="${defaultDate}"
          id="date"
          min=${new Date().toISOString().split("T")[0]}
          > 
      </span>`,
      title: question,
      showCancelButton: true,
      allowOutsideClick: false,
    });
    if (value_1.isConfirmed) {
      onConfirm({
        name: (document.getElementById("name") as HTMLInputElement).value,
        date: (document.getElementById("date") as HTMLInputElement).value,
      });
    } else {
      onConfirm(undefined);
    }
  };

  static fileInputAlert = (
    question: string,
    accept: string,
    onConfirm: (value: any) => void
  ) => {
    Swal.fire({
      title: question,
      input: "file",
      inputAttributes: {
        accept: accept,
      },
      showCancelButton: true,
    }).then((value: any) => {
      if (value.isConfirmed) {
        onConfirm(value.value);
      }
    });
  };

  static successAlert = (title: string, message?: string) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: message,
    });
  };

  static infoAlert = (message: string) => {
    return Swal.fire({
      icon: "info",
      title: message,
    });
  };

  static showLoading = (message: string): any => {
    let loading = Swal.fire({
      title: message,
      didOpen: () => {
        Swal.showLoading(null);
      },
    });
    return loading;
  };

  static confirmDialog = async ({
    question,
    confirmButtonColor,
    cancelButtonText,
    confirmButtonText,
  }: confirmDialogProps) => {
    return Swal.fire({
      icon: "question",
      title: question,
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor ?? "red",
      cancelButtonText: cancelButtonText ?? "cancel",
      confirmButtonText: confirmButtonText ?? "ok",
      allowOutsideClick: false,
    }).then((value: any) => {
      return value.isConfirmed;
    });
  };
}
