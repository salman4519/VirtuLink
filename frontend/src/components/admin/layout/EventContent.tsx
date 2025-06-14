import EventManagement from "../EventManagement";

const MainContent = () => {
  return (
    <main className="flex-1 md:ml-60 ml-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Event Management</h1>
          <p className="text-sm sm:text-base text-gray-400">Manage Events</p>
        </div>
        
        {/* Content */}
        <div className="space-y-6 sm:space-y-8">
          <EventManagement />
        </div>
      </div>
    </main>
  );
};

export default MainContent;