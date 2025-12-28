import React from "react";
import profilePic from "../../assets/images/profile.jpg";

const NameComponent: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={profilePic}
        alt="Profile"
        className="w-18 h-16 rounded-full border-4 border-white dark:border-gray-900"
      />
      <span className="text-3xl font-bold text-white dark:text-gray-900">Guy Green</span>
    </div>
  );
};

export default NameComponent;
