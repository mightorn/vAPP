/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import abi from "../../../contracts/abi/votingAbi.json";
import { useEffect, useState } from "react";
import Link from "next/link";

const votePage = () => {
  const contractAddress = "0x0944764f4CBf06170620FC633240BaCF46f57fBE";
  const [res, setRes] = useState([]);
  const [voteOption, setVoteOption] = useState("");

  useContractRead({
    address: contractAddress,
    abi: abi,
    onSuccess: (data) => {
      setRes(data);
    },
    functionName: "getCandidates",
    args: [],
    enabled: true,
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "vote",
    args: [voteOption.toString()],
  });
  const { data, isLoading, isSuccess, write, error } = useContractWrite(config);

  const buttonOnClick = (candidateName) => {
    setVoteOption(candidateName);
    if (write) {
      write();
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 place-content-evenly">
      {res.map((data) => {
        return (
          <div className="p-6 flex justify-center items-center" key={data}>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h1 className=".name mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data}
              </h1>
              <button
                value={data}
                onClick={() => buttonOnClick(data)}
                className="block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
              >
                Vote
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default votePage;
