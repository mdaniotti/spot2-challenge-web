import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const LayoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet />
    </div>
  );
};

export default LayoutPage;
