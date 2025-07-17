import React, { useState } from 'react';
import { FaRegEye, FaRegHeart, FaHistory, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../../pages/auth/userlogin';
import SignUpModal from '../../pages/auth/usersignup';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const activityCounts = {
    contacted: 2,
    seen: 5,
    saved: 3,
    recent: 8,
  };

  const activities = [
    { key: 'contacted', label: 'Contacted', icon: <FaEnvelope />, color: '#7c3aed' },
    { key: 'seen', label: 'Seen', icon: <FaRegEye />, color: '#6366f1' },
    { key: 'saved', label: 'Saved', icon: <FaRegHeart />, color: 'var(--accent)' },
    { key: 'recent', label: 'Recent', icon: <FaHistory />, color: 'gray' },
  ];

  const handleNavigate = (type) => {
    navigate(`/activity?type=${type}`);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full max-w-[80vw] md:w-80 shadow-xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--primary-light)', color: 'var(--foreground)' }}
      >
        <button onClick={onClose} className="absolute top-3 right-4 text-xl">✕</button>

        <div className="p-6 pt-12">
          <p className="text-lg font-semibold mb-4">Hello 👋</p>

          <button
            onClick={() => setShowLoginModal(true)}
            className="mb-6 px-6 py-2 bg-green-600 text-white rounded-full w-full"
          >
            Login
          </button>

          <p className="font-semibold mb-4">My Activity</p>
          <div className="grid grid-cols-2 gap-3 text-center">
            {activities.map(({ key, label, icon, color }) => (
              <div
                key={key}
                onClick={() => handleNavigate(key)}
                className="rounded-lg p-3 cursor-pointer transition-all hover:bg-gray-200"
                style={{ backgroundColor: '#f3f4f6' }}
              >
                <div style={{ color }} className="text-xl mb-1">{icon}</div>
                <p className="text-sm">{label}</p>
                <p className="text-sm font-bold">{activityCounts[key] || 0}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSignupClick={() => {
            setShowLoginModal(false);
            setShowSignUpModal(true);
          }}
        />
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <SignUpModal
          isOpen={showSignUpModal}
          onClose={() => setShowSignUpModal(false)}
          onLoginClick={() => {
            setShowSignUpModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
};
export default Sidebar;
