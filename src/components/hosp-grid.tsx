"use client";

import { search } from "@/lib/actions";
import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import SearchButton from "./ui/search-button";
import { PATHNAME_HOME } from "@/lib/constants";
import FirebaseAnalytics from "@/lib/firebase-analytics";
import { Input } from "./ui/input";

type Hosp = {
  hosP_NAME: string;
  hosptel: string;
  hosP_CNT_TYPE: string;
  hosP_ADDR: string;
  hosP_ID: string;
};

const HospGrid = () => {
  const [hosps, setHosps] = useState<Hosp[]>();

  const searchAction = async (formData: FormData) => {
    const { data, error } = await search(formData, PATHNAME_HOME);
    FirebaseAnalytics.getInstance().logHospSearch();
    if (error) {
      alert(error);
      return;
    }
    setHosps(data || []);
  };

  return (
    <div>
      <div className="flex items-start space-x-4">
        <div className="min-w-0 flex-1">
          <form action={searchAction}>
            <div className="flex">
              <label htmlFor="question" className="sr-only">
                You can ask your question here
              </label>
              <Input
                name="question"
                id="question"
                className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-2"
                placeholder="Search hospitals in Taiwan by name"
                defaultValue=""
              />
              <SearchButton />
            </div>
          </form>
        </div>
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        {hosps?.length === 0 && (
          <div className="relative flex justify-between gap-x-6 py-5">
            No results found
          </div>
        )}
        {hosps?.map((hosp) => (
          <li
            key={hosp.hosP_ID}
            className="relative flex justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  <div>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {hosp.hosP_NAME} <span className="">({hosp.hosptel})</span>
                  </div>
                </div>
                <div className="mt-1 flex text-xs leading-5 text-gray-500">
                  <div className="relative truncate hover:underline">
                    {hosp.hosP_ADDR}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <div className="text-sm leading-6 text-gray-900">
                  {hosp.hosP_CNT_TYPE}
                </div>
                <div className="mt-1 text-xs leading-5 text-gray-500">
                  {hosp.hosP_ID}
                </div>
              </div>
              <ChevronRightIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospGrid;
