import * as z from "zod";

export const RegistrationSchema = z
  .object({
    email: z.email(),
    username: z.string().min(1, "Username is required"),
    password: z
      .string("Users must create a password")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Password must  include uppercase, lowercase, a number, and a symbol."
      ),
    confirmPassword: z.string().min(1, "Users must confirm their Passwords"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password must match",
  });

export const Login = z.object({
  email: z.email(),
  password: z
    .string("Users must input their passwords to log in")
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "Password must include uppercase, lowercase, a number, and a symbol."
    ),
});
