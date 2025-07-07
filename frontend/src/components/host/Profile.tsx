import React, { useState, useEffect } from 'react';
import { RiCameraLine } from 'react-icons/ri';
import { useAuthStore } from '../../store/authStore';
import { useAuthService } from '../../services/auth.service';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { profileSchema } from '../../schemas/authSchema';
import { AxiosError } from 'axios';

const PersonalInformation = () => {
  const { user, setUser } = useAuthStore();
  const { updateUserProfile } = useAuthService();

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [initialFormData, setInitialFormData] = useState(formData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      const userData = {
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || ''
      };
      setFormData(userData);
      setInitialFormData(userData);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    try {
      profileSchema.parse(formData);
      setLoading(true);
      const response = await updateUserProfile(user?._id!, formData);
      setUser(response.data); 
      setInitialFormData(formData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path.length > 0) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Failed to update profile.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsEditing(false);
  };

  const hasChanged = Object.keys(formData).some(key => {
    return formData[key as keyof typeof formData] !== initialFormData[key as keyof typeof initialFormData];
  });

  return (
    <div className="rounded-lg p-6 transition-all duration-300 bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-[rgba(138,43,226,0.1)] hover:border-[rgba(138,43,226,0.3)] hover:shadow-[0_5px_15px_rgba(138,43,226,0.2)]">
      <div className="flex flex-col md:flex-row">
        {/* Profile Picture Section */}
        <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#6A0DAD] flex items-center justify-center overflow-hidden">
              <img
                src={user?.avatar || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#8A2BE2] flex items-center justify-center shadow-lg hover:bg-[#6A0DAD] transition-colors"
              onClick={() => toast.info('Upload photo functionality coming soon!')}
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
          {!isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                <div
                  className="w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(138,43,226,0.3)] text-white text-base"
                >
                  {user?.username || 'No username provided.'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                <div
                  className="w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(138,43,226,0.3)] text-white text-base"
                >
                  {user?.email}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                <div
                  className="w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(138,43,226,0.3)] text-white text-base break-words h-24"
                >
                  {user?.bio || 'No bio provided.'}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  className="bg-[#8A2BE2] hover:bg-opacity-90 text-white py-2 px-6 rounded-lg whitespace-nowrap transition-all"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleProfileUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    className={`w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border ${errors.username ? 'border-red-500' : 'border-[rgba(138,43,226,0.3)]'} focus:border-[#8A2BE2] focus:ring-2 focus:ring-[rgba(138,43,226,0.2)] outline-none transition-all`}
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className={`w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border ${errors.email ? 'border-red-500' : 'border-[rgba(138,43,226,0.3)]'} focus:border-[#8A2BE2] focus:ring-2 focus:ring-[rgba(138,43,226,0.2)] outline-none transition-all`}
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                <textarea
                  name="bio"
                  className={`w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.05)] border ${errors.bio ? 'border-red-500' : 'border-[rgba(138,43,226,0.3)]'} focus:border-[#8A2BE2] focus:ring-2 focus:ring-[rgba(138,43,226,0.2)] outline-none transition-all h-24`}
                  value={formData.bio}
                  onChange={handleChange}
                />
                {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  type="button"
                  className="border border-[#8A2BE2] text-[#8A2BE2] py-2 px-6 rounded-lg whitespace-nowrap transition-all hover:bg-[rgba(138,43,226,0.2)]"
                  onClick={handleCancelClick}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#8A2BE2] hover:bg-opacity-90 text-white py-2 px-6 rounded-lg whitespace-nowrap transition-all"
                  disabled={!hasChanged || loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;