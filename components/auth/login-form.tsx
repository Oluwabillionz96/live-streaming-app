import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const LoginForm = ({
  setMode,
  setOpenForm,
}: {
  setMode: Dispatch<SetStateAction<"login" | "signup">>;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  return (
    <Card className="w-full md:max-w-md">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-center text-xl md:text-2xl w-full">
          Login to Stitch
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
            console.log({ loginDetails });
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
                value={loginDetails.email}
                onChange={(e) =>
                  setLoginDetails((prev) => ({
                    ...prev,
                    email: e.target.value,
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
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant={"link"}
          onClick={() => {
            setMode("signup");
          }}
        >
          Don&apos;t have an account? Sign up
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
