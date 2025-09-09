import React, { useState, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import UserList from './components/UserList';
import ConversationView from './components/ConversationView';
import Cookies from "js-cookie";
import { Search, MessageCircle, Users, Clock, Trash2, MoreVertical } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';
import { formatDistanceToNow } from 'date-fns';
import * as chatService from '../../services/chatService';
import { toast } from 'react-toastify';
import PageTitle from '@/components/PageTitle'
import { useLocation } from 'react-router-dom';
const SimpleChat = () => {
  const { currentUser, loading, conversations, selectedConversation, setSelectedConversation } = useChat();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('conversations');
  const location = useLocation();

  // Update selected user when conversation changes
  useEffect(() => {
    if (selectedConversation) {
      setSelectedUser({
        id: selectedConversation.user.id,
        name: selectedConversation.user.name,
        chatId: selectedConversation.chatId
      });
    }
  }, [selectedConversation]);

  // Handle URL parameters for direct user chat
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const userId = urlParams.get('userId');
    const userName = urlParams.get('userName');
    
    if (userId && userName && currentUser) {
      // Check if there's an existing conversation with this user
      const existingConversation = conversations.find(conv => 
        conv.user.id === userId || conv.user.id === String(userId)
      );
      
      if (existingConversation) {
        // Select the existing conversation
        setSelectedConversation(existingConversation);
        setSelectedUser({
          id: existingConversation.user.id,
          name: existingConversation.user.name,
          chatId: existingConversation.chatId
        });
      } else {
        // Auto-select the user from URL parameters for new conversation
        setSelectedUser({
          id: userId,
          name: decodeURIComponent(userName),
          chatId: null // Will be created when first message is sent
        });
      }
      setActiveTab('conversations');
    }
  }, [location.search, currentUser, conversations]);

  const handleUserSelect = (user, chatId) => {
    setSelectedUser({
      id: String(user.id),
      name: user.name,
      chatId: chatId
    });
    setActiveTab('conversations');
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    setSelectedUser({
      id: conversation.user.id,
      name: conversation.user.name,
      chatId: conversation.chatId
    });
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      await chatService.deleteConversation(conversationId);
      
      // If the deleted conversation was selected, clear selection
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null);
        setSelectedUser(null);
      }
      
      toast.success('Conversation deleted successfully');
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast.error('Failed to delete conversation');
    }
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchTerm) return true;
    return conv.user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!Cookies.get("token")) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Please sign in to use chat</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <PageTitle> Chat</PageTitle>
          <p className="text-muted-foreground">
            Connect with other users - Simple & Fast
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
          <div className="flex h-[600px]">
            {/* Left Panel - Conversations & User Search */}
            <div className="w-1/3 border-r border-border bg-background/50 flex flex-col max-h-[600px]">
              {/* Search Bar */}
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder={activeTab === 'conversations' ? 'Search conversations...' : 'Search users...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Tabs for Conversations and Users */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 px-4 mb-2">
                  <TabsTrigger value="conversations" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Chats {conversations.length > 0 && `(${conversations.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    New Chat
                  </TabsTrigger>
                </TabsList>

                {/* Conversations Tab */}
                <TabsContent value="conversations" className="flex-1 overflow-y-auto mt-0 data-[state=active]:flex data-[state=active]:flex-col" style={{ maxHeight: 'calc(600px - 120px)' }}>
                  {filteredConversations.length === 0 ? (
                    <div className="p-8 text-center">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        {searchTerm ? 'No conversations found' : 'No conversations yet'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Start a new chat from the "New Chat" tab
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {filteredConversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`relative group hover:bg-accent transition-colors ${
                            selectedConversation?.id === conversation.id ? 'bg-accent' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3 p-4">
                            {/* Clickable area for conversation */}
                            <div 
                              onClick={() => handleConversationSelect(conversation)}
                              className="flex-1 flex items-start space-x-3 cursor-pointer"
                            >
                              {/* Avatar */}
                              <div className="flex-shrink-0 relative">
                                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10">
                                  {conversation.user.avatar ? (
                                    <img
                                      src={conversation.user.avatar}
                                      alt={conversation.user.name}
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                  ) : (
                                    <span className="font-semibold text-primary">
                                      {conversation.user.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Conversation Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-medium truncate text-foreground">
                                    {conversation.user.name}
                                  </p>
                                  {conversation.lastMessage?.timestamp && (
                                    <span className="text-xs flex items-center gap-1 text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      {formatDistanceToNow(conversation.lastMessage.timestamp, { addSuffix: true })}
                                    </span>
                                  )}
                                </div>
                                {conversation.lastMessage && (
                                  <p className="text-sm truncate text-muted-foreground">
                                    {conversation.lastMessage.senderId === String(currentUser?.id) && (
                                      <span className="font-medium">You: </span>
                                    )}
                                    {conversation.lastMessage.text}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Actions - Outside clickable area */}
                            <div className="flex items-center gap-2">
                              
                              {/* Delete Button */}
                              <AlertDialog>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Conversation
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this conversation with {conversation.user.name}? 
                                      This action cannot be undone and will permanently delete all messages.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteConversation(conversation.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Users Tab */}
                <TabsContent value="users" className="flex-1 mt-0 data-[state=active]:flex data-[state=active]:flex-col" style={{ maxHeight: 'calc(600px - 120px)' }}>
                  <UserList onUserSelect={handleUserSelect} searchTerm={searchTerm} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Conversation View - Right Panel */}
            <div className="flex-1 bg-background">
              <ConversationView 
                selectedUserId={selectedUser?.id}
                selectedUserName={selectedUser?.name}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SimpleChat;
