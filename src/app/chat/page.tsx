"use client";

import * as React from "react";
import { Message } from "@/app/chat/_components/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { askApi } from "@/api";

import { Wave } from "@/components/wave";
import { ChatLayout } from "./_components/chat/chat-layout";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const queryClient = useQueryClient();

  const [messagesState, setMessages] = React.useState<Message[]>([]);

  const mutation = useMutation({
    mutationFn: askApi,
    onSuccess: (data: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          avatar: "/User1.png",
          name: "Robot",
          message: data ?? "",
        },
      ]);
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });

  const sendMessageClick = (newMessage: Message) => {
    const chat_id = localStorage.getItem("id") ?? "";

    setMessages([...messagesState, newMessage]);
    mutation.mutateAsync({
      chat_id,
      question: newMessage.message,
    });
  };
  return (
    <div className="h-[calc(100dvh-70px)] flex items-end justify-center overflow-y-hidden relative">
      <div
        className={cn(
          `absolute z-20 top-0 left-auto right-auto max-w-[440px] hidden md:block`
        )}
      >
        <Wave disabled={!mutation.isPending} height={150} />
      </div>
      <div className="left-0 right-0 bottom-[0px] z-10 w-[calc(90dvw)] md:w-[calc(60dvw)] rounded-lg text-sm flex overflow-y-hidden">
        <ChatLayout
          defaultLayout={[320, 480]}
          messagesState={messagesState}
          sendMessageClick={sendMessageClick}
        />
      </div>
    </div>
  );
}
