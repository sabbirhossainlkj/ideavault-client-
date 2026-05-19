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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const loadingToast = toast.loading("Creating account...");

    const { data, error } = await authClient.signUp.email({
      name,
      image,
      email,
      password,
    });

    toast.dismiss(loadingToast);

    if (error) {
      toast.error(error.message || "Signup failed!");
      return;
    }

    if (data) {
      toast.success("Account created successfully!");
      router.push("/");
    }
  };

  const handleGoogleSingIn = async () => {
    toast.loading("Redirecting to Google...");

    authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="w-6/12 space-y-4 mx-auto my-6 border p-6 shadow-2xl py-9 rounded-2xl">
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>

      <Form className="flex flex-col gap-4 space-y-2" onSubmit={onSubmit}>
        <TextField isRequired name="name" type="text">
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
          <FieldError />
        </TextField>

        <TextField isRequired name="image" type="text">
          <Label>Image URL</Label>
          <Input placeholder="Image URL" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <Button
          className="w-full text-white text-md font-bold bg-[#15A1BF]"
          type="submit"
        >
          <Check />
          Create Account
        </Button>
      </Form>

      <p className="text-2xl font-bold text-center text-gray-400">
        Or sign up with
      </p>

      <Button onClick={handleGoogleSingIn} className="w-full bg-[#15A1BF] text-xl">
        <AiFillGoogleCircle />
        Sign Up with Google
      </Button>
    </div>
  );
};

export default SignUpPage;