import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PublicLayout from "@/layouts/PublicLayout";

const Index = lazy(() => import("@/views/public/Index"));

import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";

export default function Router() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Index />} index />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}