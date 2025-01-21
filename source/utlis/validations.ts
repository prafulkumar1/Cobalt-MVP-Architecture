export function validateUserName(username: string) {
    const user = /^[a-zA-Z0-9_-]{5,16}$/;
    return user.test(username);
  }
  export function validatePassword(password: string) {
    const passwordRegex =
      /^(?!\S*[\s])*(?=.*[!@#$%^&*()\[\]{}|\\:;\"'<>,.?/])\S+$/;
    return passwordRegex.test(password);
  }
  export function validateUserEmail(email: string) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
   
  export function validatemobileNumber(number: string) {
    const numberRegex = /^[0-9]{10}$/;
    return numberRegex.test(number);
  }
   
  export function validateProfileName(name: string) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  }
  export function validateName(name: string) {
    const nameRegex = /^[A-Za-z\s.'-]+$/;
    return nameRegex.test(name);
  }
  export function validateHelpEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email); 
  }