import React, { useRef, useState } from 'react';

const SidebarPanel = ({ onSelectMenu, user, selected }) => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(user?.photo || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const menuItems = [
    { key: 'editProfile', label: '✏️ Edit Profile' },
   
  ];

  return (
    <div className="w-full sm:w-[250px] bg-white p-6 rounded-2xl shadow-md">
      {/* Avatar & User Info */}
      <div className="flex flex-col items-center text-center mb-6 relative">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <div
          onClick={handleAvatarClick}
          className="w-20 h-20 rounded-full bg-purple-100 overflow-hidden cursor-pointer shadow flex items-center justify-center text-3xl text-purple-700 hover:scale-105 transition"
        >
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            '👤'
          )}
        </div>
        <p className="font-semibold mt-2 text-base">{user?.name || 'Guest User'}</p>
        <p className="text-xs text-gray-500 break-words mt-1">{user?.email || 'guest@example.com'}</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelectMenu(item.key)}
            className={`w-full text-left text-sm font-medium px-3 py-2 rounded transition ${
              selected === item.key
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => onSelectMenu('logout')}
          className="w-full text-left text-sm font-medium px-3 py-2 text-red-500 hover:text-red-600 transition"
        >
          🔓 Log Out
        </button>
      </div>
    </div>
  );
};

export default SidebarPanel;
