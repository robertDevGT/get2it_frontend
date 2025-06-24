import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PublicLayout from "@/layouts/PublicLayout";
import Login from "./views/auth/Login";

const Index = lazy(() => import("@/views/public/Index"));

export default function Router() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Index />} index />
                        <Route path="/login" element={<Login />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}