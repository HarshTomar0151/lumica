import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Sparkles, 
  Layers, 
  Sun, 
  Smartphone, 
  Maximize2, 
  RotateCcw,
  Zap,
  Shield,
  User,
  LogOut,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import DynamicIsland from './DynamicIsland';
import BottomNav from './BottomNav';
import Home from '../pages/Home';
import Discover from '../pages/Discover';
import Messages from '../pages/Messages';
import Profile from '../pages/Profile';
import CreatorProfile from '../pages/CreatorProfile';
import CreatorDashboard from '../pages/CreatorDashboard';
import Wallet from '../pages/Wallet';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';
import SubscriberBilling from '../pages/SubscriberBilling';
import AdminDashboard from '../pages/AdminDashboard';
import PublicLanding from '../pages/PublicLanding';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ForgotPasswordModal from './ForgotPasswordModal';
import StoryViewer from './StoryViewer';
import SubscriptionSheet from './SubscriptionSheet';
import TipSheet from './TipSheet';
import WithdrawalSheet from './WithdrawalSheet';
import CreatePostSheet from './CreatePostSheet';
import NotificationDrawer from './NotificationDrawer';
import AuthModal from './AuthModal';
import MassDMModal from './MassDMModal';
import ShareLinkModal from './ShareLinkModal';
import EditProfileModal from './EditProfileModal';
import SubscriberManagerSheet from './SubscriberManagerSheet';
import ContentLibrarySheet from './ContentLibrarySheet';
import SplashScreen from './SplashScreen';
import OnboardingWalkthrough from './OnboardingWalkthrough';
import Toast from './Toast';

export default function PhoneFrame() {
  const { 
    showSplash,
    setShowSplash,
    showOnboarding,
    setShowOnboarding,
    isLoggedIn,
    userRole,
    setUserRole,
    activeTab, 
    isCreatorMode, 
    setIsCreatorMode, 
    navigateTo, 
    selectedCreator,
    creators,
    openCreatorProfile,
    openSubscribeSheet,
    openTipSheet,
    setIsCreateModalOpen,
    setIsMassDMOpen,
    setIsShareLinkOpen,
    setIsAuthModalOpen,
    setAuthMode,
    authScreen,
    setAuthScreen,
    setActiveStory,
    showToast
  } = useApp();

  const [currentTime, setCurrentTime] = useState('9:41');
  const [glowIntensity, setGlowIntensity] = useState('rich');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      hours = hours % 12 || 12;
      const minStr = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`${hours}:${minStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Determine which page component to display
  const renderCurrentPage = () => {
    if (!isLoggedIn) {
      if (authScreen === 'login') return <LoginPage />;
      if (authScreen === 'signup') return <SignupPage />;
      return <PublicLanding />;
    }

    if (userRole === 'admin') {
      return <AdminDashboard />;
    }

    if (selectedCreator) {
      return <CreatorProfile creator={selectedCreator} />;
    }

    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'discover':
        return <Discover />;
      case 'messages':
        return <Messages />;
      case 'profile':
        return <Profile />;
      case 'dashboard':
        return <CreatorDashboard />;
      case 'wallet':
        return <Wallet />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      case 'billing':
        return <SubscriberBilling />;
      case 'admin':
        return <AdminDashboard />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'landing':
        return <PublicLanding />;
      default:
        return isCreatorMode ? <CreatorDashboard /> : <Home />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#040302] text-[#F5F1EC] flex flex-col items-center justify-center relative overflow-hidden py-3 sm:py-6 px-2">
      {/* Cinematic Studio Warm Ambient Glows */}
      <div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[850px] rounded-full pointer-events-none transition-all duration-700 ${
          glowIntensity === 'rich'
            ? 'bg-gradient-to-tr from-[#FF9A3D]/18 via-[#E87524]/10 to-transparent blur-[140px] opacity-100'
            : glowIntensity === 'subtle'
            ? 'bg-gradient-to-tr from-[#FF9A3D]/08 via-[#E87524]/04 to-transparent blur-[100px] opacity-70'
            : 'opacity-0'
        }`}
      />
      <div className="fixed top-10 left-1/3 w-[300px] h-[300px] bg-[#FFB15C]/05 blur-[120px] pointer-events-none rounded-full" />
      <div className="fixed bottom-10 right-1/3 w-[350px] h-[350px] bg-[#E87524]/08 blur-[130px] pointer-events-none rounded-full" />

      {/* Main iPhone Device Mockup Shell (desktop/tablet only) - on real mobile viewports the outer bezel is dropped so the fake frame doesn't render inside the real device frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-[390px] h-[844px] max-h-[92vh] sm:max-h-[844px] rounded-[50px] sm:p-[3px] bg-transparent sm:bg-gradient-to-b sm:from-[#4A3E34] sm:via-[#241D17] sm:to-[#120E0B] shadow-none sm:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(255,154,61,0.18)] border-0 sm:border sm:border-white/[0.12] flex flex-col select-none overflow-hidden"
      >
        {/* Inner Titanium Bezel */}
        <div className="relative w-full h-full rounded-none sm:rounded-[47px] bg-[#070503] overflow-hidden flex flex-col border-0 sm:border sm:border-black/80 sm:shadow-inner">
          
          {/* Rich Ambient Luxury Wallpaper Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img
              src="/luxury-bg.jpg"
              alt="Ambient luxury wallpaper"
              className="w-full h-full object-cover opacity-50 scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#070503]/75 via-[#070503]/40 to-[#070503]/85 pointer-events-none" />
          </div>

          {/* Splash Screen */}
          <AnimatePresence>
            {showSplash && (
              <SplashScreen onFinish={() => setShowSplash(false)} />
            )}
          </AnimatePresence>

          {/* Onboarding Walkthrough (Matches client design reference) */}
          <AnimatePresence>
            {!showSplash && showOnboarding && (
              <OnboardingWalkthrough onFinish={() => setShowOnboarding(false)} />
            )}
          </AnimatePresence>

          {/* Protected Top Safe Area & Solid Status Bar Header (No bleedthrough) */}
          <div className="absolute top-0 left-0 right-0 h-14 pt-1 px-7 z-40 flex items-center justify-between text-[13px] font-semibold tracking-tight text-white bg-[#070503] border-b border-white/[0.08] shadow-md shadow-black">
            <span className="font-mono text-xs">{currentTime}</span>

            {/* Dynamic Island */}
            <div className="pointer-events-auto">
              <DynamicIsland />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1.5 text-white/90">
              <Signal size={13} strokeWidth={2.4} />
              <Wifi size={13} strokeWidth={2.4} />
              <div className="relative flex items-center">
                <Battery size={17} strokeWidth={2} className="text-white" />
                <div className="absolute left-[3px] top-[4px] w-[9px] h-[5px] bg-[#FF9A3D] rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Main App Screen Scrollable Area with Full 100px Bottom Clearance & Fluid Transitions */}
          <main className="flex-1 w-full overflow-y-auto no-scrollbar pt-14 pb-[100px] relative z-10">
            <motion.div
              key={selectedCreator ? `creator_${selectedCreator.id}` : (isLoggedIn ? activeTab : `auth_${authScreen}`)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-full"
            >
              {renderCurrentPage()}
            </motion.div>
          </main>

          {/* Floating Glass Bottom Navigation */}
          {isLoggedIn && userRole !== 'admin' && <BottomNav />}

          {/* iPhone Home Indicator Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-50 pointer-events-none" />

          {/* Overlays & Bottom Sheets */}
          <StoryViewer />
          <SubscriptionSheet />
          <TipSheet />
          <WithdrawalSheet />
          <CreatePostSheet />
          <NotificationDrawer />
          <AuthModal />
          <MassDMModal />
          <ShareLinkModal />
          <EditProfileModal />
          <SubscriberManagerSheet />
          <ContentLibrarySheet />
          <ForgotPasswordModal />
          <Toast />
        </div>
      </motion.div>
    </div>
  );
}
