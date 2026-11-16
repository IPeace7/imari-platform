import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Recycle,
  Leaf,
  RefreshCw,
  ArrowLeft,
} from 'lucide-react';
import { ImariLogo } from '../components/ImariLogo';
import { AppRoute } from '../types';

interface AuthPageProps {
  mode: 'login' | 'signup';
  onSwitchMode: (mode: 'login' | 'signup') => void;
  onSuccessAuth: (name: string, email: string) => void;
  onNavigate: (route: AppRoute) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  mode,
  onSwitchMode,
  onSuccessAuth,
  onNavigate,
}) => {
  const isLogin = mode === 'login';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setForgotMsg('');

    if (!isLogin && !fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!isLogin && !agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    const displayName =
      fullName.trim() ||
      email
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    onSuccessAuth(displayName, email.trim());
  };

  const handleGoogleDemo = () => {
    onSuccessAuth('Amina Uwase', 'amina.uwase@imari.rw');
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row relative overflow-hidden">
      {/* Top-right sweeping green corner accent matching Figma */}
      <svg
        className="hidden lg:block pointer-events-none absolute top-0 right-0 w-36 h-44 z-10"
        viewBox="0 0 140 180"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="topRightCornerGreen" x1="0" y1="0" x2="140" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0C6B2E" />
            <stop offset="100%" stopColor="#043D1A" />
          </linearGradient>
        </defs>
        <path d="M140 0H20C55 58 88 112 140 160V0Z" fill="url(#topRightCornerGreen)" />
        <path d="M140 0H65C92 42 115 80 140 112V0Z" fill="#22C55E" fillOpacity="0.18" />
      </svg>

      {/* Left Curved Green Brand Panel (48% desktop split with sweeping convex wave) */}
      <div className="relative lg:w-[48%] text-white px-8 py-12 sm:px-14 lg:px-16 lg:py-14 flex flex-col justify-between overflow-hidden shrink-0">
        {/* Background gradient base + sweeping convex right-edge curve + organic inner ribbons */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#64BF31] via-[#0B6627] to-[#023A18]"
          aria-hidden="true"
        />

        {/* Luminous diagonal emerald sweep */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 600 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="topLeftLimeGlow" cx="12%" cy="10%" r="55%">
              <stop offset="0%" stopColor="#84CC16" stopOpacity="0.6" />
              <stop offset="55%" stopColor="#16A34A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#064E27" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="midArcSweep" x1="0" y1="0" x2="600" y2="650" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#043818" stopOpacity="0.42" />
            </linearGradient>
            <linearGradient id="bottomRibbon" x1="0" y1="680" x2="420" y2="800" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DCFCE7" stopOpacity="0.88" />
              <stop offset="65%" stopColor="#86EFAC" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <rect width="600" height="800" fill="url(#topLeftLimeGlow)" />

          {/* Sweeping translucent inner wave layers */}
          <path
            d="M0 0 H390 C540 160 560 520 430 800 H0 Z"
            fill="url(#midArcSweep)"
          />
          <path
            d="M0 490 C190 430 370 500 520 670 L520 800 H0 Z"
            fill="#043919"
            fillOpacity="0.38"
          />
          <path
            d="M0 645 C145 645 280 715 410 800 H0 Z"
            fill="url(#bottomRibbon)"
          />
          <path
            d="M0 710 C115 710 215 755 315 800 H0 Z"
            fill="#F0FDF4"
            fillOpacity="0.62"
          />
        </svg>

        {/* Convex white mask on the right edge creating the exact rounded crescent split */}
        <svg
          className="hidden lg:block absolute inset-y-0 right-0 h-full w-32 text-white pointer-events-none translate-x-[1px]"
          viewBox="0 0 120 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M120 0 H0 C130 190 130 610 10 800 H120 Z" fill="currentColor" />
        </svg>

        {/* Top discreet Back to Home link */}
        <div className="relative z-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-100/85 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Main Centered Large Logo + Typography + Icons Block */}
        <div className="relative z-10 my-12 lg:my-auto max-w-[460px] pr-6 lg:pr-12">
          {isLogin ? (
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => onNavigate('landing')}
                className="block cursor-pointer focus:outline-none text-left"
                aria-label="IMARI Home"
              >
                <ImariLogo variant="auth-dark-bg" size="lg" />
              </button>

              <h1 className="text-4xl sm:text-[46px] xl:text-[52px] font-extrabold leading-[1.08] tracking-tight whitespace-nowrap">
                Welcome <span className="text-[#4ADE80]">Back!</span>
              </h1>

              <p className="text-base sm:text-[19px] text-white/90 leading-relaxed max-w-sm font-normal">
                Log in to continue managing your waste system.
              </p>

              <div className="pt-2">
                <div className="w-24 h-[2px] bg-white/80 rounded-full" />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                type="button"
                onClick={() => onNavigate('landing')}
                className="block cursor-pointer focus:outline-none text-left"
                aria-label="IMARI Home"
              >
                <ImariLogo variant="auth-dark-bg" size="lg" />
              </button>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-[40px] xl:text-[44px] font-extrabold leading-[1.12] tracking-tight">
                  Join IMARI <br />
                  for a <span className="text-[#4ADE80]">Greener Rwanda</span>
                </h1>
                <p className="text-base sm:text-[18px] text-white/90 leading-relaxed max-w-sm">
                  Be part of a cleaner, greener Rwanda.
                </p>
                <div className="pt-1">
                  <div className="w-20 h-[2px] bg-white/80 rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-3 pt-4">
                <div className="flex flex-col items-center text-center px-2 border-r border-white/25 space-y-2.5">
                  <Recycle className="w-8 h-8 text-[#4ADE80]" strokeWidth={1.8} />
                  <div className="text-[13px] font-medium text-white/95 leading-snug">
                    Reduce <br />
                    Waste
                  </div>
                </div>
                <div className="flex flex-col items-center text-center px-2 border-r border-white/25 space-y-2.5">
                  <Leaf className="w-8 h-8 text-[#4ADE80]" strokeWidth={1.8} />
                  <div className="text-[13px] font-medium text-white/95 leading-snug">
                    Recover <br />
                    Organic Matter
                  </div>
                </div>
                <div className="flex flex-col items-center text-center px-2 space-y-2.5">
                  <RefreshCw className="w-8 h-8 text-[#4ADE80]" strokeWidth={1.8} />
                  <div className="text-[13px] font-medium text-white/95 leading-snug">
                    Build a <br />
                    Circular Rwanda
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 h-6" aria-hidden="true" />
      </div>

      {/* Right White Authentication Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 sm:px-12 relative z-10">
        <div className="w-full max-w-[420px]">
          {/* Top Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-200 mb-8">
            <button
              type="button"
              onClick={() => {
                setError('');
                setForgotMsg('');
                onSwitchMode('login');
              }}
              className={`pb-3 text-sm font-semibold text-center border-b-2 transition-colors cursor-pointer ${
                isLogin
                  ? 'border-[#15803D] text-[#15803D]'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setError('');
                setForgotMsg('');
                onSwitchMode('signup');
              }}
              className={`pb-3 text-sm font-semibold text-center border-b-2 transition-colors cursor-pointer ${
                !isLogin
                  ? 'border-[#15803D] text-[#15803D]'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900">
              {isLogin ? 'Login to IMARI' : 'Create Your Account'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isLogin
                ? 'Enter your details to access your account.'
                : 'Join IMARI and be part of a cleaner, greener Rwanda.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11.5 pl-11 pr-4 rounded-full border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#15803D]"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                placeholder={isLogin ? 'Email address' : 'Email Address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11.5 pl-11 pr-4 rounded-full border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#15803D]"
              />
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11.5 pl-11 pr-11 rounded-full border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#15803D]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-11.5 pl-11 pr-11 rounded-full border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#15803D]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            )}

            {isLogin ? (
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="inline-flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#15803D] cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setForgotMsg(
                      'Password reset instructions sent to your email if an account exists.'
                    )
                  }
                  className="font-semibold text-[#15803D] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer pt-0.5">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#15803D] cursor-pointer"
                />
                <span>
                  I agree to the{' '}
                  <span className="text-[#15803D] font-medium underline">Terms of Service</span>{' '}
                  and <span className="text-[#15803D] font-medium underline">Privacy Policy</span>
                </span>
              </label>
            )}

            {error && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 px-3.5 py-2 text-xs font-medium text-rose-700">
                {error}
              </div>
            )}
            {forgotMsg && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs font-medium text-emerald-800">
                {forgotMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11.5 rounded-full bg-[#15803D] hover:bg-[#116831] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>{isLogin ? 'Log In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleDemo}
            className="w-full h-11.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium inline-flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>{isLogin ? 'Continue with Google' : 'Sign up with Google'}</span>
          </button>

          <p className="text-center text-xs text-slate-500 mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => onSwitchMode(isLogin ? 'signup' : 'login')}
              className="font-semibold text-[#15803D] hover:underline cursor-pointer"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
