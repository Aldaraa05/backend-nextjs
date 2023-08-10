// page/_app.tsx
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import Chat from "./components/chat";
import { User } from "@clerk/nextjs/dist/types/server";

 
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <SignedIn>
        <div style={{margin:"20px"}}>
        <UserButton></UserButton>
        </div>
      
        <Chat/>
      </SignedIn>
      <SignedOut>
      <div style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <SignUp/>
      </div>
      </SignedOut>


    </ClerkProvider>
  );
}
 
export default MyApp;