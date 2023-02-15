import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineLoading } from "react-icons/ai";
import { userAtom } from "../../pages";
import AnimatedLayout from "../components/animatedLayout";
import {
  endTimeOptions,
  maxSupplyOptions,
  mintPriceOptions,
} from "../constants/constants";
import { generateImage, uploadFolder } from "../services/upload";
const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  handleClose: () => void;
};

const otherAtt = {
  directory: "",
  webkitdirectory: "",
};

export default function CreateCollection({ handleClose }: Props) {
  const [step, setStep] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");

  const [type, setType] = useState(0);
  const [maxSupply, setMaxSupply] = useState(555);
  const [endTime, setEndTime] = useState(1);
  const [mintPrice, setMintPrice] = useState(0.0021);
  const [uploading, setUploading] = useState(false);

  const [cid, setCid] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [user] = useAtom(userAtom);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-base-200 w-1/2 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
      >
        <div className="flex flex-col p-8 gap-4">
          <div className="flex flex-row justify-between">
            <div className="text-4xl font-bold">Create collection</div>
            <button className="btn btn-ghost" onClick={handleClose}>
              <AiOutlineClose size={24} />
            </button>
          </div>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <AnimatedLayout key="info">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col ">
                    <label className="label">
                      <span className="label-text">Collection name</span>
                    </label>
                    <input
                      className="input input-bordered w-full"
                      placeholder="Ordinal Punks"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label className="label">
                      <span className="label-text">Wesbite</span>
                    </label>
                    <input
                      className="input input-bordered w-full"
                      placeholder="https://ordinalpunks.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <RichTextEditor
                      className="min-h-[15rem] max-h-[25rem] bg-base-100 border border-base-300 w-full overflow-y-auto"
                      value={description}
                      onChange={setDescription}
                      controls={[
                        ["bold", "italic", "underline", "link"],
                        ["unorderedList", "orderedList", "h1", "h2", "h3"],
                        ["code", "video"],
                      ]}
                      placeholder="Ordinal Punks is a collection of 5555 unique generative NFTs. Each NFT is a unique combination of 5 traits: body, head, eyes, mouth, and accessories."
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full gap-4">
                    <div />
                    <button className="btn w-1/2" onClick={() => setStep(1)}>
                      Next
                    </button>
                  </div>
                </div>
              </AnimatedLayout>
            )}
            {step === 1 && (
              <AnimatedLayout key="mint">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col ">
                    <label className="label">
                      <span className="label-text">Collection type</span>
                    </label>
                    <div className="flex flex-row gap-2">
                      <button
                        className={`btn ${type === 0 ? "" : "btn-ghost"}`}
                        onClick={() => setType(0)}
                      >
                        Edition
                      </button>
                      <button
                        className={`btn ${type === 1 ? "" : "btn-ghost"}`}
                        onClick={() => setType(1)}
                      >
                        Drop
                      </button>
                    </div>
                    {type === 0 ? (
                      <div>
                        An edition is a collection of NFTs that have the same
                        traits and they unlimited supply. They are only limited
                        by the end time.
                      </div>
                    ) : (
                      <div>
                        A drop is a collection of NFTs that are all different.
                        They have a limited supply but they are not limited by
                        the end time.
                      </div>
                    )}
                  </div>
                  {type === 1 ? (
                    <div className="flex flex-col ">
                      <label className="label">
                        <span className="label-text">Max supply</span>
                      </label>
                      <div className="flex flex-row gap-2">
                        {maxSupplyOptions.map((option) => (
                          <button
                            key={option.value}
                            className={`btn ${
                              maxSupply === option.value ? "" : "btn-ghost"
                            }`}
                            onClick={() => setMaxSupply(option.value)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col ">
                      <label className="label">
                        <span className="label-text">End time</span>
                      </label>
                      <div className="flex flex-row gap-2">
                        {endTimeOptions.map((option) => (
                          <button
                            key={option.value}
                            className={`btn ${
                              endTime === option.value ? "" : "btn-ghost"
                            }`}
                            onClick={() => setEndTime(option.value)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <label className="label">
                      <span className="label-text">Mint price</span>
                    </label>
                    <div className="flex flex-row gap-2">
                      {mintPriceOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`btn ${
                            mintPrice === option.value ? "" : "btn-ghost"
                          }`}
                          onClick={() => setMintPrice(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row justify-between w-full gap-4">
                    <button
                      className="btn btn-ghost w-1/2"
                      onClick={() => setStep(0)}
                    >
                      Back
                    </button>
                    <button className="btn w-1/2" onClick={() => setStep(2)}>
                      Next
                    </button>
                  </div>
                </div>
              </AnimatedLayout>
            )}
            {step === 2 && (
              <AnimatedLayout key="preview">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col ">
                    <div className="flex flex-col">
                      <label className="label">
                        <span className="label-text">Upload Artwork</span>
                      </label>
                      {type === 1 ? (
                        <div className="flex flex-row items-center">
                          <input
                            type="file"
                            className="file-input w-full max-w-xs"
                            onChange={async (e) => {
                              const allFiles = [
                                ...(e.target.files as any),
                              ].filter((f) => f.type === "image/png");
                              const fileList: File[] = [];
                              allFiles.forEach((f) => {
                                fileList.push(
                                  new File(
                                    [f],
                                    f.webkitRelativePath
                                      .split("/")
                                      .splice(1)
                                      .join("/")
                                  )
                                );
                              });
                              console.log({
                                fileList,
                                allFiles,
                              });
                              if (!fileList) return;
                              setUploading(true);
                              const res = await uploadFolder(fileList);
                              console.log(res);
                              setCid(res);
                              const img = await generateImage(res, name);
                              console.log({ img });
                              setGeneratedImage(img.url);
                              setUploading(false);
                            }}
                            {...otherAtt}
                          />
                          {uploading && (
                            <AiOutlineLoading className="ml-2 animate-spin" />
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-row items-center">
                          <input
                            type="file"
                            accept=".png"
                            className="file-input w-full max-w-xs"
                            onChange={async (e) => {
                              const allFiles = [
                                ...(e.target.files as any),
                              ].filter((f) => f.type === "image/png");
                              const fileList: File[] = [];
                              allFiles.forEach((f) => {
                                fileList.push(
                                  new File(
                                    [f],
                                    f.webkitRelativePath
                                      .split("/")
                                      .splice(1)
                                      .join("/")
                                  )
                                );
                              });
                              console.log({
                                fileList,
                                allFiles,
                              });
                              if (!fileList) return;
                              setUploading(true);
                              const res = await uploadFolder(fileList);
                              console.log(res);
                              setCid(res);
                              const img = await generateImage(res, name);
                              console.log({ img });
                              setGeneratedImage(img.url);
                              setUploading(false);
                            }}
                          />
                          {uploading && (
                            <AiOutlineLoading className="ml-2 animate-spin" />
                          )}
                        </div>
                      )}
                      {type === 1 ? (
                        <div>
                          Upload a folder containing your layers. It should be
                          512x512 png images with size less than 10kb.
                        </div>
                      ) : (
                        <div>
                          Upload a folder containing a single folder which
                          contains a single image. It should be 512x512 png with
                          size less than 10kb.
                        </div>
                      )}
                      <div className="flex flex-col gap-4 items-center w-full my-4">
                        {generatedImage && (
                          <img src={generatedImage} className="w-48 h-48" />
                        )}
                        {type === 1 && (
                          <button
                            className={`btn btn-ghost ${
                              uploading ? "loading" : ""
                            }`}
                            onClick={async () => {
                              setUploading(true);
                              const fileName = name + ".png";
                              const img = await generateImage(cid, fileName);
                              console.log({ img });
                              setGeneratedImage(img.url);
                              setThumbnail(img.thumbnail);
                              setUploading(false);
                            }}
                          >
                            preview another image
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between w-full gap-4">
                    <button
                      className="btn btn-ghost w-1/2"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button
                      className={`btn w-1/2`}
                      onClick={async () => {
                        // setStep(3);
                        const res = await fetch("/api/collection", {
                          method: "POST",
                          body: JSON.stringify({
                            name,
                            description,
                            website,
                            type,
                            maxSupply,
                            cid,
                            mintPriceSats: mintPrice * 100000000,
                            endTime: Date.now() + endTime * 24 * 60 * 60 * 1000,
                            createdBy: user?.id,
                            thumbnail,
                          }),
                        });
                        const data = await res.json();
                        console.log({ data });
                        handleClose();
                      }}
                    >
                      Create collection
                    </button>
                  </div>
                </div>
              </AnimatedLayout>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
