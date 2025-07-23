import React, { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';

const EditProfile = () => {
  const [name, setName] = useState('Sathish');
  const [email, setEmail] = useState('gpraveenganesh2000@gmail.com');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const isValidPhone = phone.length === 10 && /^\d+$/.test(phone);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneSave = () => {
    if (isValidPhone) alert('📱 Phone number saved!');
  };

  const handlePasswordSave = () => {
    if (password.length < 6) {
      alert('🔐 Password must be at least 6 characters');
    } else {
      alert('🔒 Password saved!');
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 py-6 max-w-3xl mx-auto bg-white rounded-3xl shadow-lg mt-4">
      {/* Profile Avatar */}
      <div className="flex flex-col items-center mb-8">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <div
          className="w-24 h-24 rounded-full border-4 border-purple-200 bg-purple-50 overflow-hidden relative cursor-pointer hover:scale-105 transition"
          onClick={() => fileInputRef.current.click()}
        >
          {profileImage ? (
            <img src={profileImage} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl flex items-center justify-center h-full text-purple-600">👤</span>
          )}
          <div className="absolute bottom-1 right-1 bg-purple-600 p-1 rounded-full">
            <FaCamera className="text-white text-xs" />
          </div>
        </div>
        <p className="text-lg font-semibold mt-3 break-words text-center">{name}</p>
        <p className="text-sm text-gray-500 text-center break-words">{email}</p>
      </div>

      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=" "
            className="peer w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          />
          <label className="absolute left-4 top-2 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
            Full Name
          </label>
        </div>
        <div className="relative">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          />
          <label className="absolute left-4 top-2 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
            Email Address
          </label>
        </div>
      </div>

      <button className="w-full mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg shadow hover:opacity-90 transition text-sm sm:text-base">
        💾 Save Profile
      </button>

      <hr className="mb-6" />

      {/* Phone Update */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          📱 Update Phone Number
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="10-digit phone"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-purple-400 focus:outline-none"
          />
          <button
            onClick={handlePhoneSave}
            disabled={!isValidPhone}
            className={`px-4 py-2 text-sm rounded-lg shadow transition ${
              isValidPhone
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </div>

      {/* Password Update */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          🔐 Change Password
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="password"
            placeholder="Min 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-purple-400 focus:outline-none"
          />
          <button
            onClick={handlePasswordSave}
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
