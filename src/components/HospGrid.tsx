"use client";

import { search } from "@/lib/actions";
import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

type Hosp = {
  hosP_NAME: string;
  hosptel: string;
  hosP_CNT_TYPE: string;
  hosP_ADDR: string;
  hosP_ID: string;
};

const HospGrid = ({ user }: { user: User | null }) => {
  const [hosps, setHosps] = useState<Hosp[] | null>(null);
  return (
    <div>
      <div className="flex items-start space-x-4">
        <div className="min-w-0 flex-1">
          <form
            action={async (formData) => {
              const { data, error } = await search(formData, "/");
              if (error) alert(error);
              setHosps(data || []);
            }}
            className="relative"
          >
            <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <label htmlFor="question" className="sr-only">
                You can ask your question here
              </label>
              <textarea
                rows={3}
                name="question"
                id="question"
                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={`Hello you can ask your question here`}
                defaultValue={""}
              />

              {/* Spacer element to match the height of the toolbar */}
              <div className="py-2" aria-hidden="true">
                {/* Matches height of button in toolbar (1px border + 36px content height) */}
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              <div className="flex items-center space-x-5"></div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Ask
                </button>
              </div>
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
