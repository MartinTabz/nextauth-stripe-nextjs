import Link from "next/link";
import { getSession,useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Profil() {
   const router = useRouter();
   const loadPortal = async () => {
      const body = {
			customerId: session.user.stripeCustomerId,
		};
		const url = '/api/load-customer-portal';
		const { data } = await axios
			.post(url, body, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
				},
			});
		router.push(data.url)
   }

   const { data: session } = useSession();
   return (
      <section className="container mx-auto text-center">
         <div className="text-left px-10 mb-10 mt-10">
            <h3 className="text-5xl font-bold my-2">Uživatelský profil</h3>
            <p className="text-2xl my-2">{session.user.name}</p>
            <p className="text-2xl my-2">{session.user.email}</p>
         </div>

         <div className="grid gap-3 lg:gap-12 lg:grid-cols-2 px-10">
            <Link className="bg-blue-500 px-8 py-3 text-white my-2 text-2xl rounded-2xl" href={"/"}>Domů</Link>
            <button onClick={loadPortal} className="bg-slate-500 px-8 py-3 text-white my-2 text-2xl rounded-2xl">Spravovat předplatné</button>
         </div>
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