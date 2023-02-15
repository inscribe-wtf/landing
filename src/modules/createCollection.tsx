import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import AnimatedLayout from "../components/animatedLayout";
import { convertBase64, uploadFolder } from "../services/upload";
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

  const [fileList, setFileList] = useState<File[]>();
  const [uploading, setUploading] = useState(false);

  const [artworkBaseUri, setArtworkBaseUri] = useState("");

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
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
                        <button
                          className={`btn ${
                            maxSupply === 555 ? "" : "btn-ghost"
                          }`}
                          onClick={() => setMaxSupply(555)}
                        >
                          555
                        </button>
                        <button
                          className={`btn ${
                            maxSupply === 777 ? "" : "btn-ghost"
                          }`}
                          onClick={() => setMaxSupply(777)}
                        >
                          777
                        </button>
                        <button
                          className={`btn ${
                            maxSupply === 1111 ? "" : "btn-ghost"
                          }`}
                          onClick={() => setMaxSupply(1111)}
                        >
                          1111
                        </button>
                        <button
                          className={`btn ${
                            maxSupply === 2222 ? "" : "btn-ghost"
                          }`}
                          onClick={() => setMaxSupply(2222)}
                        >
                          2222
                        </button>
                        <button
                          className={`btn ${
                            maxSupply === 4200 ? "" : "btn-ghost"
                          }`}
                          onClick={() => setMaxSupply(4200)}
                        >
                          4200
                        </button>
                        <button
                          className={`btn ${
                            maxSupply === 5555 ? "" : "btn-ghost"
                          }`}
                          onClick={() => setMaxSupply(5555)}
                        >
                          5555
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col ">
                      <label className="label">
                        <span className="label-text">End time</span>
                      </label>
                      <div className="flex flex-row gap-2">
                        <button
                          className={`btn ${endTime === 1 ? "" : "btn-ghost"}`}
                          onClick={() => setEndTime(1)}
                        >
                          1 day
                        </button>
                        <button
                          className={`btn ${endTime === 2 ? "" : "btn-ghost"}`}
                          onClick={() => setEndTime(2)}
                        >
                          2 days
                        </button>
                        <button
                          className={`btn ${endTime === 3 ? "" : "btn-ghost"}`}
                          onClick={() => setEndTime(3)}
                        >
                          3 days
                        </button>
                        <button
                          className={`btn ${endTime === 5 ? "" : "btn-ghost"}`}
                          onClick={() => setEndTime(5)}
                        >
                          5 days
                        </button>
                        <button
                          className={`btn ${endTime === 7 ? "" : "btn-ghost"}`}
                          onClick={() => setEndTime(7)}
                        >
                          7 days
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <label className="label">
                      <span className="label-text">Mint price</span>
                    </label>
                    <div className="flex flex-row gap-2">
                      <button
                        className={`btn ${
                          mintPrice === 0.0021 ? "" : "btn-ghost"
                        }`}
                        onClick={() => setMintPrice(0.0021)}
                      >
                        0.0021 BTC
                      </button>
                      <button
                        className={`btn ${
                          mintPrice === 0.0042 ? "" : "btn-ghost"
                        }`}
                        onClick={() => setMintPrice(0.0042)}
                      >
                        0.0042 BTC
                      </button>
                      <button
                        className={`btn ${
                          mintPrice === 0.0069 ? "" : "btn-ghost"
                        }`}
                        onClick={() => setMintPrice(0.0069)}
                      >
                        0.0069 BTC
                      </button>
                      <button
                        className={`btn ${
                          mintPrice === 0.01 ? "" : "btn-ghost"
                        }`}
                        onClick={() => setMintPrice(0.01)}
                      >
                        0.01 BTC
                      </button>
                      <button
                        className={`btn ${
                          mintPrice === 0.02 ? "" : "btn-ghost"
                        }`}
                        onClick={() => setMintPrice(0.02)}
                      >
                        Free
                      </button>
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
                      <div className="flex flex-row">
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
                            setFileList(fileList);
                          }}
                          {...otherAtt}
                        />
                        {/* {progress && (
                          <div
                            className="radial-progress"
                            // @ts-ignore
                            style={{ "--value": progress }}
                          >
                            {progress}%
                          </div>
                        )} */}
                      </div>
                      <div>
                        Upload a folder containing your layers. It should be
                        512x512 png images.
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
                      className={`btn w-1/2 ${uploading ? "loading" : ""}`}
                      onClick={async () => {
                        if (!fileList) return;
                        setUploading(true);
                        const res = await uploadFolder(fileList);
                        console.log(res);
                        setArtworkBaseUri(res);
                        setUploading(false);
                        setStep(3);
                      }}
                    >
                      Next
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
