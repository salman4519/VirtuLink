import React, { useState } from 'react';
import { RiCameraLine } from 'react-icons/ri';

const PersonalInformation = () => {
  // Dummy user data
  const [formData, setFormData] = useState({
    firstName: 'Alexander',
    lastName: 'Mitchell',
    email: 'alexander.mitchell@example.com',
    phone: '+1 (555) 123-4567',
    dob: '05/12/1988',
    bio: 'Tech enthusiast and software engineer with over 10 years of experience in AI and machine learning. Passionate about virtual events and networking with industry professionals.'
  });

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Profile updated successfully!');
  };

  return (
    <div className="rounded-lg p-6 transition-all duration-300 bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-[rgba(138,43,226,0.1)] hover:border-[rgba(138,43,226,0.3)] hover:shadow-[0_5px_15px_rgba(138,43,226,0.2)]">
      <div className="flex flex-col md:flex-row">
        {/* Profile Picture Section */}
        <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#6A0DAD] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=128&h=128&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            <button 
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#8A2BE2] flex items-center justify-center shadow-lg hover:bg-[#6A0DAD] transition-colors"
              onClick={() => alert('Upload photo functionality would go here')}
            >
              <RiCameraLine className="text-white text-sm" />
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-400">Upload a new photo</p>
          <p className="text-xs text-gray-500">JPG, PNG or GIF (max. 2MB)</p>
        </div>
        
        {/* Form Section */}
        <div className="md:w-2/3 md:pl-8">
          <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  className="w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(138,43,226,0.3)] focus:border-[#8A2BE2] focus:ring-2 focus:ring-[rgba(138,43,226,0.2)] outline-none transition-all" 
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  className="w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(138,43,226,0.3)] focus:border-[#8A2BE2] focus:ring-2 focus:ring-[rgba(138,43,226,0.2)] outline-none transition-all" 
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                className="w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(138,43,226,0.3)] focus:border-[#8A2BE2] focus:ring-2 focus:ring-[rgba(138,43,226,0.2)] outline-none transition-all" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  className="w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(138,43,226,0.3)] focus:border-[#8A2BE2] focus:ring-2 focus:ring-[rgba(138,43,226,0.2)] outline-none transition-all" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Date of Birth</label>
                <input 
                  type="text" 
                  name="dob"
                  className="w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(138,43,226,0.3)] focus:border-[#8A2BE2] focus:ring-2 focus:ring-[rgba(138,43,226,0.2)] outline-none transition-all" 
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
              <textarea 
                name="bio"
                className="w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(138,43,226,0.3)] focus:border-[#8A2BE2] focus:ring-2 focus:ring-[rgba(138,43,226,0.2)] outline-none transition-all h-24"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-[#8A2BE2] hover:bg-opacity-90 text-white py-2 px-6 rounded-lg whitespace-nowrap transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;