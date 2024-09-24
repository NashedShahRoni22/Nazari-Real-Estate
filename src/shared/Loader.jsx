import React from "react";
import { SyncLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <SyncLoader
        color={"#e65100"}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
