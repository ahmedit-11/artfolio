import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../../../components/ui/button';
import { MessageCircle, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatUsersThunk } from '../../../store/users/thunk/getChatUsersThunk';
import { useChat } from '../../../contexts/ChatContext';
import { toast } from 'react-toastify';
import { getProfileImageUrl } from '../../../utils/mediaUtils';

const UserList = ({ onUserSelect, searchTerm = '' }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const dispatch = useDispatch();
  const { chatUsers, chatUsersLoading, chatUsersError } = useSelector(state => state.users);
  const { currentUser, startNewChat } = useChat();

  // Fetch all users from Redux store
  useEffect(() => {
    dispatch(getChatUsersThunk({ per_page: 100 }));
  }, [dispatch]);

  // Memoize filtered users to prevent infinite re-renders
  const users = useMemo(() => {
    return chatUsers.filter(
      user => String(user.id) !== String(currentUser?.id)
    );
  }, [chatUsers, currentUser?.id]);

  // Filter users based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = users.filter(user =>
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleUserClick = async (user) => {
    try {
      // Start a new chat with this user
      const chatId = await startNewChat(String(user.id));
      if (chatId) {
        // Notify parent component that user was selected
        onUserSelect && onUserSelect(user, chatId);
        toast.success(`Chat started with ${user.name}`);
      }
    } catch (error) {
      console.error('Error starting chat:', error);
      toast.error('Failed to start chat');
    }
  };

  if (chatUsersLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Users List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              {searchTerm ? 'No users found' : 'No users available'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserClick(user)}
                className="w-full p-4 hover:bg-accent transition-colors text-left flex items-center space-x-3"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {user.profile_picture ? (
                      <img
                        src={getProfileImageUrl(user.profile_picture)}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-primary font-semibold">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>

                {/* Chat Icon */}
                <MessageCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => dispatch(getChatUsersThunk({ per_page: 100 }))}
        >
          Refresh Users
        </Button>
      </div>
    </div>
  );
};

export default UserList;
