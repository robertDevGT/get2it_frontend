import { getUser } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isError) {
        localStorage.removeItem('AUTH_TOKEN');
        navigate('/login');
        enqueueSnackbar('Sesión expirada', {
            autoHideDuration: 3000,
            variant: "error"
        });
    }
    return { data, isError, isLoading }
}