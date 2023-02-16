import React from "react";

type Props = {
  tabSelected: number;
  setTabSelected: (tab: number) => void;
};

export default function Tabs({ tabSelected, setTabSelected }: Props) {
  return (
    <div className="w-full border-b border-zinc-800">
      <div className="flex flex-row gap-12 font-mono">
        <a
          className={`text-xl py-4 font-bold ${
            tabSelected === 0 ? "border-b-0" : "tab p-0"
          }`}
          onClick={() => setTabSelected(0)}
        >
          Minting now
        </a>
        {/* <a
          className={`text-xl py-4 font-bold ${
            tabSelected === 1 ? "border-b-2" : "tab p-0"
          }`}
          onClick={() => setTabSelected(1)}
        >
          Trading
        </a> */}
        <a
          className={`text-xl py-4 font-bold ${
            tabSelected === 1 ? "border-b-0" : "tab p-0"
          }`}
          onClick={() => setTabSelected(1)}
        >
          My collections
        </a>
        <a
          className={`text-xl py-4 font-bold ${
            tabSelected === 2 ? "border-b-0" : "tab p-0"
          }`}
          onClick={() => setTabSelected(2)}
        >
          My Inscriptions
        </a>
      </div>
    </div>
  );
}
