import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PublicLayout from "@/layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";

const Index = lazy(() => import("@/views/public/Index"));
const Profile = lazy(() => import("@/views/public/Profile"));

const Login = lazy(() => import("@/views/auth/Login"));
const Register = lazy(() => import("@/views/auth/Register"));
const ConfirmAccount = lazy(() => import("@/views/auth/ConfirmAccount"));

const IndexDashboard = lazy(() => import("@/views/dashboard/IndexDashboard"));

const IndexProjects = lazy(() => import("@/views/projects/IndexProjects"));

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
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route element={<AuthLayout />}>
                        <Route path="/dashboard" element={<IndexDashboard />} />
                        <Route path="/projects" element={<IndexProjects />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}