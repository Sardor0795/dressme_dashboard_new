
import RouterList from "../../root/RouterList";
import Sidebar from "../Sidebar/Sidebar";

export default function NavbarDashboard() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="relative w-full h-full border borde-red-500 flex justify-between">
        <Sidebar />
        <div className="w-full md:w-[calc(100%-300px)] h-full md:ml-[300px]">
          <RouterList />
        </div>
      </div>
    </div>
  );
}
