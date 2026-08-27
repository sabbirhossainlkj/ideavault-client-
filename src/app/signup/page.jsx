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
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
} from "react-icons/fa";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setIsLoading(true);

    const loadingToast = toast.loading("Creating your account...");

    try {
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

        // Send welcome email
        fetch(
          `http://localhost:5000/api/send-email?email=${email}&name=${name}`,
          {
            method: "POST",
          },
        ).catch((error) => {
          console.error("Email sending failed:", error);
        });

        router.push("/");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const loadingToast = toast.loading(
      "Redirecting to Google...",
    );

    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Google sign up failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-10">

          {/* Header */}
          <div className="text-center mb-8">

            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <FaUser className="text-white text-2xl" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2 text-sm">
              Join us today and get started
            </p>
          </div>

          {/* Form */}
          <Form
            className="flex flex-col gap-5"
            onSubmit={onSubmit}
          >

            {/* Name */}
            <TextField
              isRequired
              name="name"
              type="text"
              className="w-full"
            >
              <Label>Full Name</Label>

              <div className="relative w-full">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />

                <Input
                  placeholder="Enter your full name"
                  className="pl-10"
                />
              </div>

              <FieldError />
            </TextField>

            {/* Image */}
            <TextField
              isRequired
              name="image"
              type="url"
              className="w-full"
            >
              <Label>Profile Image URL</Label>

              <div className="relative w-full">
                <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />

                <Input
                  placeholder="https://example.com/image.jpg"
                  className="pl-10"
                />
              </div>

              <FieldError />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    value,
                  )
                ) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label>Email Address</Label>

              <div className="relative w-full">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />

                <Input
                  placeholder="john@example.com"
                  className="pl-10"
                />
              </div>

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full"
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

              <div className="relative w-full">

                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />

                <Input
                  placeholder="Enter your password"
                  className="pl-10 pr-12"
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-600 transition"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              <Description className="text-xs text-gray-400">
                Must be at least 8 characters with 1 uppercase
                letter and 1 number.
              </Description>

              <FieldError />
            </TextField>

            {/* Submit Button */}
            <Button
              className="w-full h-12 text-white text-md font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 shadow-lg transition"
              type="submit"
              isDisabled={isLoading}
            >
              {isLoading ? (
                "Creating Account..."
              ) : (
                <>
                  <Check />
                  Create Account
                </>
              )}
            </Button>

          </Form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">

            <div className="h-px bg-gray-200 flex-1" />

            <span className="text-xs text-gray-400 whitespace-nowrap">
              OR CONTINUE WITH
            </span>

            <div className="h-px bg-gray-200 flex-1" />

          </div>

          {/* Google Sign Up */}
          <Button
            onClick={handleGoogleSignIn}
            className="w-full h-12 rounded-xl border border-gray-200 bg-white text-gray-700 text-md font-semibold hover:bg-gray-50 shadow-sm transition"
          >
            <AiFillGoogleCircle className="text-2xl text-red-500" />

            Continue with Google
          </Button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-500 mt-8">

            Already have an account?{" "}

            <Link
              href="/signin"
              className="text-cyan-600 font-semibold hover:text-cyan-700 hover:underline transition"
            >
              Sign In
            </Link>

          </p>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Secure authentication • Your information is protected
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;