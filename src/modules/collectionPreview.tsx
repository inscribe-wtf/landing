import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Collection, Inscription } from "../..";
import { timeSince, trimBtcAddress } from "../constants/utils";
import useOnScreen from "../hooks/useOnScreen";

type Props = {
  collection: Collection;
  index: number;
  onClick: () => void;
};

const CollectionPreview = ({ collection, index, onClick }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  useEffect(() => {
    if (isVisible) {
      (async () => {
        const res = await fetch(
          `http://localhost:3000/api/inscription?collectionId=${collection.id}`
        );
        const data = await res.json();
        console.log({ data });
        setInscriptions(data);
        //
      })();
    }
  }, [isVisible]);

  return (
    <div
      className="flex flex-row gap-10 items-baseline"
      key={collection.id}
      ref={ref}
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
            <Link href={`/collection/${collection.id}`}>{collection.name}</Link>
          </motion.div>
          <div className="text-sm text-zinc-700 mt-1">
            {timeSince(new Date(collection.created_at))}
          </div>
        </div>
        <div className="">{collection.max_supply} left</div>
        <div className="flex flex-row gap-4">
          {inscriptions.map((i) => (
            <div key={i.id}>
              <img src={i.image} className="h-40 rounded-xl" />
              <div className="text-gray-500 font-bold">{i.status}</div>
              <div>{trimBtcAddress(i.bitcoin_address)}</div>
              <div className="text-xs">
                {timeSince(new Date(i.created_at))} ago
              </div>
            </div>
          ))}
        </div>
        <button className="btn w-48" onClick={onClick}>
          Mint Now
        </button>
      </div>
    </div>
  );
};

export default CollectionPreview;
