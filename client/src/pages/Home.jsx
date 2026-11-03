import {
  Bot,
  LogOut,
  Plus,
  Settings2,
  UserRound,
  Workflow,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth";
import { setUserData } from "@/redux/userSlice";

const hideScrollbar =
  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
const darkPanel =
  "border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.35), inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl";
const menuContent =
  "rounded-2xl border border-white/10 bg-[#1d2026]/95 p-1.5 text-zinc-100 shadow-2xl shadow-black/50 backdrop-blur-xl";

const menuItem = "rounded-xl text-zinc-300 focus:bg-white/10 focus:text-white";
const menuSeperator = "bg-white/10";

const iconBtn =
  "size-9 rounded-xl border border-white/10 bg-white/[0.05] p-0 text-zinc-300 hover:bg-white/10 hover:text-white";

const whiteBtn =
  "rounded-xl border-0 bg-white text-zinc-300 hover:bg-zinc-200 hover:text-zinc-900";

const Home = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logout();
    dispatch(setUserData(null));
    setLogoutLoading(false);
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#2b2f3a_0%,#191b21_55%,#121317_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]"
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <header className="z-30 flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
          <Link to={"/"} className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-white text-zinc-900">
              <Workflow size={17} />
            </span>
            <span className="text-sm font-medium text-white tracking-tight">
              Automate AI
            </span>
          </Link>

          <div className="flex items-center gap-2.5">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" className={iconBtn} />}
              >
                <Workflow size={17} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`w-56 ${menuContent}`}
              >
                <DropdownMenuItem asChild>
                  <Link
                    to={"/agents"}
                    className="flex items-center gap-2.5 py-2.5"
                  >
                    <Bot />
                    My Agents
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className={menuSeperator} />
                <DropdownMenuItem asChild>
                  <Link
                    to={"/agents/new"}
                    className="flex items-center gap-2.5 py-2.5"
                  >
                    <Plus />
                    Create New Agent
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className={menuSeperator} />
                <DropdownMenuItem asChild>
                  <Link
                    to={"/integrations"}
                    className="flex items-center gap-2.5 py-2.5"
                  >
                    <Settings2 />
                    Integration
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open profile menu"
                  className="flex size-9
                items-center justify-center overflow-hidden rounded-xl border border-white/10 mt-4 bg-white/[0.05]"
                >
                  {userData?.profilePicture ? (
                    <img
                      src={userData?.profilePicture}
                      referrerPolicy="no-referrer"
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserRound size={17} className="text-zinc-300" />
                  )}
                </button>
                <Workflow size={17} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`w-64 ${menuContent}`}
              >
                <div className="felx items-center gap-3 px-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-zinc-500">
                      {userData?.name || "user"}
                    </p>
                    <p className="truncate text-xs text-zinc-500">
                      {userData?.email || "email"}
                    </p>
                  </div>
                </div>

                <DropdownMenuSeparator className={menuSeperator} />
                <DropdownMenuItem
                  onClick={(event) => {
                    handleLogout();
                  }}
                  asChild
                  className="cursor-pointer gap-2.5 rounded-xl
                py-2.5 text-red-400 focus:bg-red-500/10 focus:text-red-400"
                >
                  {logoutLoading ? (
                    "Logging out..."
                  ) : (
                    <>
                      <LogOut size={16} />{" "}
                    </>
                  )}{" "}
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Home;
