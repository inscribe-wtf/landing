import React, { useState } from "react";
import AnimatedLayout from "../components/animatedLayout";

type Props = {};

export default function Explore({}: Props) {
  const [tab, setTab] = useState(0);
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
        <div className="flex flex-row gap-10 items-baseline">
          <div className="font-bold">1</div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <div className="font-bold text-xl">Kanojo-Hatano-Yui</div>
              <div className="text-sm text-zinc-700">45 minutes ago</div>
            </div>
            <div className="">589 mints last hr</div>
            <div className="flex flex-row gap-4">
              <img src="/placeholder.avif" className="w-24 h-24 object-cover" />
              <img src="/placeholder.avif" className="w-24 h-24 object-cover" />
              <img src="/placeholder.avif" className="w-24 h-24 object-cover" />
              <img src="/placeholder.avif" className="w-24 h-24 object-cover" />
              <img src="/placeholder.avif" className="w-24 h-24 object-cover" />
              <img src="/placeholder.avif" className="w-24 h-24 object-cover" />
            </div>
            <button className="btn w-48">Mint Now</button>
          </div>
        </div>
        <div className="flex flex-row gap-10">
          <div className="font-bold">2</div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <div className="font-bold text-xl">
                Checks - Valentine's Love Edition
              </div>
              <div className="text-sm text-zinc-700">9 hours ago</div>
            </div>
            <div className="">23 mints last hr</div>
            <div className="flex flex-row gap-4">
              <img src="/checks.svg" className="w-24 h-24 object-cover" />
              <img src="/checks.svg" className="w-24 h-24 object-cover" />
              <img src="/checks.svg" className="w-24 h-24 object-cover" />
              <img src="/checks.svg" className="w-24 h-24 object-cover" />
              <img src="/checks.svg" className="w-24 h-24 object-cover" />
              <img src="/checks.svg" className="w-24 h-24 object-cover" />
            </div>
            <button className="btn w-48">Mint Now</button>
          </div>
        </div>
        <div className="flex flex-row gap-10">
          <div className="font-bold">3</div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <div className="font-bold text-xl">Prince of Arkria Official</div>
              <div className="text-sm text-zinc-700">5 hours ago</div>
            </div>
            <div className="">111 mints last hr</div>
            <div className="flex flex-row gap-4">
              <img src="/thumbnail.png" className="w-24 h-24 object-cover" />
              <img src="/thumbnail.png" className="w-24 h-24 object-cover" />
              <img src="/thumbnail.png" className="w-24 h-24 object-cover" />
              <img src="/thumbnail.png" className="w-24 h-24 object-cover" />
              <img src="/thumbnail.png" className="w-24 h-24 object-cover" />
              <img src="/thumbnail.png" className="w-24 h-24 object-cover" />
            </div>
            <button className="btn w-48">Mint Now</button>
          </div>
        </div>
      </div>
    </AnimatedLayout>
  );
}
