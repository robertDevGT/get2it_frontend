import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PublicLayout from "@/layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";

const Index = lazy(() => import("@/views/public/Index"));
const Profile = lazy(() => import("@/views/public/Profile"));

const Login = lazy(() => import("@/views/auth/Login"));
const Register = lazy(() => import("@/views/auth/Register"));
const ConfirmAccount = lazy(() => import("@/views/auth/ConfirmAccount"));


const IndexProjects = lazy(() => import("@/views/projects/IndexProjects"));
const ProjectDetails = lazy(() => import("@/views/projects/ProjectDetails"));
const CreateProject = lazy(() => import("@/views/projects/CreateProject"));
const ProjectTeam = lazy(() => import("@/views/projects/ProjectTeam"));
const EditProject = lazy(() => import("@/views/projects/EditProject"));
const ProjectStadisticsView = lazy(() => import("@/views/projects/ProjectStadisticsView"));

export default function Router() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Index />} index />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/confirm-account" element={<ConfirmAccount />} />
                    </Route>

                    <Route element={<AuthLayout />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/projects" element={<IndexProjects />} />
                        <Route path="/projects/create" element={<CreateProject />} />
                        <Route path="/projects/:projectId" element={<ProjectDetails />} />
                        <Route path="/projects/:projectId/edit" element={<EditProject />} />
                        <Route path="/projects/team/:projectId" element={<ProjectTeam />} />
                        <Route path="/projects/stadistics/:projectId" element={<ProjectStadisticsView />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}