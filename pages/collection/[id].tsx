import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiGlobe } from "react-icons/fi";
import { Inscription } from "../..";
import Navbar from "../../src/components/navbar";
import { timeSince, trimBtcAddress } from "../../src/constants/utils";
import { collectionsAtom } from "../../src/modules/explore";
import Mint from "../../src/modules/mint";
const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

type Props = {};

const CollectionPage: NextPage = (props: Props) => {
  const [collections] = useAtom(collectionsAtom);
  const router = useRouter();
  const { id } = router.query;
  const collection = collections.find((c) => c.id === parseInt(id as string));

  const [isOpen, setIsOpen] = useState(false);

  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);

  useEffect(() => {
    if (!isOpen && id) {
      (async () => {
        const res = await fetch(
          `http://localhost:3000/api/inscription?collectionId=${id}`
        );
        const data = await res.json();
        console.log({ data });
        setInscriptions(data);
        //
      })();
    }
  }, [isOpen]);

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {isOpen && collection && (
          <Mint handleClose={() => setIsOpen(false)} collection={collection} />
        )}
      </AnimatePresence>
      <Navbar />
      <div className="px-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-baseline gap-2">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">{collection?.name}</div>
              <div className="text-sm text-gray-500 mt-1">
                {collection?.type === 0 ? "Edition" : "Drop"}
              </div>
            </div>
            <button className="btn btn-ghost">
              <FiGlobe size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <RichTextEditor
                className="bg-black border-0 -ml-4"
                value={collection?.description}
                readOnly
              />
              <div>{collection?.max_supply} left</div>
              <button className="btn w-48" onClick={() => setIsOpen(true)}>
                Mint Now
              </button>
            </div>
            <div className="flex flex-col items-center">
              <img src={collection?.thumbnail} className="h-96" />
            </div>
          </div>
          <div>Recent Mints</div>
          <div className="grid grid-cols-6 gap-4">
            {inscriptions.map((i) => (
              <div key={i.id}>
                <img src={i.image} className="h-48 rounded-xl" />
                <div className="text-gray-500 font-bold">{i.status}</div>
                <div>Owned by: {trimBtcAddress(i.bitcoin_address)}</div>
                <div className="text-xs">
                  {timeSince(new Date(i.created_at))} ago
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
