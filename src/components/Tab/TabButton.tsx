
import React from "react";
import './TabButton.css';

interface TabButtonProps {
    showContentFn: React.Dispatch<React.SetStateAction<number>>;
    title: String;
    page: number;
    isActive: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ showContentFn, title, page, isActive }) => {
    return (
        <button
            onClick={() => showContentFn(page)}
            className={`tab-button ${isActive ? 'active': ''}`}
        >
            {title}
        </button>
    );

};

export default TabButton;