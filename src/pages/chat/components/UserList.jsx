import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { MessageCircle, User } from 'lucide-react';
import { userAPI } from '../../../lib/api';
import { useChat } from '../../../contexts/ChatContext';
import { toast } from 'react-toastify';

const UserList = ({ onUserSelect, searchTerm = '' }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, startNewChat } = useChat();

  // Fetch all users from Laravel API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll({ per_page: 100 });
      if (response?.data) {
        // The API returns data directly, not nested in a 'users' property
        const allUsers = Array.isArray(response.data) ? response.data : [];
        // Filter out current user
        const otherUsers = allUsers.filter(
          user => String(user.id) !== String(currentUser?.id)
        );
        setUsers(otherUsers);
        setFilteredUsers(otherUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Fallback: create some dummy users for testing
      const dummyUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com' }
      ].filter(user => String(user.id) !== String(currentUser?.id));
      setUsers(dummyUsers);
      setFilteredUsers(dummyUsers);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
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
                        src={user.profile_picture}
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
          onClick={fetchUsers}
        >
          Refresh Users
        </Button>
      </div>
    </div>
  );
};

export default UserList;
