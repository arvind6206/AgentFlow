import {
  Bot,
  Check,
  ChevronDown,
  ImagePlus,
  LogOut,
  Plus,
  Send,
  Settings2,
  UserRound,
  Workflow,
} from "lucide-react";
import React, { useState, useEffect } from "react";
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
import { setSelectedAgent, setAgents, setAgentsLoading } from "@/redux/agentSlice";
import { getAllAgents } from "@/features/agent";
import { chat, agentChat } from "@/features/chat";
import { Textarea } from "@/components/ui/textarea";

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
  const [messages, setMessages] = useState([]);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const { agents, selectedAgent } = useSelector((state) => state.agent);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logout();
    dispatch(setUserData(null));
    setLogoutLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      let response;
      if (selectedAgent) {
        response = await agentChat(userMessage, selectedAgent);
      } else {
        response = await chat(userMessage);
      }

      if (response?.aiResponse) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.aiResponse },
        ]);
      } else if (response?.msg) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${response.msg}` },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAgentsData = async () => {
      if (userData) {
        dispatch(setAgentsLoading(true));
        try {
          const data = await getAllAgents();
          dispatch(setAgents(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setAgentsLoading(false));
        }
      }
    };
    fetchAgentsData();
  }, [userData]);

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
                items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.05]"
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
                  onClick={handleLogout}
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

        <main className="flex min-h-0 flex-1 flex-col">
          <section className="flex min-h-0 flex-1 flex-col">
            <div className={`min-h-0 flex-1 overflow-y-auto ${hideScrollbar}`}>
              <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-5 px-4 py-8 sm:px-6">
                {messages.length === 0 && (
                  <div className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
                    <div className="mb-7 grid size-14 place-items-center rounded-2xl bg-white text-zinc-900">
                      <Workflow size={26} />
                    </div>

                    <p className="text-base text-violet-300/80">
                      Hi, {userData?.name || "User"}
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold text-white tracking-tight sm:text-3xl">
                      Can I help you with anything?
                    </h1>
                    <p className="mt-4 max-w-sm text-xs leading-5 text-zinc-500">
                      Ask questions, automate tasks, or upload an image to
                      prepare an Instagram post.
                    </p>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div
                        className="mr-3 mt-1 grid size-8 shrink-0 place-items-center
                      rounded-lg bg-white text-zinc-900"
                      >
                        <Workflow size={15} />
                      </div>
                    )}

                    <div
                      className={`max-w-[90%] break-words px-4 py-3 text-sm
                      leading-7 sm:max-w-[80%] ${
                        message.role === "user"
                          ? `rounded-2xl
                        rounded-br-md text-white ${darkPanel}`
                          : "text-zinc-200"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="z-20 w-full shrink-0 px-3 pb-3 pt-2 sm:pb-4">
              <form
                onSubmit={handleSubmit}
                className={`mx-auto w-full max-w-2xl rounded-2xl p-3 transition-colors
                focus-within:border-white/25 ${darkPanel}`}
              >
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={"Ask me anything..."}
                  disabled={loading}
                  className={`min-h-20 resize-none border-0 !bg-transparent px-2 py-1.5 text-sm
                    text-white shadow-none placeholder:text-zinc-500 focus-visible:ring-0 ${hideScrollbar}`}
                />
                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      aria-label="Attach image"
                      title="Attach image"
                      className="size-8 rounded-lg text-zinc-300 hover:bg-white/10 hover:text-white"
                    >
                      <ImagePlus size={17} />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-8 max-w-48 gap-2 rounded-lg border
                        border-white/10 bg-white/[0.05] px-2.5 text-xs
                        text-zinc-300 hover:bg-white/10 hover:text-white"
                        >
                          <Bot size={14} className="shrink-0" />
                          <span className="truncate">
                            {selectedAgent || "Agent Not Selected"}
                          </span>
                          <ChevronDown size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        side="top"
                        className={`mb-2 w-60 ${menuContent}`}
                      >
                        {!agents && 
                          <DropdownMenuItem className={menuItem}>
                            No Agent Found
                          </DropdownMenuItem>
                        }

                        {
                          agents?.map((agent, index) => (
                            <DropdownMenuItem 
                              key={index} 
                              className={`cursor-pointer gap-2 ${menuItem}`}
                              onClick={() => dispatch(setSelectedAgent(agent?.name))}
                            >
                              <Bot size={15} className='shrink-0 text-violet-300'/>
                              <span className='truncate flex-1'>{agent?.name}</span>
                              {selectedAgent === agent?.name && <Check size={14} className="text-zinc-400"/>}
                            </DropdownMenuItem>
                          ))
                        }
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || !inputMessage.trim()}
                    variant="ghost"
                    className="size-8 rounded-lg text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-50"
                  >
                    <Send size={17} />
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
