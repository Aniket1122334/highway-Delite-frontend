export interface User {
    name: string;
    email: string;
  }
  
  export interface SignupForm {
    name: string;
    email: string;
    dob: string;
  }
  
  export interface SigninForm {
    email: string;
    keepLoggedIn: boolean;
  }
  
  export interface VerifyOTPForm {
    email: string;
    otp: string;
    keepLoggedIn?: boolean;
  }
  