export default class Helpers {
  static getFirebaseError = (error: any) => {
    let errorMessage = (error as any).code;
    return errorMessage
      .substring(errorMessage.indexOf("/") + 1, errorMessage.length)
      .replaceAll("-", " ");
  };
}
