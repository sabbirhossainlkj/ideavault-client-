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
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setIsLoading(true);

      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Login failed!");
      } else {
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    toast.loading("Redirecting to Google...");

    await authClient.signIn.social({
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

    toast.success("Password reset link sent!");
    setIsOpen(false);
    setResetEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        
        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <FaLock className="text-white text-2xl" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back!
            </h2>

            <p className="text-gray-500 mt-2 text-sm">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <Form
            className="flex flex-col gap-5"
            onSubmit={onSubmit}
          >
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
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
            >
              <Label>Password</Label>

              <div className="relative w-full">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />

                <Input
                  placeholder="Enter your password"
                  className="pl-10 pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-600"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>

              <Description className="text-xs text-gray-400">
                Minimum 8 characters
              </Description>

              <FieldError />
            </TextField>

            {/* Forgot Password */}
            <div className="flex justify-end w-full">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:underline transition"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full h-12 text-white text-md font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 shadow-lg transition"
              type="submit"
              isDisabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  <Check />
                  Sign In
                </>
              )}
            </Button>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="h-px bg-gray-200 flex-1" />

            <span className="text-sm text-gray-400 whitespace-nowrap">
              OR CONTINUE WITH
            </span>

            <div className="h-px bg-gray-200 flex-1" />
          </div>

          {/* Google Login */}
          <Button
            onClick={handleGoogleSignIn}
            className="w-full h-12 rounded-xl border border-gray-200 bg-white text-gray-700 text-md font-semibold hover:bg-gray-50 shadow-sm"
          >
            <AiFillGoogleCircle className="text-2xl text-red-500" />

            Continue with Google
          </Button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don&apos;t have an account?{" "}
            <span className="text-cyan-600 font-semibold cursor-pointer hover:underline">
              Create Account
            </span>
          </p>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Secure authentication powered by our platform
        </p>
      </div>
    </div>
  );
};

export default SignInPage;