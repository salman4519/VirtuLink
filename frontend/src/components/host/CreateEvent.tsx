import React, { useState, ChangeEvent, FormEvent } from 'react';

interface EventData {
  // Section 1: Event Details
  title: string;
  eventType: 'live' | 'interactive';
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  
  // Section 2: Ticket Information
  isFree: boolean;
  hasLimitedCapacity: boolean;
  capacity: string;
  ticketPrice: string;
  
  // Section 3: Thumbnail
  thumbnail: File | null;
  thumbnailPreview: string;
}

interface ErrorState {
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  capacity?: string;
  ticketPrice?: string;
  thumbnail?: string;
}

interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

const EventCreate: React.FC = () => {
  const [eventData, setEventData] = useState<EventData>({
    title: '',
    eventType: 'live',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    isFree: true,
    hasLimitedCapacity: false,
    capacity: '',
    ticketPrice: '',
    thumbnail: null,
    thumbnailPreview: ''
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<Message>({ text: '', type: '' });
  const [activeSection, setActiveSection] = useState<number>(1);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ErrorState]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleToggleChange = (name: keyof EventData) => {
    setEventData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setEventData(prev => ({
          ...prev,
          thumbnail: file,
          thumbnailPreview: reader.result as string
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };

  const validateSection = (section: number): boolean => {
    const newErrors: ErrorState = {};

    if (section === 1) {
      if (!eventData.title.trim()) {
        newErrors.title = 'Event title is required';
      }
      if (!eventData.date) {
        newErrors.date = 'Event date is required';
      }
      if (!eventData.startTime) {
        newErrors.startTime = 'Start time is required';
      }
      if (!eventData.endTime) {
        newErrors.endTime = 'End time is required';
      } else if (eventData.startTime && eventData.endTime <= eventData.startTime) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    if (section === 2) {
      if (!eventData.isFree && !eventData.ticketPrice) {
        newErrors.ticketPrice = 'Ticket price is required for paid events';
      }
      if (eventData.hasLimitedCapacity && !eventData.capacity) {
        newErrors.capacity = 'Capacity is required for limited events';
      }
    }

    if (section === 3 && !eventData.thumbnail) {
      newErrors.thumbnail = 'Thumbnail is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateSection(1) || !validateSection(2) || !validateSection(3)) {
      setMessage({ text: 'Please fill all required fields', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage({ text: 'Event created successfully!', type: 'success' });
      setEventData({
        title: '',
        eventType: 'live',
        date: '',
        startTime: '',
        endTime: '',
        description: '',
        isFree: true,
        hasLimitedCapacity: false,
        capacity: '',
        ticketPrice: '',
        thumbnail: null,
        thumbnailPreview: ''
      });
    } catch (error) {
      setMessage({ text: 'Failed to create event. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSection = () => {
    if (validateSection(activeSection)) {
      setActiveSection(prev => Math.min(prev + 1, 3));
      setMessage({ text: '', type: '' });
    }
  };

  const prevSection = () => {
    setActiveSection(prev => Math.max(prev - 1, 1));
  };

  // Modern Toggle Component
  const ToggleSwitch = ({ 
    name, 
    checked, 
    onChange,
    label
  }: {
    name: keyof EventData;
    checked: boolean;
    onChange: (name: keyof EventData) => void;
    label: string;
  }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${checked ? 'bg-purple-600' : 'bg-gray-600'}`}
        onClick={() => onChange(name)}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );

  return (
    <div className="rounded-lg p-4 sm:p-6 transition-all duration-300 bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-[rgba(138,43,226,0.1)] hover:border-[rgba(138,43,226,0.3)] hover:shadow-[0_5px_15px_rgba(138,43,226,0.2)]">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Create New Event</h2>

      {/* Progress Steps */}
      <div className="flex justify-between mb-6 relative">
        <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-800 -z-10 mx-12">
          <div 
            className="h-0.5 bg-purple-600 transition-all duration-300" 
            style={{ width: `${(activeSection - 1) * 50}%` }}
          ></div>
        </div>
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center z-10">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                activeSection >= step 
                  ? 'bg-purple-600 border-purple-600 text-white' 
                  : 'bg-[#1E1E2A] border-gray-600 text-gray-400'
              }`}
            >
              {step}
            </div>
            <span className={`text-xs mt-1 ${activeSection >= step ? 'text-white' : 'text-gray-400'}`}>
              {step === 1 ? 'Details' : step === 2 ? 'Tickets' : 'Thumbnail'}
            </span>
          </div>
        ))}
      </div>

      {message.text && (
        <div className={`mb-3 sm:mb-4 p-3 rounded-md flex items-center ${
          message.type === 'success' 
            ? 'bg-green-900/50 border border-green-700 text-green-200' 
            : 'bg-red-900/50 border border-red-700 text-red-200'
        }`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {message.type === 'success' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            )}
          </svg>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Section 1: Event Details */}
        {activeSection === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Event Details</h3>
            
            <div>
              <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1E1E2A] text-white border ${
                  errors.title ? 'border-red-500' : 'border-[#3A3A4A]'
                } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm sm:text-base transition-colors`}
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="mt-1 text-xs sm:text-sm text-red-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Event Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEventData(prev => ({ ...prev, eventType: 'live' }))}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    eventData.eventType === 'live'
                      ? 'bg-purple-600/20 border-purple-600 text-white shadow-md shadow-purple-600/10'
                      : 'bg-[#1E1E2A] border-[#3A3A4A] text-gray-300 hover:border-purple-600/50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Live Event</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setEventData(prev => ({ ...prev, eventType: 'interactive' }))}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    eventData.eventType === 'interactive'
                      ? 'bg-purple-600/20 border-purple-600 text-white shadow-md shadow-purple-600/10'
                      : 'bg-[#1E1E2A] border-[#3A3A4A] text-gray-300 hover:border-purple-600/50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Interactive</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                  Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={eventData.date}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1E1E2A] text-white border ${
                      errors.date ? 'border-red-500' : 'border-[#3A3A4A]'
                    } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm sm:text-base appearance-none`}
                  />
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 absolute right-3 top-2.5 text-gray-400 pointer-events-none" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                {errors.date && (
                  <p className="mt-1 text-xs sm:text-sm text-red-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="startTime" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                    Start Time *
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={eventData.startTime}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1E1E2A] text-white border ${
                        errors.startTime ? 'border-red-500' : 'border-[#3A3A4A]'
                      } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm sm:text-base appearance-none`}
                    />
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 absolute right-3 top-2.5 text-gray-400 pointer-events-none" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {errors.startTime && (
                    <p className="mt-1 text-xs sm:text-sm text-red-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.startTime}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                    End Time *
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={eventData.endTime}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1E1E2A] text-white border ${
                        errors.endTime ? 'border-red-500' : 'border-[#3A3A4A]'
                      } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm sm:text-base appearance-none`}
                    />
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 absolute right-3 top-2.5 text-gray-400 pointer-events-none" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {errors.endTime && (
                    <p className="mt-1 text-xs sm:text-sm text-red-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.endTime}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1E1E2A] text-white border border-[#3A3A4A] focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm sm:text-base transition-colors"
                placeholder="Enter event description"
                rows={4}
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={nextSection}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 flex items-center"
              >
                Next: Ticket Information
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Section 2: Ticket Information */}
        {activeSection === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Ticket Information</h3>
            
            <div className="p-4 rounded-lg bg-[#1E1E2A]/50 border border-[#3A3A4A]">
              <ToggleSwitch 
                name="isFree" 
                checked={eventData.isFree} 
                onChange={handleToggleChange}
                label="Free Event"
              />
            </div>

            {!eventData.isFree && (
              <div className="p-4 rounded-lg bg-[#1E1E2A]/50 border border-[#3A3A4A]">
                <label htmlFor="ticketPrice" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                  Ticket Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                    value={eventData.ticketPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full pl-8 pr-3 sm:px-4 py-2 rounded-lg bg-[#1E1E2A] text-white border ${
                      errors.ticketPrice ? 'border-red-500' : 'border-[#3A3A4A]'
                    } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm sm:text-base`}
                    placeholder="0.00"
                  />
                </div>
                {errors.ticketPrice && (
                  <p className="mt-1 text-xs sm:text-sm text-red-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.ticketPrice}
                  </p>
                )}
              </div>
            )}

            <div className="p-4 rounded-lg bg-[#1E1E2A]/50 border border-[#3A3A4A]">
              <ToggleSwitch 
                name="hasLimitedCapacity" 
                checked={eventData.hasLimitedCapacity} 
                onChange={handleToggleChange}
                label="Limited Capacity"
              />
            </div>

            {eventData.hasLimitedCapacity && (
              <div className="p-4 rounded-lg bg-[#1E1E2A]/50 border border-[#3A3A4A]">
                <label htmlFor="capacity" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                  Maximum Attendees *
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={eventData.capacity}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1E1E2A] text-white border ${
                    errors.capacity ? 'border-red-500' : 'border-[#3A3A4A]'
                  } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm sm:text-base`}
                  placeholder="Enter maximum number of attendees"
                />
                {errors.capacity && (
                  <p className="mt-1 text-xs sm:text-sm text-red-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.capacity}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={prevSection}
                className="px-5 py-2.5 bg-[#1E1E2A] hover:bg-[#2A2A3A] text-white rounded-lg transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back
              </button>
              <button
                type="button"
                onClick={nextSection}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center"
              >
                Next: Thumbnail
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Section 3: Thumbnail Upload */}
        {activeSection === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Event Thumbnail</h3>
            
            <div className="p-4 rounded-lg bg-[#1E1E2A]/50 border border-[#3A3A4A]">
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-3">
                Thumbnail Image *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-[#3A3A4A] hover:border-purple-600/50 transition-colors">
                <div className="space-y-1 text-center">
                  {eventData.thumbnailPreview ? (
                    <div className="relative group">
                      <img 
                        src={eventData.thumbnailPreview} 
                        alt="Thumbnail preview" 
                        className="mx-auto max-h-48 rounded-md object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-md">
                        <button
                          type="button"
                          onClick={() => setEventData(prev => ({ ...prev, thumbnail: null, thumbnailPreview: '' }))}
                          className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex justify-center text-sm text-gray-400">
                        <label
                          htmlFor="thumbnail-upload"
                          className="relative cursor-pointer bg-[#1E1E2A] rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="thumbnail-upload"
                            name="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>
              {errors.thumbnail && (
                <p className="mt-1 text-xs sm:text-sm text-red-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.thumbnail}
                </p>
              )}
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={prevSection}
                className="px-5 py-2.5 bg-[#1E1E2A] hover:bg-[#2A2A3A] text-white rounded-lg transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-2.5 rounded-lg font-medium text-white transition-all duration-200 flex items-center ${
                  isSubmitting ? 'bg-purple-800 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    Create Event
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      <div className="mt-4 sm:mt-6 text-xs text-gray-400">
        <p>Fields marked with * are required</p>
      </div>
    </div>
  );
};

export default EventCreate;