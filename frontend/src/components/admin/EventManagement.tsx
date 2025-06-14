import { useState, useEffect } from 'react';
import {
  FiSearch,
  FiMoreVertical,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  status: 'live' | 'upcoming' | 'completed';
  attendees: number;
  revenue: number;
  host: string;
}

const EventManagement = () => {
  const staticEvents: Event[] = [
    {
      id: '1',
      name: 'Tech Conference 2023',
      date: '2023-11-15',
      time: '14:00',
      status: 'live',
      attendees: 245,
      revenue: 12250,
      host: 'Alex Johnson'
    },
    {
      id: '2',
      name: 'Music Festival',
      date: '2023-12-05',
      time: '19:30',
      status: 'upcoming',
      attendees: 500,
      revenue: 25000,
      host: 'Sarah Williams'
    },
    {
      id: '3',
      name: 'Business Workshop',
      date: '2023-10-20',
      time: '10:00',
      status: 'completed',
      attendees: 120,
      revenue: 6000,
      host: 'Michael Chen'
    }
  ];

  const dynamicEvents: Event[] = Array.from({ length: 12 }, (_, i) => {
    const daysOffset = i * 5;
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + daysOffset);

    const status = (
      daysOffset === 0 ? 'live' :
      daysOffset < 0 ? 'completed' :
      'upcoming'
    ) as Event['status'];

    return {
      id: `${i + 4}`,
      name: `Event ${i + 4}`,
      date: eventDate.toISOString().split('T')[0],
      time: `${Math.floor(Math.random() * 12) + 1}:${Math.random() > 0.5 ? '00' : '30'}`,
      status,
      attendees: Math.floor(Math.random() * 500) + 50,
      revenue: Math.floor(Math.random() * 20000) + 1000,
      host: `Host ${String.fromCharCode(65 + (i % 26))}`
    };
  });

  const dummyEvents: Event[] = [...staticEvents, ...dynamicEvents];

  const [events, setEvents] = useState<Event[]>(dummyEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(dummyEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Event['status']>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  useEffect(() => {
    let results = events;

    if (searchTerm) {
      results = results.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.host.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      results = results.filter(event => event.status === statusFilter);
    }

    setFilteredEvents(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, events]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  return (
    <div className="rounded-lg p-4 sm:p-6 transition-all duration-300 bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-[rgba(138,43,226,0.1)] hover:border-[rgba(138,43,226,0.3)] hover:shadow-[0_5px_15px_rgba(138,43,226,0.2)]">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="pl-10 pr-4 py-2 rounded-md bg-[#1E1E2A] text-white border border-[#3A3A4A] focus:outline-none focus:ring-2 focus:ring-purple-600 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | Event['status'])}
          className="px-3 sm:px-4 py-2 rounded-md bg-[#1E1E2A] text-white border border-[#3A3A4A] focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="all">All Statuses</option>
          <option value="live">Live Now</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#3A3A4A]">
          <thead className="bg-[#1E1E2A]">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Event Name</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Date & Time</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                <FiUsers className="inline mr-1" /> Attendees
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                <FiDollarSign className="inline mr-1" /> Revenue
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Host</th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3A3A4A]">
            {currentEvents.length > 0 ? (
              currentEvents.map((event) => (
                <tr key={event.id} className="hover:bg-[#1E1E2A]/50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white font-medium">{event.name}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-300">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-purple-400" />
                      {formatDate(event.date)} at {event.time}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      event.status === 'live' ? 'bg-green-900/30 text-green-400' :
                      event.status === 'upcoming' ? 'bg-blue-900/30 text-blue-400' :
                      'bg-gray-700/30 text-gray-300'
                    }`}>
                      {event.status === 'live' ? 'Live Now' : 
                       event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-300">
                    {event.attendees.toLocaleString()}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-300">
                    {formatCurrency(event.revenue)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-300">
                    {event.host}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-1 sm:p-2 rounded-md bg-[#3A3A4A] hover:bg-[#4A4A5A] text-gray-300">
                      <FiMoreVertical />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 sm:px-6 py-4 text-center text-gray-400">
                  No events found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredEvents.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-xs sm:text-sm">
          <div className="text-gray-400 mb-2 sm:mb-0">
            Showing {indexOfFirstEvent + 1} to {Math.min(indexOfLastEvent, filteredEvents.length)} of {filteredEvents.length} events
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

export default EventManagement;
