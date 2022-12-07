import Link from "next/link";
import { getSession,useSession } from "next-auth/react";

export default function Profil() {
   const { data: session } = useSession();
   return (
      <section className="container mx-auto text-center">
         <h3 className="text-4xl font-bold my-2">Profile Page</h3>
         <p className="text-lg my-2">{session.user.name}</p>
         <p className="text-lg my-2">{session.user.email}</p>

         <Link className="bg-blue-500 px-8 py-1 text-white my-2 text-2xl rounded-2xl" href={"/"}>Domů</Link>
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