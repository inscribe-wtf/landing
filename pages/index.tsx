import { createClient, User } from "@supabase/supabase-js";
import { atom, useAtom } from "jotai";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const supabaseUrl = "https://wxkuupskzfjcajqdstaz.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const userAtom = atom<User | null>(null);
export const userAuthenticatedAtom = atom((get) => get(userAtom) !== null);

const Home: NextPage = () => {
  const [, setUser] = useAtom(userAtom);
  const [userAuthenticated] = useAtom(userAuthenticatedAtom);
  const router = useRouter();

  const signIn = async () => {
    if (userAuthenticated) {
      return router.push("/dashboard");
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    console.log({ data, error });
  };

  async function userStatus() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    console.log({ user, error });
    setUser(user);
  }

  useEffect(() => {
    userStatus();
    window.addEventListener("hashchange", function () {
      userStatus();
    });
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      data-theme="forest"
    >
      <div className="flex flex-col justify-center items-center mb-40 gap-4">
        <a href="https://inscribe.wtf" target="_blank" rel="noreferrer">
          <h1 className="text-7xl font-bold">inscribe.wtf</h1>
        </a>
        <div className="mockup-code">
          <pre data-prefix="$">
            <code>npx degit inscribe-wtf/template</code>
          </pre>
        </div>
        <div className="flex flex-row mt-4 gap-4">
          <button className="btn btn-secondary" onClick={signIn}>
            Get api key
          </button>
          <button className="btn btn-outline btn-secondary">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
