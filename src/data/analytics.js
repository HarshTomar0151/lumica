export const ANALYTICS_DATA = {
  revenueSummary: {
    totalEarnings: '$12,840.50',
    totalEarningsRaw: 12840.50,
    monthlyRevenue: '$8,420.50',
    revenueGrowth: '+18.4%',
    activeSubscribers: '2,481',
    subscribersGrowth: '+12.8%',
    pendingPayout: '$1,240.00',
    lifetimeEarnings: '$48,920.40',
    averageSubscriptionValue: '$14.80',
    conversionRate: '4.6%'
  },
  
  revenueChart7D: [
    { day: 'Mon', revenue: 980, subscribers: 12 },
    { day: 'Tue', revenue: 1420, subscribers: 19 },
    { day: 'Wed', revenue: 1100, subscribers: 14 },
    { day: 'Thu', revenue: 1850, subscribers: 28 },
    { day: 'Fri', revenue: 2100, subscribers: 35 },
    { day: 'Sat', revenue: 1740, subscribers: 22 },
    { day: 'Sun', revenue: 2350, subscribers: 41 }
  ],

  revenueChart30D: [
    { label: 'W1', revenue: 3800 },
    { label: 'W2', revenue: 5400 },
    { label: 'W3', revenue: 7200 },
    { label: 'W4', revenue: 8420 }
  ],

  topPerformingPosts: [
    {
      id: 'p1',
      title: 'Milan Haute Couture Lookbook #04',
      revenue: '$2,840',
      views: '18.4K',
      subscribersGained: 142,
      engagement: '9.2%'
    },
    {
      id: 'p3',
      title: 'Cinematic DaVinci LUT Master Pack',
      revenue: '$1,920',
      views: '12.1K',
      subscribersGained: 89,
      engagement: '8.4%'
    },
    {
      id: 'p5',
      title: 'Studio Lighting Breakdown Masterclass',
      revenue: '$1,450',
      views: '9.8K',
      subscribersGained: 64,
      engagement: '7.8%'
    }
  ],

  dailyChallenges: [
    {
      id: 'ch1',
      number: '01',
      title: 'Post on your feed',
      description: 'Publish 1 high-resolution exclusive photo or reel to keep subscriber engagement peak.',
      completed: true,
      reward: '+50 Reach XP'
    },
    {
      id: 'ch2',
      number: '02',
      title: 'Reply to a DM',
      description: 'Respond to at least 2 VIP subscriber inquiries in the direct message portal.',
      completed: true,
      reward: 'VIP Priority Badge'
    },
    {
      id: 'ch3',
      number: '03',
      title: 'Reply to a comment',
      description: 'Engage with top comments on your latest Milan couture publication.',
      completed: false,
      reward: '+10% Feed Boost'
    }
  ],

  recentActivity: [
    {
      id: 'act1',
      type: 'sub',
      user: 'Sarah Montgomery',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      action: 'subscribed to VIP tier',
      amount: '+$39.99',
      time: '4m ago'
    },
    {
      id: 'act2',
      type: 'tip',
      user: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
      action: 'sent you a generous tip',
      amount: '+$25.00',
      time: '18m ago'
    },
    {
      id: 'act3',
      type: 'views',
      user: 'Milan Vault Post',
      avatar: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=200&auto=format&fit=crop',
      action: 'surpassed 1,240 subscriber views',
      amount: 'Trending 🔥',
      time: '1h ago'
    },
    {
      id: 'act4',
      type: 'sub',
      user: 'Liam Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      action: 'renewed monthly subscription',
      amount: '+$14.99',
      time: '3h ago'
    }
  ],

  transactions: [
    {
      id: 'tx1',
      title: 'VIP Subscription Tier Renewal',
      source: 'Sarah Montgomery',
      date: 'Today, 10:14 AM',
      type: 'subscription',
      amount: '+$39.99',
      positive: true
    },
    {
      id: 'tx2',
      title: 'Post Tip — Milan Lighting Masterclass',
      source: 'Alex Rivera',
      date: 'Today, 09:45 AM',
      type: 'tip',
      amount: '+$25.00',
      positive: true
    },
    {
      id: 'tx3',
      title: 'Direct Bank Payout to Chase Bank (••4821)',
      source: 'Stripe Instant Transfer',
      date: 'Sep 26, 2026',
      type: 'payout',
      amount: '-$4,500.00',
      positive: false
    },
    {
      id: 'tx4',
      title: 'Standard Monthly Tier',
      source: 'Marcus Sterling Fan club',
      date: 'Sep 25, 2026',
      type: 'subscription',
      amount: '+$14.99',
      positive: true
    },
    {
      id: 'tx5',
      title: 'Exclusive Sound Stem Bundle Tip',
      source: 'Felix K.',
      date: 'Sep 24, 2026',
      type: 'tip',
      amount: '+$50.00',
      positive: true
    }
  ],

  stripeConnect: {
    status: 'Connected',
    statusBadge: 'Verified & Active',
    payoutAccount: 'Chase Private Client (Checking ••4821)',
    routingNumber: '•••••0210',
    schedule: 'Daily rolling payouts',
    identityStatus: 'Level 3 KYC Verified',
    nextAutoPayout: 'Tomorrow at 06:00 UTC ($1,240.00)'
  }
};
