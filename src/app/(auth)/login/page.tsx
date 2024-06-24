"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";

interface LoginInterface {
   email: string;
   password: string;
}

export default function Signup() {
   const router = useRouter();
   const [formData, setFormData] = useState<LoginInterface>({
      email: "",
      password: "",
   });
   const [error, setError] = useState<string>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const handleSignupFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
         ...formData,
         [e.target.id]: e.target.value,
      });
      setError("");
   };

   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      console.log(formData);
      
      try {
         const response = await fetch("/api/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });

         if (!response.ok) {
            throw new Error("Failed to sign up");
         }

         const data = await response.json();
         Cookies.set("token", data.token);
         router.push("/");
      } catch (error: any) {
         setError(error.message);
         setIsLoading(false);
      }
   };

   return (
      <div className="flex justify-center items-center min-h-screen">
         <div className="w-1/3 bg-gray-200 flex flex-col gap-10 p-6 rounded-md">
            <div className="text-center">
               <p className="text-3xl font-bold font-serif my-6">Login</p>
            </div>
            <div className="w-full flex justify-center py-6">
               <form
                  onSubmit={handleFormSubmit}
                  className="w-8/12 flex flex-col gap-6"
               >
                  <div>
                     <label htmlFor="email">Email</label>
                     <input
                        className="p-2 rounded-lg w-full"
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleSignupFormChange}
                        required
                     />
                  </div>
                  <div>
                     <label htmlFor="password">Password</label>
                     <input
                        className="p-2 rounded-lg w-full"
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleSignupFormChange}
                        required
                     />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex justify-center">
                     <button
                        type="submit"
                        className={`bg-black text-white text-xl px-8 py-2 rounded-2xl hover:text-black hover:bg-white outline outline-1 ${
                           isLoading ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        disabled={isLoading}
                     >
                        {isLoading ? "Loging..." : "Login"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
