export const registrationFields: {
  name: "email" | "username" | "password" | "confirmPassword";
  id: string;
  label: string;
  inputType?: string;
  placeHolder?: string;
  autoFocus?: boolean;
}[] = [
  {
    name: "email",
    id: "email",
    label: "Email",
    inputType: "email",
    placeHolder: "johndoe96@gmail.com",
    autoFocus: true,
  },
  {
    name: "username",
    id: "username",
    label: "Username",
  },
  {
    name: "password",
    id: "password",
    label: "Password",
    inputType: "password",
  },
  {
    name: "confirmPassword",
    id: "confirmPassword",
    label: "Confirm Password",
    inputType: "password",
  },
];
export const loginFields: {
  name: "email" | "password";
  id: string;
  label: string;
  inputType?: string;
  placeHolder?: string;
  autoFocus?: boolean;
}[] = [
  {
    name: "email",
    id: "email",
    label: "Email",
    inputType: "email",
    placeHolder: "johndoe96@gmail.com",
    autoFocus: true,
  },

  {
    name: "password",
    id: "password",
    label: "Password",
    inputType: "password",
  },
];
