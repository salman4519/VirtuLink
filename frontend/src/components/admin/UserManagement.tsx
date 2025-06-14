import { useState ,useEffect} from 'react';
import { FiSearch, FiUserX, FiUserCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'host' | 'attendee';
  status: 'active' | 'blocked';
  joinedDate: string;
}

const UserManagement = () => {
  // Dummy data with correct role types
  const dummyUsers: User[] = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      joinedDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Event Host',
      email: 'host@example.com',
      role: 'host',
      status: 'active',
      joinedDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Regular Attendee',
      email: 'attendee@example.com',
      role: 'attendee',
      status: 'active',
      joinedDate: '2023-03-10'
    },
    {
      id: 4,
      name: 'Blocked Attendee',
      email: 'blocked@example.com',
      role: 'attendee',
      status: 'blocked',
      joinedDate: '2023-01-05'
    },
    ...Array.from({ length: 20 }, (_, i) => ({
  id: i + 5,
  name: `User ${i + 5}`,
  email: `user${i + 5}@example.com`,
  role: (i % 3 === 0 ? 'admin' : i % 2 === 0 ? 'host' : 'attendee') as User['role'],
  status: (i % 4 === 0 ? 'blocked' : 'active') as User['status'],
  joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]
}))

  ];

  const [users] = useState<User[]>(dummyUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(dummyUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | User['role']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filter users
  const applyFilters = () => {
    let result = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (roleFilter !== 'all') result = result.filter(user => user.role === roleFilter);
    if (statusFilter !== 'all') result = result.filter(user => user.status === statusFilter);
    
    setFilteredUsers(result);
    setCurrentPage(1);
  };

  useEffect(() => { applyFilters(); }, [searchTerm, roleFilter, statusFilter]);

  // Toggle user status
  const toggleUserStatus = (userId: number) => {
    setFilteredUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } 
        : user
    ));
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="rounded-lg p-4 sm:p-6 transition-all duration-300 bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-[rgba(138,43,226,0.1)] hover:border-[rgba(138,43,226,0.3)] hover:shadow-[0_5px_15px_rgba(138,43,226,0.2)]">

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 rounded-md bg-[#1E1E2A] text-white border border-[#3A3A4A] focus:outline-none focus:ring-2 focus:ring-purple-600 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as 'all' | User['role'])}
          className="px-3 sm:px-4 py-2 rounded-md bg-[#1E1E2A] text-white border border-[#3A3A4A] focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="host">Host</option>
          <option value="attendee">Attendee</option>
        </select>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | User['status'])}
          className="px-3 sm:px-4 py-2 rounded-md bg-[#1E1E2A] text-white border border-[#3A3A4A] focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#3A3A4A]">
          <thead className="bg-[#1E1E2A]">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Role</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Joined</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3A3A4A]">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#1E1E2A]/50">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">{user.name}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin' ? 'bg-purple-900/30 text-purple-400' :
                    user.role === 'host' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-gray-700/30 text-gray-300'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-400 text-xs sm:text-sm">
                  {new Date(user.joinedDate).toLocaleDateString()}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`p-1 sm:p-2 rounded-md transition-colors ${
                      user.status === 'active' 
                        ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                        : 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                    }`}
                    title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                  >
                    {user.status === 'active' ? <FiUserX size={16} /> : <FiUserCheck size={16} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-xs sm:text-sm">
          <div className="text-gray-400 mb-2 sm:mb-0">
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 sm:px-3 py-1 rounded-md bg-[#1E1E2A] text-gray-300 disabled:opacity-50 flex items-center gap-1"
            >
              <FiChevronLeft size={14} /> Prev
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3 
                ? i + 1 
                : currentPage >= totalPages - 2 
                  ? totalPages - 4 + i 
                  : currentPage - 2 + i;
              return page > 0 && page <= totalPages && (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 sm:px-3 py-1 rounded-md ${
                    currentPage === page 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-[#1E1E2A] text-gray-300'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 sm:px-3 py-1 rounded-md bg-[#1E1E2A] text-gray-300 disabled:opacity-50 flex items-center gap-1"
            >
              Next <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;