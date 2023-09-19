"use client";

import { useChat } from "ai/react";
import { Button } from "./ui/button";

const Consult = ({ user }: { user: User | undefined }) => {
  const { messages, input, isLoading, handleInputChange, handleSubmit } =
    useChat();

  return (
    <div>
      <div className="flex items-start space-x-4">
        <div className="min-w-0 flex-1">
          <form
            className="relative"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <label htmlFor="question" className="sr-only">
                Ask your question here
              </label>
              <textarea
                rows={3}
                name="question"
                id="question"
                value={input}
                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={`You can ask me anything?`}
                onChange={handleInputChange}
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
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Asking..." : "Ask"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="whitespace-pre-wrap my-6">
        {messages.map((m) => (
          <div key={m.id}>
            {m.role === "user" ? `${user?.displayName}: ` : "Psyduck: "}
            {m.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consult;
