import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Inscription } from "../..";
import { userAtom } from "../../pages";
import { timeSince, trimBtcAddress } from "../constants/utils";

type Props = {};

export default function myInscriptions({}: Props) {
  const [user] = useAtom(userAtom);
  const [myInscriptions, setMyInscriptions] = useState<Inscription[]>([]);
  useEffect(() => {
    if (user) {
      (async () => {
        const res = await (
          await fetch(`/api/inscription?userId=${user.id}`)
        ).json();
        console.log({ res });
        setMyInscriptions(res);
      })();
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-6">
        {myInscriptions.map((i) => (
          <div key={i.id}>
            <img src={i.image} className="h-40 rounded-xl" />
            <div className="text-gray-500 font-bold">{i.status}</div>
            <div className="text-xs">
              {timeSince(new Date(i.created_at))} ago
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
