import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineCopy,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import QRCode from "react-qr-code";
import { Collection } from "../..";
import { userAtom } from "../../pages";
import AnimatedLayout from "../components/animatedLayout";
import { mintOptions } from "../constants/constants";

type Props = {
  handleClose: () => void;
  collection: Collection;
};
export default function Mint({ handleClose, collection }: Props) {
  const [fee, setFee] = useState("medium");
  const [step, setStep] = useState(0);
  const [paymentRequest, setPaymentRequest] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [inscriptionId, setInscriptionId] = useState("");
  const [countdown, setCountdown] = useState(80);
  const [invoiceExpired, setInvoiceExpired] = useState(false);
  const [inscribRes, setInscribRes] = useState<{
    txnIds: string[];
    images: string[];
  }>();

  const [user] = useAtom(userAtom);

  const fetchInvoiceStatus = async (paymentRequest: string) => {
    console.log({ paymentRequest });
    if (!paymentRequest) return;
    const res = await (
      await fetch(`/api/paymentRequest?paymentRequest=${paymentRequest}`)
    ).json();
    console.log({ res });
    console.log({ res: res.status === "PAID" });
    return res.status === "PAID";
  };

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
          <div className="flex flex-row justify-between -mb-8">
            <div className="text-4xl font-bold"></div>
            <button className="btn btn-ghost" onClick={handleClose}>
              <AiOutlineClose size={24} />
            </button>
          </div>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <AnimatedLayout key="address">
                <div className="flex flex-col gap-4">
                  <div className="font-bold text-gray-500 mt-1">
                    Receiver Address
                  </div>
                  <input
                    type="text"
                    placeholder="Your bitcoin address"
                    className="input w-full max-w-xs"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <button
                    className="btn w-48"
                    onClick={async () => {
                      setStep(1);
                    }}
                  >
                    Continue
                  </button>
                </div>
              </AnimatedLayout>
            )}
            {step === 1 && (
              <AnimatedLayout key="fee">
                <div className="flex flex-col gap-4">
                  <div className="font-bold text-gray-500 mt-1">Choose fee</div>
                  <div className="flex flex -row items-center">
                    <div className="flex flex-col w-1/3 items-center">
                      <input
                        type="radio"
                        name="radio-2"
                        className="radio radio-primary"
                        checked={fee === "low"}
                        onChange={() => setFee("low")}
                      />
                      <div>Low</div>
                    </div>
                    <div className="flex flex-col w-1/3 items-center">
                      <input
                        type="radio"
                        name="radio-2"
                        className="radio radio-primary"
                        checked={fee === "medium"}
                        onChange={() => setFee("medium")}
                      />
                      <div>Medium</div>
                    </div>
                    <div className="flex flex-col w-1/3 items-center">
                      <input
                        type="radio"
                        name="radio-2"
                        className="radio radio-primary"
                        checked={fee === "high"}
                        onChange={() => setFee("high")}
                      />
                      <div>High</div>
                    </div>
                  </div>

                  {fee === "low" && (
                    <div className="text-sm text-gray-500">
                      Warning: with low fee there is a chance that your
                      transaction might not be included in the next block.
                    </div>
                  )}
                  <div className="flex flex-row">
                    <button
                      className="btn btn-ghost w-48"
                      onClick={() => setStep(0)}
                    >
                      Back
                    </button>
                    <button
                      className={`btn w-48 ${loading ? "loading" : ""}`}
                      onClick={async () => {
                        setLoading(true);
                        const res = await (
                          await fetch("/api/paymentRequest", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              mints: 2,
                              amount: 2,
                              address,
                              collectionId: collection.id,
                              userId: user?.id,
                            }),
                          })
                        ).json();
                        console.log({ res });
                        setLoading(false);
                        setPaymentRequest(res.paymentRequest);
                        setStep(2);
                        const countdownInterval = setInterval(() => {
                          setCountdown((c) => {
                            if (c === 0) {
                              clearInterval(countdownInterval);
                              setInvoiceExpired(true);
                            }
                            return c - 1;
                          });
                        }, 1000);
                        const paidInterval = setInterval(async () => {
                          const paid = await fetchInvoiceStatus(
                            res.paymentRequest
                          );
                          if (paid) {
                            clearInterval(paidInterval);
                            setPaid(true);
                            (async () => {
                              setLoading(true);
                              const resp = await (
                                await fetch("/api/inscription", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    paymentRequest: res.paymentRequest,
                                    userId: user?.id,
                                  }),
                                })
                              ).json();
                              setLoading(false);
                              console.log({ resp });
                              setInscribRes(resp);
                            })();
                            setStep(3);
                          }
                          if (invoiceExpired) {
                            clearInterval(paidInterval);
                          }
                        }, 10000);
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </AnimatedLayout>
            )}
            {step === 2 && (
              <AnimatedLayout key="pay">
                <div className="flex flex-col gap-4">
                  <div className="font-bold text-gray-500 mt-1">
                    Send payment on lightning
                  </div>
                  <button
                    className="btn w-48 btn-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(paymentRequest);
                    }}
                  >
                    <AiOutlineCopy size={24} />
                    Copy invoice
                  </button>
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={paymentRequest}
                    viewBox={`0 0 256 256`}
                  />
                  {!invoiceExpired && (
                    <span className="countdown">
                      {/** @ts-ignore */}
                      <span style={{ "--value": countdown }} /> seconds left
                    </span>
                  )}
                  {invoiceExpired && (
                    <div className="text-red-500">
                      Invoice expired, please try again
                    </div>
                  )}
                </div>
              </AnimatedLayout>
            )}
            {step === 3 && (
              <AnimatedLayout key="final">
                <div>
                  {loading && (
                    <div className="flex flex-col gap-4">
                      <div className="font-bold text-gray-500 mt-1">
                        Inscription in Progress, please wait
                      </div>
                      <AiOutlineLoading3Quarters
                        size={64}
                        className="animate-spin"
                      />
                    </div>
                  )}
                  {!loading && (
                    <div className="flex flex-col gap-4">
                      <div className="font-bold text-gray-500 mt-1">
                        You will receive the inscriptions when the transaction
                        is mined
                      </div>
                      {inscribRes &&
                        inscribRes.txnIds.map((txId, i) => (
                          <div key={i}>
                            <div className="font-bold text-gray-500 mt-1">
                              Transaction {i + 1}
                            </div>
                            <div className="text-sm text-gray-500">
                              <a
                                href={`https://blockstream.info/tx/${txId}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {txId}
                              </a>
                            </div>
                            <img src={inscribRes.images[i]} className="w-48" />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </AnimatedLayout>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
