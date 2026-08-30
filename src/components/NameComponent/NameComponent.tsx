import React from "react";
import profilePic from "../../assets/images/profile.jpg";

const NameComponent: React.FC = () => {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-4">
      <img
        src={profilePic}
        alt=""
        className="h-12 w-12 shrink-0 rounded-full border-4 border-white object-cover dark:border-gray-900 sm:h-16 sm:w-18"
      />
      <span className="truncate text-xl font-bold text-white dark:text-gray-900 sm:text-3xl">
        Guy Green
      </span>
    </div>
  );
};

export default NameComponent;
