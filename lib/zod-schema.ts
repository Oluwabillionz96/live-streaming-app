import * as z from "zod";

export const RegistrationSchema = z
  .object({
    email: z.email(),
    username: z.string().min(1, "Username is required"),
    password: z
      .string()
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
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "Password must include uppercase, lowercase, a number, and a symbol."
    ),
});

export const StreamSetupSchema = z.object({
  title: z.string().min(1, "Stream Title is required").max(100),
  description: z.string().min(1, "Stream description is required"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "File size must be less than 10MB",
    })
    .refine(
      (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      {
        message: "File must be a PNG or JPG image",
      }
    )
    .optional(),
  isPublic: z.boolean(),
});
