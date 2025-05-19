import { useAuthContext } from "../hooks/useContext";
import { FaAlignJustify, FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from "react-router";
import { logoutService } from "../services/authService";

interface FilterMenuProps {
  children: React.ReactNode;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterMenu({
  children,
  open,
  setIsOpen,
}: FilterMenuProps) {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  // mover logout logic a auth context ???
  const handleLogout = async () => {
    try {
      await logoutService();
      logout(); // Remove token and clear user info
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex">
      <button onClick={() => setIsOpen(!open)}>
        <FaAlignJustify className="mr-4 h-5 w-5" />
      </button>

      {/* Fondo oscuro (backdrop) */}
      {open && (
        <div
          className="bg-opacity-50 fixed inset-0 z-10 bg-black/10 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {open && (
        <div className="fixed top-0 left-0 z-10 h-full w-[60%] bg-white px-2 shadow-lg">
          <div className="flex w-full justify-between px-4 py-2 mb-4">
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer"
            >
              <FaUserAstronaut className="h-5 w-5 self-center" />
            </button>
            <button className="" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <div className="">{children}</div>
        </div>
      )}
    </div>
  );
}
