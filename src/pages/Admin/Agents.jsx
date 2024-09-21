import React, { useState } from "react";
import AgentList from "./AgentList";
import AddAgent from "./AddAgent";

export default function Agents() {
  const [view, setView] = useState(true);
  return (
    <section className="p-6 md:p-12">
      <div className="flex justify-end mb-10">
        {view ? (
          <button
            onClick={() => setView(false)}
            className="px-4 py-2 bg-primary text-white w-fit shadow rounded"
          >
            Add Agent
          </button>
        ) : (
          <button
            onClick={() => setView(true)}
            className="px-4 py-2 bg-primary text-white w-fit shadow rounded"
          >
            Agent List
          </button>
        )}
      </div>
      {view ? <AgentList /> : <AddAgent />}
    </section>
  );
}
