import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const CommunityShowcase: React.FC = () => {
  const userPosts = [
    {
      id: 1,
      user: '@PriyaS',
      location: 'Bangalore',
      image: 'https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: "I can't believe I made this from leftovers! My family loved it 😍",
      likes: 124,
      comments: 23
    },
    {
      id: 2,
      user: '@RahulM',
      location: 'Mumbai',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: "Turned 3 simple ingredients into restaurant-quality meal. Game changer! 🔥",
      likes: 89,
      comments: 15
    },
    {
      id: 3,
      user: '@SnehaK',
      location: 'Delhi',
      image: 'https://images.pexels.com/photos/12737652/pexels-photo-12737652.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: "My husband asked where I ordered this from 😂 It was just dal and rice!",
      likes: 156,
      comments: 31
    },
    {
      id: 4,
      user: '@AmitP',
      location: 'Pune',
      image: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: "Zero food waste this week thanks to JugaadCook! Feeling proud 💚",
      likes: 203,
      comments: 42
    }
  ];

  return (
    <section id="mission" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Community{' '}
            <span style={{ color: 'var(--brand-accent-orange)' }}>Highlights</span>
          </h2>
        </div>

        {/* User Generated Content Feed */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {userPosts.map((post, index) => (
            <div 
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={`Post by ${post.user}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {post.user.charAt(1).toUpperCase()}
                  </div>
                  <div className="ml-2">
                    <p className="font-medium text-sm">{post.user}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{post.location}</p>
                  </div>
                </div>
                <p className="text-sm mb-3 leading-relaxed">{post.quote}</p>
                <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <Share2 className="w-4 h-4 cursor-pointer hover:text-orange-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement Box */}
        <div 
          className="rounded-2xl p-8 lg:p-12 text-center animate-fade-in"
          style={{ backgroundColor: 'var(--background-light-green)' }}
        >
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">
            <span style={{ color: 'var(--brand-accent-green)' }}>Community</span>{' '}
            <span style={{ color: 'var(--brand-accent-orange)' }}>Mission</span>
          </h3>
          <p className="text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Every meal you cook with us is a small victory for your wallet and a big one for the planet. We're on a mission to cut down the 40% of food wasted in India, one delicious meal at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommunityShowcase;