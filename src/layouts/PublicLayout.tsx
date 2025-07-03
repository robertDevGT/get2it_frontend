import { Outlet } from "react-router-dom"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="mt-10">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}
