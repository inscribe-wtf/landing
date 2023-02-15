import { motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Collection } from "../..";
import AnimatedLayout from "../components/animatedLayout";
import { timeSince } from "../constants/utils";

type Props = {};

export const collectionsAtom = atom<Collection[]>([]);

export default function Explore({}: Props) {
  const [tab, setTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [globalCollections, setGlobalCollections] = useAtom(collectionsAtom);

  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    if (!isOpen) {
      (async () => {
        const res = await (await fetch(`/api/collection`)).json();
        console.log({ res });
        setGlobalCollections(res);
        // multiply res by 2
        setCollections([...res, ...res]);
      })();
    }
  }, [isOpen]);
  return (
    <AnimatedLayout>
      <div className="py-4 flex flex-col font-mono gap-2">
        <div className="tabs tabs-boxed">
          <a
            className={`tab ${tab === 0 ? "tab-active" : ""}`}
            onClick={() => setTab(0)}
          >
            All
          </a>
          <a
            className={`tab ${tab === 1 ? "tab-active" : ""}`}
            onClick={() => setTab(1)}
          >
            Editions
          </a>
          <a
            className={`tab ${tab === 2 ? "tab-active" : ""}`}
            onClick={() => setTab(2)}
          >
            Drops
          </a>
        </div>
        {collections.map((collection, index) => (
          <div
            className="flex flex-row gap-10 items-baseline"
            key={collection.id}
          >
            <div className="font-bold">{index + 1}</div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-4">
                <motion.div
                  className="font-bold text-xl cursor-pointer"
                  whileHover={{
                    rotate: [0, 5, -5, 5, 0],
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link href={`/collection/${collection.id}`}>
                    {collection.name}
                  </Link>
                </motion.div>
                <div className="text-sm text-zinc-700 mt-1">
                  {timeSince(new Date(collection.created_at))}
                </div>
              </div>
              <div className="">{collection.max_supply} left</div>
              <div className="flex flex-row gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <img
                    src={collection.thumbnail}
                    className="w-24 h-24 object-cover"
                  />
                ))}
              </div>
              <button className="btn w-48">Mint Now</button>
            </div>
          </div>
        ))}
      </div>
    </AnimatedLayout>
  );
}
