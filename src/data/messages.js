export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv1',
    creatorId: 'c1',
    name: 'Elena Rostova',
    handle: 'elenarostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    online: true,
    lastSeen: 'Active now',
    verified: true,
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: 'creator',
        text: 'Harsh, welcome to the Inner Circle! I just uploaded the raw TIFF color files from the Milan campaign.',
        time: '10:14 AM',
        isMedia: false
      },
      {
        id: 'm2',
        sender: 'user',
        text: 'Elena, the grading on shot #3 is masterclass. Did you use the 50mm Summilux on that?',
        time: '10:18 AM',
        isMedia: false
      },
      {
        id: 'm3',
        sender: 'creator',
        text: 'Exactly right! Here is the lighting diagram from our gaffer on set 📸',
        time: '10:22 AM',
        isMedia: true,
        mediaUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'm4',
        sender: 'creator',
        text: 'Let me know if you want the custom LUT bundle exported for DaVinci Resolve!',
        time: '10:23 AM',
        isMedia: false
      }
    ]
  },
  {
    id: 'conv2',
    creatorId: 'c3',
    name: 'Aria Thorne',
    handle: 'ariathorne',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    online: false,
    lastSeen: '14m ago',
    verified: true,
    unreadCount: 0,
    messages: [
      {
        id: 'm2-1',
        sender: 'user',
        text: 'Aria, your recovery protocol shaved 15% off my cortisol spikes during fasting.',
        time: 'Yesterday',
        isMedia: false
      },
      {
        id: 'm2-2',
        sender: 'creator',
        text: 'Incredible progress Harsh! Keep the cold plunges locked at 3 mins @ 4°C.',
        time: 'Yesterday',
        isMedia: false
      },
      {
        id: 'm2-3',
        sender: 'system_tip',
        text: 'You sent a $50 tip with note: "For the elite protocol 🔥"',
        time: 'Yesterday',
        amount: '$50.00'
      }
    ]
  },
  {
    id: 'conv3',
    creatorId: 'c2',
    name: 'Julian Vance',
    handle: 'julianvance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    online: true,
    lastSeen: 'Active now',
    verified: true,
    unreadCount: 1,
    messages: [
      {
        id: 'm3-1',
        sender: 'creator',
        text: 'Dropped 4 new analog synthesizer patches into the VIP folder. Test them out on your monitors!',
        time: '2 days ago',
        isMedia: false
      }
    ]
  },
  {
    id: 'conv4',
    creatorId: 'c4',
    name: 'Marcus Sterling',
    handle: 'marcus.sterling',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    online: false,
    lastSeen: '3h ago',
    verified: true,
    unreadCount: 0,
    messages: [
      {
        id: 'm4-1',
        sender: 'creator',
        text: 'Q3 Macro memo is live on the terminal. Check section 4 on physical gold rehypothecation.',
        time: 'Sep 24',
        isMedia: false
      }
    ]
  }
];
