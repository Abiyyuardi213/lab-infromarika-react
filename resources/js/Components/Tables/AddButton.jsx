import React from "react";
import { Button } from "@material-tailwind/react";

const AddButton = ({
    label,
    icon: Icon,
    onClick,
    className = "",
    size = "sm",
}) => {
    return (
        <Button
            className={`flex items-center gap-3 ${className}`}
            size={size}
            onClick={onClick}
        >
            {Icon && <Icon strokeWidth={2} className="h-4 w-4" />}
            <span className="sm:hidden md:block">{label}</span>
        </Button>
    );
};

export default AddButton;
