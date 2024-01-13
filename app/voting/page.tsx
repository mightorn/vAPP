/* eslint-disable react/jsx-key */
"use client";
import { useContractRead } from "wagmi";
import abi from "../../contracts/abi/votingFactoryAbi.json";
import { useState } from "react";
import Link from "next/link";
import { contractAddress } from "../../data/constants";
const Voting = () => {
  const [res, setRes] = useState<Voting[]>([]);
  useContractRead({
    address: contractAddress,
    abi: abi,
    onSuccess: (data: Voting[]) => {
      setRes(data);
    },
    functionName: "getVotingContracts",
    args: [],
    enabled: true,
  });
  return (
    <div>
      <div className=" py-6 sm:py-8 lg:py-12">
        <div className="mx-auto overflow-x-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-800 p-4 sm:flex-row md:p-8">
            <div>
              <h2 className="text-xl font-bold text-indigo-500 md:text-2xl">
                Votings
              </h2>
              <p className="text-gray-100">Onchain Votings</p>
            </div>

            <Link
              href="/voting/new"
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Add Voting
            </Link>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto mx-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-white">
              <th scope="col" className="px-6 py-3">
                Identifier
              </th>
              <th scope="col" className="px-6 py-3">
                Voting name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Owner
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="text-white">
            {res.map((Voting: Voting) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {Voting.votingIdentifier}
                  </th>
                  <td className="px-6 py-4">{Voting.name}</td>
                  <td className="px-6 py-4">{Voting.description}</td>
                  <td className="px-6 py-4">{Voting.owner}</td>
                  <td className="px-6 py-4">
                    {Voting.votingStatus.toString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href="/voting/vote"
                      className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                    >
                      Vote
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Voting;
