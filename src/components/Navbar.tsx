import Link from "next/link";
import React from "react";

export default function Navbar() {
   const navlinks = [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Contact us", href: "/contatus" },
      { name: "Signup", href: "/signup" },
   ];
   return (
      <nav>
         <div className=" ">
            <div className="bg-blue-200 px-28 flex justify-between w-full">
               <div className=" text-2xl font-semibold flex justify-center items-center">Emails</div>
               <div className="flex gap-16 py-5">
                  {navlinks.map((links, index) => (
                     <div className="" key={index}>
                        <Link href={links.href}>
                           <div className=" text-xl  hover:font-medium">{links.name}</div>
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </nav>
   );
}
