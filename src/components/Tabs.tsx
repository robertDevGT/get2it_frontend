import { useState } from "react";
import { Link } from "react-router-dom";

export default function Tabs() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="border p-2 border-gray-300 rounded shadow cursor-pointer"
            >
                <p className="font-medium">Menu</p>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-400 rounded-lg shadow-lg z-50 p-5 flex flex-col gap-2">
                    <Link to={'/profile'} className="hover:bg-gray-100 p-1 transition-colors rounded">
                        <p>Perfil</p>
                    </Link>

                    <Link to={'/dashboard'} className="hover:bg-gray-100 p-1 transition-colors rounded">
                        Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
}
