import React from "react";
import { profileImageUrl } from "../../constants/assetConstants";

const NameComponent: React.FC = () => {
  const [portraitFailed, setPortraitFailed] = React.useState(false);

  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-4">
      <div
        aria-hidden="true"
        className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gray-500 sm:h-16 sm:w-16"
      >
        {portraitFailed ? (
          <span className="flex h-full w-full items-center justify-center bg-gray-700 font-bold text-white">
            GG
          </span>
        ) : (
          <img
            src={profileImageUrl}
            alt=""
            onError={() => setPortraitFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <span className="truncate text-xl font-bold text-white sm:text-3xl">Guy Green</span>
    </div>
  );
};

export default NameComponent;
