import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "👋 from IITGN community" });

  return (
    <>
      <Head>
        <title>Graduation Tracker</title>
        <meta
          name="description"
          content="The website to help with your graduation and career paths. Created by students of IITGN."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-row">
            <img src="/gradhat.svg" alt="logo" className="p-4 border-r-4"/>
            <img src="/iitgn-logo.svg" alt="IITGN Logo" className="p-4"/>
          </div>
          <h1 className="text-5xl">
            Welcome to Graduation Requirements Tracker
          </h1>
          <h3 className=" text-gray-500 ">Plan your graduation requirements</h3>
          <AuthShowcase />
          <div>
            <img src="/login-page-person.svg" alt="person" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className=" rounded-md bg-blue-200 px-10 py-3 font-semibold text-blue-500 no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
