import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Wallet2 } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import WelcomeSection from '../components/auth/WelcomeSection';

function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');

  useEffect(() => {
    setIsLogin(searchParams.get('mode') !== 'signup');
  }, [searchParams]);

  const toggleForm = () => {
    navigate(`/auth?mode=${isLogin ? 'signup' : 'login'}`);
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-crypto-dark text-white overflow-hidden">
      {/* <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div> */}
      
      <Link 
        to="/" 
        className="fixed top-6 left-6 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors z-50 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>

      <div className="flex min-h-screen">
        <WelcomeSection isLogin={isLogin} />

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <motion.div 
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="relative p-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-crypto-dark p-3 rounded-2xl border border-gray-800">
                    <Wallet2 className="h-12 w-12 text-indigo-400" />
                  </div>
                </div>
              </motion.div>
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isLogin ? 'Welcome Back!' : 'Register Your Company'}
              </motion.h1>
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {isLogin 
                  ? 'Enter your credentials to access your account' 
                  : 'Create an employer account to manage payroll'}
              </motion.p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isLogin ? <LoginForm /> : <SignupForm />}
              </motion.div>
            </AnimatePresence>

            <motion.div 
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isLogin ? (
                <button
                  onClick={toggleForm}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Register your company
                </button>
              ) : (
                <button
                  onClick={toggleForm}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Already have an account? Login
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;