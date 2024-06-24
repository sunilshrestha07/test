"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function verify() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [verificationCode, setVerificationCode] = React.useState<string>('');

    const handelVerifySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       const formData = { email, verificationCode }
       try {
         const response = await fetch('/api/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();
          console.log(data); // Log API response
    
          if (response.ok) {
            router.push('/')
            console.log(data.message); // Show success message
          } else {
            console.log('Error verfuying uesr:', data.message);
          }

       } catch (error) {
         console.log('Error verifying email:', error);
       }
    }
   return (
      <>
         <div className=" flex justify-center items-center ">
            <div className=" w-1/3 bg-gray-200 flex flex-col gap-10 mt-20 rounded-md py-10">
               <div className="">
                  <p className=" font-semibold text-3xl text-center">
                     Please verify your email
                  </p>
                  <p className=" text-base opacity-80 text-center">{email}</p>
               </div>
               <div className=" w-full flex justify-center items-center">
                  <form  className=" w-10/12 flex flex-col gap-6" onSubmit={handelVerifySubmit}>
                     <input
                        className=" px-5 py-4 rounded-lg"
                        type="text"
                        name=""
                        id="verificationCode"
                        placeholder="verificationCode"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                     />
                     <div className=" flex justify-center">
                        <button className="bg-black px-6 py-2 rounded-3xl text-xl text-white w-1/2" type="submit">Submit</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
}
