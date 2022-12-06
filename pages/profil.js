import Link from "next/link";
import { getSession } from "next-auth/react";

export default function Profil() {
   return (
      <section className="container mx-auto text-center">
         <h3 className="text-4xl font-bold">Profile Page</h3>

         <Link href={"/"}>Domů</Link>
      </section>
   );
}

export async function getServerSideProps({req}) {
   const session = await getSession({req});

   if(!session) {
      return {
         redirect: {
            destination: "/auth/prihlasit",
            permanent: false,
         }
      }
   }
   return {
      props: {session}
   }
}