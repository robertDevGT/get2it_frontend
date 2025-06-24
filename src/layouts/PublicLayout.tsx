import { Outlet } from "react-router-dom"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

export default function PublicLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="py-10 lg:py-20 mx-auto">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}
