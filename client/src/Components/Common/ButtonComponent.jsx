import React from 'react'
import { twMerge } from 'tailwind-merge';
import { cva } from "class-variance-authority";
import clsx from 'clsx';


const ButtonComponent = ({children,className,variant,size,...props}) => {
  return (
    
      <button {...props} className={twMerge(clsx(buttonVariants({variant,size,className})))}>{children}</button>
   
  )
}

const buttonVariants = cva(["font-semibold", "border-2", "rounded-md","flex","gap-1","items-center","justify-center","mt-2"], {
    variants: {
      variant: {
        primary: [
          "bg-blue-500",
          "text-white",
          "border-transparent",
          "hover:bg-blue-600",
          "px-5 ","py-2.5","mb-2","font-medium", "rounded-lg","text-sm"
        ],
        // **or**
        // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
        secondary: [
          "bg-white",
          "text-gray-800",
          "border-gray-400",
          "hover:bg-gray-100",
        ],
        danger:["focus:outline-none text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-4"],
      },
    },
    
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  });

export default ButtonComponent
