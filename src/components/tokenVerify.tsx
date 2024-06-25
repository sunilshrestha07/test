"use client";

import { useState, useEffect } from "react";

interface TokenVerifyProps {
  isAuthenticated: boolean;
}

interface UserInterface {
  _id?: string;
  username: string;
}

export default function TokenVerify({ isAuthenticated }: TokenVerifyProps) {
  const [userData, setUserData] = useState<UserInterface | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/me', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, []);

  return (
    <div className=" text-3xl">
      {isAuthenticated ? (
        <div >Hello <span className="font-bold">{userData?.username}</span>, you have logged in successfully</div>
      ) : (
        <div>Hello user, you are not logged in</div>
      )}
    </div>
  );
}
