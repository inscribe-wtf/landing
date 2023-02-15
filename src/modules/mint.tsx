import { motion } from "framer-motion";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Collection } from "../..";
import { mintOptions } from "../constants/constants";

type Props = {
  handleClose: () => void;
  collection: Collection;
};
export default function Mint({ handleClose, collection }: Props) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-base-200 w-1/3 absolute top-0 right-0"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
      >
        <div className="flex flex-col p-4 gap-4">
          <div className="flex flex-row justify-between">
            <div className="text-4xl font-bold"></div>
            <button className="btn btn-ghost" onClick={handleClose}>
              <AiOutlineClose size={24} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
