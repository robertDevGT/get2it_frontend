import { checkProjectManager } from "@/api/ProjectsAPI";
import { Collaborator } from "@/types/collaboratorTypes";
import { Project } from "@/types/projectTypes";
import { useQuery } from "@tanstack/react-query";

export const useAuthorization = ({ projectId, userId, enabled}: { projectId: Project['id'], userId: Collaborator['id'], enabled: boolean }) => {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['useAuthorization', projectId, userId],
        queryFn: () => checkProjectManager({ projectId, userId }),
        retry: false,
        refetchOnWindowFocus: false,
        enabled
    });
    return { data, isError, isLoading }
}