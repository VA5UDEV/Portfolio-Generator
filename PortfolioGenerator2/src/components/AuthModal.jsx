import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaTimes } from 'react-icons/fa';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthModal = () => {
  const { 
    authModal, 
    closeAuthModal, 
    login, 
    signup,
    showLogin,
    showSignup
  } = useContext(AuthContext);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {authModal === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        {authModal === 'login' ? (
          <LoginForm 
            onSubmit={login} 
            switchToSignup={showSignup} 
          />
        ) : (
          <SignupForm 
            onSubmit={signup} 
            switchToLogin={showLogin} 
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;