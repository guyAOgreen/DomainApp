import React from "react";
import { profileImageUrl } from "../../constants/assetConstants";

const NameComponent: React.FC = () => {
  const [portraitFailed, setPortraitFailed] = React.useState(false);

  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-4">
      <div
        aria-hidden="true"
        className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-4 border-white dark:border-gray-900 sm:h-16 sm:w-18"
      >
        {portraitFailed ? (
          <span className="flex h-full w-full items-center justify-center bg-gray-700 font-bold text-white dark:bg-gray-200 dark:text-gray-900">
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
      <span className="truncate text-xl font-bold text-white dark:text-gray-900 sm:text-3xl">
        Guy Green
      </span>
    </div>
  );
};

export default NameComponent;
