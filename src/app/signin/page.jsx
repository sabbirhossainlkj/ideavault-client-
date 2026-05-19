"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useState } from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Login failed!");
    } else {
      toast.success("Login successful!");
    }
  };

  const handleGoogleSingIn = async () => {
    toast.loading("Redirecting to Google...");
    authClient.signIn.social({
      provider: "google",
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!resetEmail) {
      toast.error("Email is required!");
      return;
    }

    console.log("Reset password request:", resetEmail);

    toast.success("Password reset link sent (UI only)");
    setIsOpen(false);
    setResetEmail("");
  };

  return (
    <div className="w-6/12 space-y-4 mx-auto my-6 border p-6 shadow-2xl py-9 rounded-2xl">
      <h2 className="text-2xl font-bold text-center">Sign in</h2>

      <Form className="flex flex-col gap-4 space-y-2" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="email"
          type="email"
        >
          <Label>Email Address</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-sm text-cyan-500 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button
          className="w-full text-white text-md font-bold bg-[#15A1BF]"
          type="submit"
        >
          <Check />
          Sign In
        </Button>
      </Form>
      <p className="text-2xl  whitespace-nowrap font-bold text-center text-gray-400">
        Or sing up with
      </p>

      <Button onClick={handleGoogleSingIn} className="w-full bg-[#15A1BF] text-xl">
        <AiFillGoogleCircle />
        Sign In with Google
      </Button>
    </div>
  );
};

export default SignInPage;