import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import AnimatedLayout from "../components/animatedLayout";
import CreateCollection from "./createCollection";

type Props = {};

export default function MyCollections({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AnimatedLayout>
      <AnimatePresence>
        {isOpen && <CreateCollection handleClose={() => setIsOpen(false)} />}
      </AnimatePresence>
      <div className="flex flex-col py-4 gap-4">
        <div className="">You have not created a collection yet!</div>
        <button className="btn w-1/4" onClick={() => setIsOpen(true)}>
          Create Collection
        </button>
      </div>
    </AnimatedLayout>
  );
}
