import logo from "../assets/logo.png";
import Client from "./Client";
import { useLocation ,useNavigate} from "react-router-dom";
import { Copy, LogOut } from "lucide-react";
import toast from "react-hot-toast";

function Navbar({ clients = [], roomID }) {
  const navigate=useNavigate(); 
  const location = useLocation();
  const showConnected = location.pathname.startsWith("/editor");

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(roomID);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Error copying Room ID, Try again later");
      console.log(err);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-full bg-[#121417] px-4 sm:px-6 py-2 flex items-center justify-between shadow-lg overflow-x-auto">
      <div className="flex  flex-row items-end gap-2 sm:gap-3 shrink-0 w-1/2 " >
        <img
          src={logo}
          alt="Logo"
          className="h-[40px] sm:h-[50px] object-contain flex self-start"
        />
        <span className="text-[10px] sm:text-md md:text-sm text-[#49de6f] font-medium sm:flex">
          Code Together. Build Better.
        </span>
      </div>

      {showConnected && (
        <div className="w-full sm:w-1/2 flex justify-between items-center overflow-x-auto ">
          <div className="flex items-center gap-2 sm:gap-4">
            <h4 className="text-[10px] sm:text-xs text-[#49de6f] whitespace-nowrap">
              Connected:
            </h4>
            <div className="flex items-center gap-2 sm:gap-3">
              {clients.map((client) => (
                <Client
                  key={client.socketId}
                  id={client.socketId}
                  name={client.name}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-evenly w-[80px] sm:w-1/6 gap-2 shrink-0">
            <button
              onClick={copyId}
              className="bg-[#121417] rounded-full border-none hover:scale-105 p-[4px] sm:p-[6px]"
            >
              <Copy color="#49de6f" size={18} />
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#121417] rounded-full border-none hover:scale-105 p-[4px] sm:p-[6px]"
            >
              <LogOut color="#49de6f" size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
