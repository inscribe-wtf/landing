import { createClient, User } from "@supabase/supabase-js";
import { AnimatePresence } from "framer-motion";
import { atom, useAtom } from "jotai";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar, { themeAtom } from "../src/components/navbar";
import Tabs from "../src/components/tabs";
import Explore from "../src/modules/explore";
import MyCollections from "../src/modules/myCollections";

const supabaseUrl = "https://wxkuupskzfjcajqdstaz.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const userAtom = atom<User | null>(null);
export const userAuthenticatedAtom = atom((get) => get(userAtom) !== null);

const Home: NextPage = () => {
  const [, setUser] = useAtom(userAtom);

  const [tabSelected, setTabSelected] = useState(0);

  const signIn = async () => {
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
    <div className="min-h-screen">
      <Navbar />
      <div className="px-8">
        <Tabs tabSelected={tabSelected} setTabSelected={setTabSelected} />
        <AnimatePresence mode="wait">
          {tabSelected === 0 && <Explore key="explore" />}
          {tabSelected === 1 && <MyCollections key="create" signIn={signIn} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
