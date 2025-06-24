import React from "react";

export default function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="border-l-8 my-4 bg-red-100 text-red-600 p-3  font-medium text-xs uppercase">
        {children}
    </div>
  )
}
