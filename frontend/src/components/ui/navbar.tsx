import { NavLink } from "react-router-dom";

export const Navbar = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl">{title}</h2>
      <div className="flex gap-4">
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? "border-b border-b-black text-black font-bold"
                : "text-slate-400"
            }`
          }
          to={"/"}
        >
          Users
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? "border-b border-black text-black font-bold"
                : "text-slate-400"
            }`
          }
          to={"/createUser"}
        >
          Add new User
        </NavLink>
      </div>
    </div>
  );
};
