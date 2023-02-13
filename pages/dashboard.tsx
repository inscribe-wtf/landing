import { useAtom } from "jotai";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { userAuthenticatedAtom } from ".";
import Navbar from "../src/components/navbar";
import { AiOutlinePlus } from "react-icons/ai";

const Dashboard: NextPage = () => {
  const [userAuthenticated] = useAtom(userAuthenticatedAtom);
  const router = useRouter();

  useEffect(() => {
    if (!userAuthenticated) {
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col" data-theme="forest">
      <Navbar />
      <div className="p-6 flex flex-col gap-8 items-start">
        <h1 className="text-5xl font-bold">Your projects</h1>
        <button className="btn btn-secondary">Create new project</button>
      </div>
    </div>
  );
};

export default Dashboard;
