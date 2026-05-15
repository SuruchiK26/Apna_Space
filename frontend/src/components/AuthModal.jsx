import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { authLoading } = useAuth();

  const handleRegisterSuccess = () => {
    setRegisterSuccess(true);
    setIsLogin(true); // Switch to login after register
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing on outside click
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin ? "Sign in to your account" : "Join our community"}
            </p>
            {registerSuccess && isLogin && (
              <p className="text-green-600 mt-2 text-sm">
                Registration successful! Please sign in.
              </p>
            )}
          </div>

          {isLogin ? <LoginForm /> : <RegisterForm onSuccess={handleRegisterSuccess} />}

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setRegisterSuccess(false);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              disabled={authLoading}
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;