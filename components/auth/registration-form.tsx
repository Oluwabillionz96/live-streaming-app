import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const RegistrationForm = ({
  setMode,
  setOpenForm,
}: {
  setMode: Dispatch<SetStateAction<"login" | "signup">>;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const [registrationData, setRegistrationData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassowrd: "",
  });

  const usernameRef = useRef<HTMLInputElement | null>(null);
  return (
    <Card className="w-full md:max-w-md">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-center text-xl md:text-2xl w-full">
          Join Stitch Today
        </CardTitle>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setOpenForm(false)}
        >
          <X />
        </Button>
      </CardHeader>
      <CardContent>
        {" "}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log({ registrationData });
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe123@gmail.com"
                required
                value={registrationData.email}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>

              <Input
                id="username"
                type="text"
                required
                ref={usernameRef}
                value={registrationData.username}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={registrationData.password}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={registrationData.confirmPassowrd}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    confirmPassowrd: e.target.value,
                  }))
                }
              />
            </div>
            <Button type="submit" className="w-full" onClick={() => {}}>
              Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant={"link"}
          onClick={() => {
            setMode("login");
          }}
        >
          Have an Account? Log in
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegistrationForm;
