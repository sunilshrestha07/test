"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Try named import

interface DecodedToken {
   // Define the structure of your token payload here
   userId: string;
   email: string;
   iat: number;
   exp: number;
}

export default function Home() {
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

   useEffect(() => {
      const handleCookies = () => {
         try {
            const token = Cookies.get("token");
            if (!token) {
               setIsLoggedIn(false);
               return;
            }
            const decoded: DecodedToken = jwtDecode(token);
            if (decoded) {
               setIsLoggedIn(true);
               console.log("You are logged in");
            }
         } catch (error) {
            console.log("User is not logged in", error);
            setIsLoggedIn(false);
         }
      };

      handleCookies();
   }, []);

   return (
      <main>
         <div>
            {isLoggedIn ? (
               <div>Hello user, you have logged in successfully</div>
            ) : (
               <div>Hello user, you are not logged in</div>
            )}
         </div>
      </main>
   );
}
