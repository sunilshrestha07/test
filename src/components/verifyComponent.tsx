"use client"

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

// Rename the component to start with an uppercase letter
export default function VerifyComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [verificationCode, setVerificationCode] = useState<string>(''); // Use useState hook directly

    const handleVerifySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = { email, verificationCode };
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
                router.push('/');
                console.log(data.message); // Show success message
            } else {
                console.log('Error verifying user:', data.message);
            }

        } catch (error) {
            console.log('Error verifying email:', error);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-1/3 bg-gray-200 flex flex-col gap-10 mt-20 rounded-md py-10">
                    <div>
                        <p className="font-semibold text-3xl text-center">
                            Please verify your email
                        </p>
                        <p className="text-base opacity-80 text-center">{email}</p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <form className="w-10/12 flex flex-col gap-6" onSubmit={handleVerifySubmit}>
                            <input
                                className="px-5 py-4 rounded-lg"
                                type="text"
                                id="verificationCode"
                                placeholder="Verification Code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <div className="flex justify-center">
                                <button className="bg-black px-6 py-2 rounded-3xl text-xl text-white w-1/2" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
