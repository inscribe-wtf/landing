import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Collection } from "../..";
import { userAtom, userAuthenticatedAtom } from "../../pages";
import AnimatedLayout from "../components/animatedLayout";
import CreateCollection from "./createCollection";

type Props = {
  signIn: () => void;
};
export default function MyCollections({ signIn }: Props) {
  const [userAuthenticated] = useAtom(userAuthenticatedAtom);
  const [user] = useAtom(userAtom);
  const [isOpen, setIsOpen] = useState(false);

  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    if (!isOpen) {
      (async () => {
        const res = await (
          await fetch(`/api/collection?id=${user?.id}`)
        ).json();
        console.log({ res });
        // multiplye res by 2
        setCollections(res);
      })();
    }
  }, [isOpen]);

  return (
    <AnimatedLayout>
      <AnimatePresence>
        {isOpen && <CreateCollection handleClose={() => setIsOpen(false)} />}
      </AnimatePresence>
      <div className="flex flex-col py-4 gap-4">
        {collections.length === 0 && (
          <div className="">You have not created a collection yet!</div>
        )}
        <button
          className="btn w-1/4"
          onClick={() => {
            if (userAuthenticated) {
              setIsOpen(true);
            } else {
              signIn();
            }
          }}
        >
          Create Collection
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link href={`/collection/${collection.id}`} key={collection.id}>
              <motion.div
                key={collection.id}
                className="flex flex-col rounded-md cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <img
                  src={collection.thumbnail}
                  className="h-72 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col gap-2 border-b border-l border-r rounded-b-lg">
                  <div className="text-lg font-bold">{collection.name}</div>
                  <div className="text-sm text-gray-500 ">
                    {collection.type === 0 ? "Edition" : "Drop"}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </AnimatedLayout>
  );
}
