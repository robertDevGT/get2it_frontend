import { NavLink } from "react-router-dom";

type Props = {
    url: string;
    text: string;
    children: React.ReactNode
}

export default function NavLinkComponent({ url, children, text }: Props) {
    return (
        <NavLink
            to={url}
            className={({ isActive }) =>
                `flex items-center gap-2 transition-colors w-full p-2 ${isActive ? "text-gray-500" : "hover:text-gray-700"
                }`
            }
        >
            {children}
            <p className="text-xs font-bold">{text}</p>
        </NavLink>
    )
}
