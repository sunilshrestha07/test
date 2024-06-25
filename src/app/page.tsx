import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import TokenVerify from "../components/tokenVerify";

export const dynamic = 'force-dynamic'; // Ensures the page uses SSR

interface DecodedToken {
  userId: string;
}

export default async function Home() {
  let isAuthenticated = false;

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || "";

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
      isAuthenticated = true;
    }
  } catch (error) {
    console.log("Error verifying token:", error);
  }

  return (
    <main>
      <div>
        <TokenVerify isAuthenticated={isAuthenticated} />
      </div>
    </main>
  );
}
