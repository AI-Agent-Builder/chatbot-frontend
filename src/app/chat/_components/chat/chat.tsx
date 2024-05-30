"use client";

import { Message, UserData } from "@/app/chat/_components/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { askApi } from "@/api";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
  messagesState: Message[]; 
  sendMessageClick: (newMessage: Message) => void
}

export function Chat({ messagesState, selectedUser, isMobile, sendMessageClick }: ChatProps) {
  return (
    <div className="flex flex-col justify-between w-full h-100">
      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessageClick}
        isMobile={isMobile}
      />
    </div>
  );
}
