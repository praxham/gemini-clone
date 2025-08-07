"use client";
import { CircleX, Paperclip, SendHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import geminiChatHead from "../../../public/assets/chatSection/geminiChatHead.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addChat,
  createChatRoom,
  setChatRooms,
} from "@/features/chatRooms/chatRoomsSlice";
import { RootState, store } from "../../store/store";

const staticResponses = [
  {
    name: "Kuvaka Tech",
    response: `Kuvaka Tech is a technology company that focuses on a range of services, particularly in the areas of Artificial Intelligence, Blockchain, and Web2/Web3 development. They present themselves as a company that helps businesses and individuals use these "transformative technologies" to create innovative products and achieve their goals.

Based on the information available, here's a summary of what Kuvaka Tech does:

* **Core Services:** They offer comprehensive services in AI, Blockchain, and Web2/Web3 development. This includes things like:
    * **Artificial Intelligence:** Developing AI-powered chatbots, generative AI solutions, and integrating with advanced AI models like OpenAI. They also specialize in data cleaning, machine learning, and predictive analytics.
    * **Blockchain and Web3:** This is a major focus for them, with services for designing and developing for a decentralized future.
    * **Web2 Development:** They also work on more traditional web development projects, creating user-friendly interfaces and seamless digital experiences.
* **Other Offerings:** They also provide services in design, marketing, and ongoing support for the products they develop. They mention assisting with fundraising and connecting clients with investors.
* **Company Profile:**
    * **Founded:** 2022
    * **Size:** They are a smaller company, with a staff of around 11-20 employees.
    * **Locations:** They have offices in India, the USA, and the UK.
    * **Focus:** They work with a variety of clients, including startups and small-to-large enterprises, across industries like cryptocurrency, blockchain, gaming, and general technology.`,
  },
  {
    name: "life",
    response: `That's a question that has been pondered by scientists, philosophers, and individuals for as long as we've been able to ask it. The answer you get really depends on the lens through which you're looking.

### The Biological Definition of Life

From a scientific perspective, life is defined by a set of characteristics. While there's no single, universally agreed-upon definition, a living organism is generally considered to possess most or all of the following traits:

* **Organization:** Living things are highly organized, containing specialized parts (cells, tissues, organs) that work together.
* **Metabolism:** They use energy and nutrients to perform chemical reactions that sustain them, a process called metabolism.
* **Homeostasis:** They can regulate their internal environment to maintain stable conditions, even when the external environment changes.
* **Growth and Development:** They grow and develop according to a specific genetic blueprint.
* **Reproduction:** They have the ability to create new organisms of their own kind, either sexually or asexually.
* **Response to Stimuli:** They can respond to changes in their environment, like moving towards food or away from danger.
* **Evolution:** Over time, populations of living organisms can evolve and adapt to their environment.

This biological definition helps us distinguish between a rock and a bacterium, but it doesn't address the "why."

### The Philosophical and Existential Definition

This is where the question gets much more complex and personal. Philosophers and thinkers have proposed countless ideas about the meaning of life, and there's no single "correct" answer. Some of the major schools of thought include:

* **Nihilism:** This perspective argues that life is without objective meaning, purpose, or intrinsic value. For a nihilist, the universe is indifferent, and any meaning is something we create ourselves.
* **Existentialism:** This school of thought, popularized by thinkers like Jean-Paul Sartre and Albert Camus, argues that "existence precedes essence." In other words, we are born into a world without a pre-ordained purpose, and it is up to us to define ourselves and create our own meaning through our choices and actions.
* **Supernaturalism:** Many religious and spiritual traditions propose that life has meaning because it is part of a divine plan. Our purpose is often tied to serving a higher power, following moral guidelines, and achieving a form of salvation or enlightenment.
* **Hedonism:** This view suggests that the meaning of life is to maximize pleasure and minimize pain.
* **Humanism:** This perspective emphasizes human reason, ethics, and values. It suggests that the meaning of life comes from human flourishing, creating a better world for ourselves and others, and pursuing knowledge and justice.

Ultimately, the question "What is life?" can be answered in many ways. It can be a biological process, a philosophical journey, a spiritual experience, or all of the above. The answer you choose is often a reflection of your own beliefs, experiences, and values.`,
  },
];

interface Chat {
  message: string;
  images?: string[];
  from: string;
  time: string;
}

interface ChatRoom {
  id: string;
  name: string;
  chats: Chat[];
}

const ChatSection = () => {
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [thinking, setThinking] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedImagesRaw, setUploadedImagesRaw] = useState<string[]>([]);
  const [chatRoomId, setChatRoomId] = useState<string | undefined>(undefined);
  const storedChatrooms = useSelector(
    (state: RootState) => state.chatRooms.chatRooms
  );
  const dispatch = useDispatch();
  const params = useParams();
  const bottomOfChat = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.id) {
      setChatRoomId(params?.id.toString());
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id && Array.isArray(storedChatrooms)) {
      const chatRoomExists = storedChatrooms?.some(
        (chatRoom) => chatRoom?.id === params.id
      );
      if (chatRoomExists) {
        const chatRoom = storedChatrooms?.find(
          (chatRoom) => chatRoom?.id === params.id
        );
        if (chatRoom) {
          setChats(chatRoom.chats);
        }
      }
    }
  }, [params.id, storedChatrooms]);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("chatRooms")) {
      const chatRooms = JSON.parse(localStorage.getItem("chatRooms") || "[]");
      dispatch(setChatRooms({ chatRooms: chatRooms }));
      const loadedChats =
        chatRooms.find((room: any) => room.id === chatRoomId)?.chats || [];
      setChats(loadedChats);
    }
  }, [chatRoomId, dispatch]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    const newChat = {
      message: message,
      images: uploadedImagesRaw,
      from: "user",
      time: new Date().toISOString(),
    };
    const updatedChat = [...chats, newChat];
    setChats(updatedChat);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      let geminiResponse: string;
      if (message.toLocaleLowerCase().includes("kuvaka")) {
        geminiResponse = staticResponses[0].response;
      } else if (message.toLocaleLowerCase().includes("life")) {
        geminiResponse = staticResponses[1].response;
      } else {
        geminiResponse = `"I can't answer that question right now, but I can tell you about things like 'what is Kuvaka?' or 'what is life?'"`;
      }
      const updatedChatWithGeminiResponse = [
        ...updatedChat,
        {
          message: geminiResponse,
          from: "gemini",
          time: new Date().toISOString(),
        },
      ];
      setChats(updatedChatWithGeminiResponse);
      let chatRoomExists = false;
      if (Array.isArray(storedChatrooms)) {
        chatRoomExists = storedChatrooms?.some(
          (chatRoom: any) => chatRoom.id === chatRoomId
        );
      }
      if (chatRoomExists) {
        dispatch(
          addChat({
            chatsData: { chats: updatedChatWithGeminiResponse, chatRoomId },
          })
        );
      } else {
        dispatch(
          createChatRoom({
            chatsData: { chats: updatedChatWithGeminiResponse, chatRoomId },
          })
        );
      }
    }, 2000);

    setMessage("");
    setUploadedImages([]);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && Array.isArray(storedChatrooms)) {
      localStorage.setItem("chatRooms", JSON.stringify(storedChatrooms));
    }
  }, [storedChatrooms]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        if (result) {
          setUploadedImages((prev: any) => [...prev, file]);
          setUploadedImagesRaw((prev: any) => [...prev, result]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!thinking && scrollContainerRef.current) {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [thinking, chats]);

  function formatTimeAgo(isoString: string): string {
    const now = new Date();
    const date = new Date(isoString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const seconds = diffInSeconds;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
    if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
    return `${years} year${years === 1 ? "" : "s"} ago`;
  }

  return (
    <div
      className="w-full h-full relative flex flex-col gap-4 overflow-y-auto"
      ref={scrollContainerRef}
    >
      {chats.length === 0 && (
        <p className="absolute top-[45%] left-[50%] translate-[-50%] text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-[#3185FE] to-[#4E9FFF]">
          Hello There
        </p>
      )}
      <form
        onSubmit={handleChatSubmit}
        className="w-[800px] mt-auto mb-4 mx-auto flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          {chats.map((chat, index) => (
            <div key={index} className="flex flex-col gap-4">
              {chat.from === "user" && (
                <div className="flex flex-row gap-2 ml-auto emptyDiv">
                  {Array.isArray(chat?.images) &&
                    chat?.images?.length > 0 &&
                    chat.images.map((image: any, index) => (
                      <Image
                        key={index}
                        className="w-16 aspect-square object-cover rounded-[15px]"
                        src={image}
                        alt={`uploaded-${index}`}
                        width={64}
                        height={64}
                      />
                    ))}
                </div>
              )}
              <div
                key={index}
                className={`text-white p-4 ${
                  chat.from === "user"
                    ? "bg-[#333537] ml-auto rounded-b-full rounded-tl-full rounded-tr-[16px]"
                    : "pl-0"
                } flex flex-row gap-2 items-start text-[16px]`}
              >
                {chat.from === "gemini" && (
                  <Image
                    className="min-w-[24px]"
                    src={geminiChatHead}
                    alt="gemini"
                  />
                )}
                {chat.from === "gemini" ? (
                  <div className="prose prose-neutral dark:prose-invert max-w-none motion-preset-typewriter-[24]">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1
                            className="text-2xl font-bold mt-4 mb-2"
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-xl font-semibold mt-3 mb-1"
                            {...props}
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="leading-relaxed mb-2" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul className="list-disc ml-6 mb-2" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="mb-1" {...props} />
                        ),
                        code: ({ node, ...props }) => (
                          <code
                            className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded"
                            {...props}
                          />
                        ),
                        pre: ({ node, ...props }) => (
                          <pre
                            className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded overflow-x-auto mb-4"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {chat.message}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p>{chat.message}</p>
                )}
              </div>

              <p
                className={`text-gray-400 font-medium text-[12px] ${
                  chat.from === "gemini" ? "mr-auto" : "ml-auto"
                } -mt-2`}
              >
                {formatTimeAgo(chat.time)}
              </p>
            </div>
          ))}
          <div ref={bottomOfChat} className="emptyDiv" />
        </div>
        {thinking && (
          <div className="flex flex-row gap-2 items-start text-[16px] text-white animate-pulse">
            <Image className="min-w-[24px]" src={geminiChatHead} alt="gemini" />
            <p>Gemini is typing...</p>
          </div>
        )}
        <div className="w-full relative mt-4 border-[0.5px] border-[#3D3F42] rounded-3xl min-h-[100px] max-h-[400px] bg-transparent p-4 flex flex-col gap-4">
          <div className="flex flex-row gap-2 emptyDiv">
            {uploadedImages.length > 0 &&
              uploadedImages.map((image: any, index) => (
                <div key={index} className="w-[64px] h-[64px] relative">
                  <Image
                    className="peer w-16 aspect-square object-cover rounded-[15px]"
                    src={URL.createObjectURL(image)}
                    alt={`uploaded-${index}`}
                    width={64}
                    height={64}
                  />
                  <div
                    onClick={() => {
                      setUploadedImages(
                        uploadedImages.filter((_, i) => i !== index)
                      );
                    }}
                    className="peer-hover:display display-none absolute top-1 right-1 bg-black rounded-full cursor-pointer"
                  >
                    <CircleX color="white" size={16} />
                  </div>
                </div>
              ))}
          </div>
          <textarea
            value={message}
            readOnly={thinking}
            required
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleChatSubmit(e);
              }
            }}
            className="w-full mb-[42px] max-h-[400px] bg-transparent text-white  outline-none resize-none"
            placeholder="Ask Gemini"
          />
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => handleFileUpload(e)}
          />
          <Paperclip
            color="white"
            size={16}
            className="absolute bottom-4 left-4 cursor-pointer"
            onClick={() => document.getElementById("file")?.click()}
          />
          {message !== "" && (
            <Button
              type="submit"
              className="absolute bottom-4 right-4 bg-[#282A2C] w-10 aspect-square rounded-full flex items-center justify-center"
            >
              <SendHorizontal color="white" size={16} />
            </Button>
          )}
        </div>
        <p className="text-[12px] text-gray-400 text-center">
          Gemini can make mistakes, so double-check it
        </p>
      </form>
    </div>
  );
};

export default ChatSection;
