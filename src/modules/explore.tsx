import { AnimatePresence, motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Collection } from "../..";
import AnimatedLayout from "../components/animatedLayout";
import { timeSince } from "../constants/utils";
import CollectionPreview from "./collectionPreview";
import Mint from "./mint";

type Props = {};

export const collectionsAtom = atom<Collection[]>([]);

export default function Explore({}: Props) {
  const [tab, setTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [_, setGlobalCollections] = useAtom(collectionsAtom);

  const [collections, setCollections] = useState<Collection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>(
    []
  );
  const [selectedCollection, setSelectedCollection] = useState<Collection>();

  useEffect(() => {
    if (!isOpen) {
      (async () => {
        const res = await (await fetch(`/api/collection`)).json();
        console.log({ res });
        setGlobalCollections(res);
        setCollections(res);
        setFilteredCollections(res);
      })();
    }
  }, [isOpen]);
  return (
    <AnimatedLayout>
      <AnimatePresence>
        {isOpen && selectedCollection && (
          <Mint
            handleClose={() => setIsOpen(false)}
            collection={selectedCollection}
          />
        )}
      </AnimatePresence>
      <div className="py-4 flex flex-col font-mono gap-2">
        <div className="tabs tabs-boxed">
          <a
            className={`tab ${tab === 0 ? "tab-active" : ""}`}
            onClick={() => {
              setFilteredCollections(collections);
              setTab(0);
            }}
          >
            All
          </a>
          <a
            className={`tab ${tab === 1 ? "tab-active" : ""}`}
            onClick={() => {
              setFilteredCollections(
                collections.filter((collection) => collection.type === 0)
              );
              setTab(1);
            }}
          >
            Editions
          </a>
          <a
            className={`tab ${tab === 2 ? "tab-active" : ""}`}
            onClick={() => {
              setFilteredCollections(
                collections.filter((collection) => collection.type === 1)
              );
              setTab(2);
            }}
          >
            Drops
          </a>
        </div>
        {filteredCollections.map((collection, index) => (
          <CollectionPreview
            collection={collection}
            key={index}
            index={index}
            onClick={() => {
              setSelectedCollection(collection);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
    </AnimatedLayout>
  );
}
