import { getUser } from "@/api/AuthAPI";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();
    const logout = useStore(state => state.logout);

    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isError) {
        logout();
        navigate('/login');
    }
    return { data, isError, isLoading }
}