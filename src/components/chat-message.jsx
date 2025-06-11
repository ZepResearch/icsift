"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Bot } from "lucide-react"



export function ChatMessage({ message }) {
  const isUser = message.role === "user"

  // Ensure content is a string
  const content = typeof message.content === "string" ? message.content : JSON.stringify(message.content)

  return (
    <div className={cn("flex items-start gap-2 sm:gap-4 mb-4 sm:mb-6", isUser && "flex-row-reverse")}>
      <Avatar className={cn("h-8 w-8 sm:h-10 sm:w-10 border-2 shadow-lg flex-shrink-0", 
        isUser ? "border-[#4d724d] bg-[#4d724d]" : "border-[#d3e4c5] bg-white")}>
        {isUser ? (
          <AvatarFallback className="bg-[#4d724d] text-white rounded-full">
            <User className="h-4 w-4 sm:h-5 sm:w-5"/>
          </AvatarFallback>
        ) : (
          <AvatarFallback className="bg-white text-[#4d724d] border border-[#d3e4c5]">
            <Bot className="h-4 w-4 sm:h-5 sm:w-5"/>
          </AvatarFallback>
        )}
      </Avatar>
      <Card className={cn(
        "max-w-[85%] sm:max-w-[75%] shadow-md border-0 transition-all duration-200 hover:shadow-lg", 
        isUser 
          ? "bg-[#4d724d] text-white" 
          : "bg-[#d3e4c5] text-gray-800"
      )}>
        <CardContent className="p-3 sm:p-4">
          {message.isLoading ? (
            <div className="flex gap-2">
              <Skeleton className="h-3 w-3 rounded-full animate-bounce bg-[#4d724d]/30" />
              <Skeleton className="h-3 w-3 rounded-full animate-bounce delay-150 bg-[#4d724d]/30" />
              <Skeleton className="h-3 w-3 rounded-full animate-bounce delay-300 bg-[#4d724d]/30" />
            </div>
          ) : (
            <div className={cn(
              "prose prose-sm max-w-none",
              isUser ? "prose-invert" : "prose-gray"
            )} dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}