
import RouterList from "../../root/RouterList";
import Sidebar from "../Sidebar/Sidebar";

export default function NavbarDashboard() {
  return (
    <div className="flex flex-col w-full h-full border border-green-500">
      {
        localStorage.getItem("DressmeUserToken") ?
          <div className="relative w-full h-full flex justify-between">
            <Sidebar />
            <div className="w-full md:w-[calc(100%-300px)] h-full md:ml-[300px]">
              <RouterList />
            </div>
          </div>
          :
          <div className="w-full h-full border border-red-500">
            <RouterList />
          </div>
      }
    </div>
  );
}
