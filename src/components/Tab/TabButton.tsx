import React from "react";

interface TabButtonProps {
    showContentFn: React.Dispatch<React.SetStateAction<number>>;
    title: string;
    page: number;
    isActive: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ showContentFn, title, page, isActive }) => {
    return (
        <button
            onClick={() => showContentFn(page)}
            className={`px-6 py-3 rounded-lg font-semibold shadow transition-colors
                ${isActive 
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-blue-500 hover:text-white"
                }`}
        >
            {title}
        </button>
    );
};

export default TabButton;