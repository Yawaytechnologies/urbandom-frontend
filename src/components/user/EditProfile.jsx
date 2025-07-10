import React, { useState } from 'react';

const EditProfile = () => {
  const [name, setName] = useState('Sathish');
  const [email, setEmail] = useState('gpraveenganesh2000@gmail.com');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const isValidPhone = phone.length === 10 && /^\d+$/.test(phone);

  const handlePhoneSave = () => {
    if (isValidPhone) {
      alert('Phone number saved!');
    }
  };

  const handlePasswordSave = () => {
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    alert('Password saved!');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-3xl">
          👤
        </div>
      </div>

      {/* Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          className="border rounded px-4 py-2 text-sm w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className="border rounded px-4 py-2 text-sm w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <button className="mb-6 bg-purple-600 text-white text-sm px-5 py-2 rounded hover:bg-purple-700">
        Save Changes
      </button>

      {/* Phone Number */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Change Phone Number</label>
        <div className="flex gap-4">
          <input
            type="text"
            className="border rounded px-4 py-2 text-sm w-full"
            placeholder="New Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />
          <button
            onClick={handlePhoneSave}
            disabled={!isValidPhone}
            className={`text-sm px-5 py-2 rounded transition ${
              isValidPhone
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
        <div className="flex gap-4">
          <input
            type="password"
            className="border rounded px-4 py-2 text-sm w-full"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handlePasswordSave}
            className="text-sm bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
