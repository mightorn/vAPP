"use client";
import { contractAddress } from "@/data/constants";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import abi from "../../../contracts/abi/votingFactoryAbi.json";
import { useEffect, useState } from "react";
import { error } from "console";
import { useRouter } from "next/navigation";

const AddVotingPage = () => {
  const [res, setRes] = useState("");
  const [name, setVotingName] = useState("");
  const [description, setDescription] = useState("");
  const [candidates, setCandidates] = useState([]);
  const router = useRouter();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "createVoting",
    args: [name, description, candidates],
  });
  const { data, isLoading, isSuccess, write, error } = useContractWrite(config);

  useEffect(() => {
    if (data?.hash && !isLoading) {
      router.push("/voting");
    }
  }, [data, isLoading]);

  const buttonOnClick = () => {
    if (write) {
      write();
    }
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
          Add New Voting
        </h2>
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
          {error?.message}
        </h2>
        <div className="mx-auto max-w-lg rounded-lg border">
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label
                htmlFor="name"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Name
              </label>
              <input
                value={name}
                onChange={(event) => setVotingName(event.target.value)}
                type="text"
                name="name"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Description
              </label>
              <input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type="text"
                name="description"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="candidates"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Candidates
              </label>
              <input
                value={candidates}
                onChange={(event) =>
                  setCandidates(event.target.value.split(","))
                }
                type="text"
                name="candidates"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <div>{isSuccess ? "Saved succesfully" : error?.message}</div>

            <button
              onClick={buttonOnClick}
              className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVotingPage;
