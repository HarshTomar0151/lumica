import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { CREATORS, CURRENT_USER } from '../data/creators';
import { INITIAL_POSTS } from '../data/posts';
import { INITIAL_CONVERSATIONS } from '../data/messages';
import { ANALYTICS_DATA } from '../data/analytics';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Splash & Onboarding State
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Authentication & Role State (Default to Guest / Unauthenticated flow)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('guest'); // subscriber | creator | admin | guest
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // login | register | forgot
  const [authScreen, setAuthScreen] = useState('landing'); // landing | login | signup | forgot
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState('home'); // home, discover, create, messages, profile, dashboard, wallet, analytics, settings, billing, admin
  const [isCreatorMode, setIsCreatorMode] = useState(false);

  // Data
  const [creators, setCreators] = useState(CREATORS);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [analytics, setAnalytics] = useState(ANALYTICS_DATA);
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);

  // Subscriptions & Likes
  const [userSubscriptions, setUserSubscriptions] = useState(['c1', 'c3']);
  const [likedPosts, setLikedPosts] = useState(new Set(['p3']));

  // Detail / Overlay Views
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeStory, setActiveStory] = useState(null);

  // Modals & Bottom Sheets
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeTarget, setSubscribeTarget] = useState(null);

  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [tipTarget, setTipTarget] = useState(null);

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Creator Tools Modals
  const [isMassDMOpen, setIsMassDMOpen] = useState(false);
  const [isShareLinkOpen, setIsShareLinkOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isSubManagerOpen, setIsSubManagerOpen] = useState(false);
  const [isContentLibraryOpen, setIsContentLibraryOpen] = useState(false);

  // Toast
  const showToast = (message, icon = '✨') => {
    toast(message, {
      icon,
      duration: 3200,
      position: 'top-center'
    });
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#FF9A3D', '#FFB15C', '#E87524', '#FFFFFF', '#FFD199']
      });
    } catch (e) {}
  };

  // Auth Functions
  const loginUser = (email, role = 'subscriber') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setIsCreatorMode(role === 'creator');
    setIsAuthModalOpen(false);
    setActiveTab(role === 'creator' ? 'dashboard' : (role === 'admin' ? 'admin' : 'home'));
  };

  const registerUser = (userData) => {
    setCurrentUser(prev => ({
      ...prev,
      name: userData.name || prev.name,
      email: userData.email || prev.email,
    }));
    setIsLoggedIn(true);
    setUserRole(userData.role || 'subscriber');
    setIsCreatorMode(userData.role === 'creator');
    setIsAuthModalOpen(false);
    setActiveTab(userData.role === 'creator' ? 'dashboard' : 'home');
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUserRole('guest');
    setAuthScreen('login');
    setActiveTab('home');
    showToast('Logged out of session', '🔒');
  };

  const switchToPatronFeed = () => {
    setIsCreatorMode(false);
    setUserRole('subscriber');
    setActiveTab('home');
    setSelectedCreator(null);
    setSelectedChat(null);
    showToast('Switched to Patron Feed', '👁️');
  };

  const switchToCreatorStudio = () => {
    setIsCreatorMode(true);
    setUserRole('creator');
    setActiveTab('dashboard');
    setSelectedCreator(null);
    setSelectedChat(null);
    showToast('Switched to Creator Studio PRO', '⚡');
  };

  const updateCurrentUser = (updatedFields) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const navigateTo = (tab) => {
    setActiveTab(tab);
    if (['home', 'discover', 'messages', 'profile', 'dashboard', 'admin'].includes(tab)) {
      setSelectedCreator(null);
      setSelectedChat(null);
    }
  };

  const openCreatorProfile = (creator) => {
    setSelectedCreator(creator);
  };

  const closeCreatorProfile = () => {
    setSelectedCreator(null);
  };

  const openChat = (conversation) => {
    setSelectedCreator(null);
    setActiveTab('messages');
    setSelectedChat(conversation);
  };

  const closeChat = () => {
    setSelectedChat(null);
  };

  const openSubscribeSheet = (creator) => {
    setSubscribeTarget(creator);
    setIsSubscribeModalOpen(true);
  };

  const closeSubscribeSheet = () => {
    setIsSubscribeModalOpen(false);
    setSubscribeTarget(null);
  };

  const handleSubscribe = (creator, tierName = 'Standard Tier', price = 9.99) => {
    if (!userSubscriptions.includes(creator.id)) {
      setUserSubscriptions(prev => [...prev, creator.id]);
    }
    setPosts(prev => prev.map(p => {
      if (p.creatorId === creator.id) {
        return { ...p, isLocked: false };
      }
      return p;
    }));

    triggerConfetti();
    showToast(`Subscribed to ${creator.name} (${tierName})! Auto-renews monthly.`, '💎');
    closeSubscribeSheet();
  };

  const handleCancelSubscription = (creatorId) => {
    setUserSubscriptions(prev => prev.filter(id => id !== creatorId));
    setPosts(prev => prev.map(p => {
      if (p.creatorId === creatorId && p.isPremium) {
        return { ...p, isLocked: true };
      }
      return p;
    }));
  };

  const openTipSheet = (target) => {
    setTipTarget(target);
    setIsTipModalOpen(true);
  };

  const closeTipSheet = () => {
    setIsTipModalOpen(false);
    setTipTarget(null);
  };

  const handleSendTip = (amount, note = '') => {
    triggerConfetti();
    const adminCut = (amount * 0.085).toFixed(2);
    const creatorNet = (amount - amount * 0.085).toFixed(2);
    showToast(`Sent $${amount} tip! ($${creatorNet} to creator, $${adminCut} platform fee)`, '⚡');
    
    const newTx = {
      id: `tx_${Date.now()}`,
      title: `Tip received from Harshvardhan`,
      source: note ? `Note: "${note}" (8.5% fee applied)` : 'Direct post tip',
      date: 'Just now',
      type: 'tip',
      amount: `+$${creatorNet}`,
      positive: true
    };
    setAnalytics(prev => ({
      ...prev,
      transactions: [newTx, ...prev.transactions]
    }));
    closeTipSheet();
  };

  const handleToggleLike = (postId) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      const isLiked = next.has(postId);
      if (isLiked) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      
      setPosts(currentPosts => currentPosts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            likes: isLiked ? p.likes - 1 : p.likes + 1,
            hasLiked: !isLiked
          };
        }
        return p;
      }));

      return next;
    });
  };

  const handleCreatePost = (newPostData) => {
    const newPost = {
      id: `p_${Date.now()}`,
      creatorId: 'c_harsh',
      creatorName: currentUser.name,
      creatorHandle: currentUser.handle,
      creatorAvatar: currentUser.avatar,
      verified: true,
      timeAgo: 'Just now',
      image: newPostData.image || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      caption: newPostData.caption || 'Exclusive drop for patrons.',
      category: newPostData.category || 'Luxury Lifestyle',
      isLocked: newPostData.isLocked || false,
      isPremium: true,
      likes: 0,
      hasLiked: false,
      commentsCount: 0,
      tipsCount: 0,
      totalTips: '$0',
      tags: ['#NewDrop', '#Exclusive', '#LuminaCreator'],
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);
    triggerConfetti();
    showToast('Publication added to your patron vault!', '🚀');
    setIsCreateModalOpen(false);
  };

  const handleCompleteChallenge = (challengeId) => {
    setAnalytics(prev => ({
      ...prev,
      dailyChallenges: prev.dailyChallenges.map(ch => 
        ch.id === challengeId ? { ...ch, completed: true } : ch
      )
    }));
    triggerConfetti();
    showToast('Daily Challenge Completed! +50 XP', '🏆');
  };

  const handleRequestPayout = (amount) => {
    const adminFee = (amount * 0.085).toFixed(2);
    const netDeposit = (amount - adminFee).toFixed(2);
    
    setAnalytics(prev => ({
      ...prev,
      revenueSummary: {
        ...prev.revenueSummary,
        pendingPayout: `$${(1240 + parseFloat(amount)).toLocaleString()}`
      },
      transactions: [
        {
          id: `tx_${Date.now()}`,
          title: `Stripe Payout to Chase Bank (••4821)`,
          source: `Gross: $${amount} (8.5% admin fee -$${adminFee})`,
          date: 'Just now',
          type: 'payout',
          amount: `-$${parseFloat(amount).toFixed(2)}`,
          positive: false
        },
        ...prev.transactions
      ]
    }));
    triggerConfetti();
    showToast(`Payout of $${netDeposit} ($${adminFee} admin fee) sent to Stripe!`, '🏦');
    setIsWithdrawModalOpen(false);
  };

  return (
    <AppContext.Provider value={{
      showSplash,
      setShowSplash,
      showOnboarding,
      setShowOnboarding,
      isLoggedIn,
      userRole,
      setUserRole,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authMode,
      setAuthMode,
      authScreen,
      setAuthScreen,
      isForgotModalOpen,
      setIsForgotModalOpen,
      loginUser,
      registerUser,
      logoutUser,
      switchToPatronFeed,
      switchToCreatorStudio,
      updateCurrentUser,
      activeTab,
      setActiveTab,
      navigateTo,
      isCreatorMode,
      setIsCreatorMode,
      creators,
      posts,
      setPosts,
      conversations,
      analytics,
      currentUser,
      userSubscriptions,
      likedPosts,
      selectedCreator,
      openCreatorProfile,
      closeCreatorProfile,
      selectedChat,
      openChat,
      closeChat,
      activeStory,
      setActiveStory,
      isSubscribeModalOpen,
      subscribeTarget,
      openSubscribeSheet,
      closeSubscribeSheet,
      handleSubscribe,
      handleCancelSubscription,
      isTipModalOpen,
      tipTarget,
      openTipSheet,
      closeTipSheet,
      handleSendTip,
      isWithdrawModalOpen,
      setIsWithdrawModalOpen,
      isCreateModalOpen,
      setIsCreateModalOpen,
      isNotificationOpen,
      setIsNotificationOpen,
      isMassDMOpen,
      setIsMassDMOpen,
      isShareLinkOpen,
      setIsShareLinkOpen,
      isEditProfileOpen,
      setIsEditProfileOpen,
      isSubManagerOpen,
      setIsSubManagerOpen,
      isContentLibraryOpen,
      setIsContentLibraryOpen,
      handleToggleLike,
      handleCreatePost,
      handleCompleteChallenge,
      handleRequestPayout,
      showToast,
      triggerConfetti
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
