import { getUser } from "@/api/AuthAPI";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
    const navigate = useNavigate();
    const logout = useStore(state => state.logout);
    const queryClient = useQueryClient();
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isError) {
        logout();
        navigate('/login');

        queryClient.invalidateQueries({ queryKey: ['user'] })
    }
    return { data, isError, isLoading }
}