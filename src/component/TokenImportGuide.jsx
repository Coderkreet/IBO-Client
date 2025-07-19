import { useState, useEffect, useRef } from 'react';
import { Copy, Wallet, CheckCircle, ArrowRight, ArrowLeft, Zap, Shield, Globe, Sparkles } from 'lucide-react';

const TokenImportGuide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copied, setCopied] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const sliderRef = useRef(null);
  const heroRef = useRef(null);
  const tokenCardRef = useRef(null);
  const walletSliderRef = useRef(null);
  const quickActionsRef = useRef(null);
  const particlesRef = useRef(null);

  // Mock token data (replace with your API call)
  const [tokenData, setTokenData] = useState([{
    tokenName: 'IBOCOIN',
    symbol: 'XIO',
    decimals: '18',
    address: '0x1234567890123456789012345678901234567890',
    network: 'Ethereum'
  }]);

  const tokenDetails = tokenData[0] || {
    tokenName: '-',
    symbol: '-',
    decimals: '-',
    address: '-',
    network: '-'
  };

  const wallets = [
    {
      name: "MetaMask",
      icon: "🦊",
      color: "from-orange-500 to-yellow-500",
      steps: [
        "Open MetaMask extension",
        "Click on 'Import tokens' at the bottom",
        "Select 'Custom Token' tab",
        "Paste the contract address",
        "Token symbol and decimals will auto-fill",
        "Click 'Add Custom Token'"
      ]
    },
    {
      name: "Trust Wallet",
      icon: "🔷",
      color: "from-blue-500 to-cyan-500",
      steps: [
        "Open Trust Wallet app",
        "Tap the '+' icon in top right",
        "Search for 'IBOCOIN' or paste contract",
        "Toggle on the token",
        "Token will appear in your wallet"
      ]
    },
    {
      name: "Other Web3 Wallets",
      icon: "🌐",
      color: "from-purple-500 to-pink-500",
      steps: [
        "Open your Web3 wallet",
        "Look for 'Add Token' or 'Custom Token'",
        "Paste the contract address",
        "Verify token details",
        "Confirm to add the token"
      ]
    }
  ];

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % wallets.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + wallets.length) % wallets.length);
  };

  // Initialize animations
  useEffect(() => {
    // Mock GSAP-like animations with CSS transitions and transforms
    const initAnimations = () => {
      setIsLoaded(true);
      
      // Stagger animations for different sections
      const sections = [heroRef.current, tokenCardRef.current, walletSliderRef.current, quickActionsRef.current];
      
      sections.forEach((section, index) => {
        if (section) {
          setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
          }, index * 200);
        }
      });

      // Animate particles
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((particle, index) => {
          setTimeout(() => {
            particle.style.opacity = '0.6';
            particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
          }, index * 50);
        });
      }
    };

    const timer = setTimeout(initAnimations, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: x * 20, y: y * 20 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#120540] via-[#1b0a2d] to-[#433C73] min-h-screen">
      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid with Parallax */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />

        {/* Floating Particles with Enhanced Animation */}
        <div ref={particlesRef} className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-0 transition-all duration-1000"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, ${['#9333ea', '#ec4899', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]}, transparent)`,
                transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
                filter: 'blur(0.5px)',
                boxShadow: `0 0 20px ${['#9333ea', '#ec4899', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]}40`
              }}
            />
          ))}
        </div>

        {/* Enhanced Glowing Orbs */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #9333ea40 0%, transparent 70%)',
            top: '5%',
            left: '5%',
            transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
            animation: 'pulse 6s ease-in-out infinite'
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #ec489940 0%, transparent 70%)',
            bottom: '5%',
            right: '5%',
            transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`,
            animation: 'pulse 8s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-8 py-16 max-w-7xl mx-auto">
        {/* Enhanced Hero Section */}
        <div 
          ref={heroRef}
          className="text-center mb-20 opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                <Sparkles className="absolute top-2 right-2 w-4 h-4 animate-spin" />
                XIO
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent relative">
            Import IBOCOIN to Your Wallet
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-2xl -z-10 animate-pulse rounded-lg"></div>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Follow our enhanced step-by-step guide to seamlessly add IBOCOIN to MetaMask, Trust Wallet, and other Web3 wallets
          </p>
        </div>

        {/* Enhanced Token Details Card */}
        <div 
          ref={tokenCardRef}
          className="opacity-0 transform translate-y-10 transition-all duration-1000 mb-20"
        >
          <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl relative group hover:shadow-purple-500/25 transition-all duration-700">
            {/* Animated Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/50 to-pink-600/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-sm"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>

            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <div className="relative mr-4">
                <Wallet className="text-purple-400 transform group-hover:rotate-12 transition-transform duration-300" size={32} />
                <div className="absolute inset-0 bg-purple-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              Token Details
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  { label: "Token Name", value: tokenDetails.tokenName, icon: "🪙" },
                  { label: "Symbol", value: tokenDetails.symbol, icon: "💎" },
                  { label: "Decimals", value: tokenDetails.decimals, icon: "🔢" }
                ].map((item, index) => (
                  <div key={index} className="group/item">
                    <div className="flex justify-between items-center p-6 bg-black/40 rounded-xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-gray-300 font-medium text-lg">{item.label}:</span>
                      </div>
                      <span className="text-white font-bold text-lg group-hover/item:text-purple-300 transition-colors">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="group/contract">
                  <div className="p-6 bg-black/40 rounded-xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📋</span>
                        <span className="text-gray-300 font-medium text-lg">Contract Address:</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(tokenDetails.address, 'contract')}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-300 text-white font-medium transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group"
                      >
                        {copied === 'contract' ? (
                          <CheckCircle size={18} className="text-green-400 animate-bounce" />
                        ) : (
                          <Copy size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                        )}
                        <span className="text-sm">
                          {copied === 'contract' ? 'Copied!' : 'Copy'}
                        </span>
                      </button>
                    </div>
                    <div className="text-white font-mono text-sm break-all bg-black/60 p-4 rounded-lg group-hover/contract:bg-black/80 transition-all duration-300 border border-purple-500/20">
                      {tokenDetails.address}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-6 bg-black/40 rounded-xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌐</span>
                    <span className="text-gray-300 font-medium text-lg">Network:</span>
                  </div>
                  <span className="text-white font-bold text-lg">{tokenDetails.network}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Wallet Slider */}
        <div 
          ref={walletSliderRef}
          className="opacity-0 transform translate-y-10 transition-all duration-1000 mb-20"
        >
          <h2 className="text-4xl font-bold mb-12 text-center relative">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Choose Your Wallet
            </span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
          </h2>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative overflow-hidden rounded-3xl">
              <div
                ref={sliderRef}
                className="flex transition-all duration-700 ease-out"
                style={
                  window.innerWidth >= 640
                    ? { transform: `translateX(-${currentSlide * 100}%)` }
                    : {}
                }
              >
                {wallets.map((wallet, index) => (
                  <div
                    key={index}
                    className={`w-full flex-shrink-0 ${
                      window.innerWidth < 640
                        ? currentSlide === index
                          ? 'block'
                          : 'hidden'
                        : ''
                    }`}
                  >
                    <div className={`bg-gradient-to-br ${wallet.color} p-1 rounded-3xl shadow-2xl transition-all duration-500 ${currentSlide === index ? 'scale-100' : 'scale-95'}`}>
                      <div className="bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden min-h-[500px]">
                        {/* Enhanced Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(147, 51, 234, 0.2) 4px, rgba(147, 51, 234, 0.2) 8px)`
                          }}></div>
                        </div>

                        <div className="text-center mb-10 relative z-10">
                          <div className="mb-6 transform hover:scale-110 transition-transform duration-300 cursor-pointer flex justify-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-4xl shadow-2xl">
                              {wallet.icon}
                            </div>
                          </div>
                          <h3 className="text-4xl font-bold text-white mb-3">{wallet.name}</h3>
                          <p className="text-gray-300 text-lg">Step-by-step import guide</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                          {wallet.steps.map((step, stepIndex) => (
                            <div 
                              key={stepIndex} 
                              className="bg-black/50 rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group/step backdrop-blur-sm"
                              style={{ 
                                animationDelay: `${stepIndex * 0.1}s`,
                                transform: `translateY(${isLoaded ? '0' : '20px'})`,
                                opacity: isLoaded ? '1' : '0'
                              }}
                            >
                              <div className="flex items-start space-x-4">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${wallet.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 transform group-hover/step:rotate-12 transition-transform duration-300 shadow-lg`}>
                                  {stepIndex + 1}
                                </div>
                                <p className="text-gray-300 leading-relaxed group-hover/step:text-white transition-colors duration-300">{step}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Navigation */}
            <div className="flex justify-center items-center mt-10 gap-6">
              <div className="flex space-x-3">
                {wallets.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                      index === currentSlide
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div 
          ref={quickActionsRef}
          className="opacity-0 transform translate-y-10 transition-all duration-1000 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Shield,
              color: "from-green-900/60 to-emerald-900/60",
              borderColor: "border-green-500/30",
              iconColor: "text-green-400",
              title: "Verify Token",
              description: "Always verify the contract address before adding any token to ensure security",
              emoji: "🛡️"
            },
            {
              icon: Globe,
              color: "from-blue-900/60 to-cyan-900/60",
              borderColor: "border-blue-500/30",
              iconColor: "text-blue-400",
              title: "Official Links",
              description: "Only use official IBOCOIN website and verified social media channels",
              emoji: "🔗"
            },
            {
              icon: Zap,
              color: "from-purple-900/60 to-pink-900/60",
              borderColor: "border-purple-500/30",
              iconColor: "text-purple-400",
              title: "Need Help?",
              description: "Join our community for support, updates, and assistance",
              emoji: "⚡"
            }
          ].map((item, index) => (
            <div key={index} className={`bg-gradient-to-br ${item.color} backdrop-blur-xl rounded-2xl p-8 ${item.borderColor} border text-center group hover:border-opacity-80 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden`}>
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 text-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                {item.emoji}
              </div>

              <div className="relative z-10">
                <div className="relative mb-6 inline-block">
                  <item.icon size={56} className={`${item.iconColor} mx-auto transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
                  <div className={`absolute inset-0 ${item.iconColor} blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300`}></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          50% { 
            transform: translateY(-30px) rotate(180deg) scale(1.1); 
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.4; 
            transform: scale(1.05); 
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced hover effects */
        .group:hover .animate-spin {
          animation-duration: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default TokenImportGuide;