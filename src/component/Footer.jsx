import React, { useState, useEffect } from "react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTelegramPlane,
  FaDiscord,
  FaYoutube,
  FaGithub
} from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowRoundForward } from "react-icons/io";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [particles, setParticles] = useState([]);

  // Generate particles for background animation
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.2,
      color: ['#8B5CF6', '#3B82F6', '#EC4899', '#06B6D4'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  const socialLinks = [
    { icon: FaFacebookF, url: "#", name: "Facebook" },
    { icon: FaTwitter, url: "#", name: "Twitter" },
    { icon: FaInstagram, url: "#", name: "Instagram" },
    { icon: FaLinkedinIn, url: "#", name: "LinkedIn" },
    { icon: FaTelegramPlane, url: "#", name: "Telegram" },
    { icon: FaDiscord, url: "#", name: "Discord" }
  ];

  return (
    <footer className="relative w-full bg-black text-white overflow-hidden">
      {/* Animated Background Graphics */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animation: `float ${8 + particle.speed * 5}s ease-in-out infinite`,
              animationDelay: `${particle.id * 0.2}s`
            }}
          />
        ))}

        {/* Animated Lines */}
        <div className="absolute inset-0">
          {/* Horizontal Lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-pulse"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/15 to-transparent animate-pulse delay-2000"></div>
          
          {/* Vertical Lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/15 to-transparent animate-pulse delay-500"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-pulse delay-1500"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-pulse delay-2500"></div>
        </div>

        {/* Curved Animated Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent"/>
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent"/>
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent"/>
              <stop offset="50%" stopColor="#EC4899" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          
          <path d="M0,150 Q300,100 600,150 T1200,150" fill="none" stroke="url(#gradient1)" strokeWidth="2">
            <animate attributeName="d" dur="8s" repeatCount="indefinite" 
              values="M0,150 Q300,100 600,150 T1200,150;M0,150 Q300,200 600,150 T1200,150;M0,150 Q300,100 600,150 T1200,150"/>
          </path>
          
          <path d="M0,300 Q400,250 800,300 T1200,300" fill="none" stroke="url(#gradient2)" strokeWidth="2">
            <animate attributeName="d" dur="12s" repeatCount="indefinite" 
              values="M0,300 Q400,250 800,300 T1200,300;M0,300 Q400,350 800,300 T1200,300;M0,300 Q400,250 800,300 T1200,300"/>
          </path>
          
          <path d="M0,450 Q300,400 600,450 Q900,500 1200,450" fill="none" stroke="url(#gradient3)" strokeWidth="1.5">
            <animate attributeName="d" dur="15s" repeatCount="indefinite" 
              values="M0,450 Q300,400 600,450 Q900,500 1200,450;M0,450 Q300,500 600,450 Q900,400 1200,450;M0,450 Q300,400 600,450 Q900,500 1200,450"/>
          </path>
        </svg>

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 border border-purple-500/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 border border-blue-500/20 transform rotate-45 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 border border-pink-500/15 rounded-full animate-ping-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full animate-bounce-slow"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_1px,_rgba(139,92,246,0.03)_1px)] bg-[length:40px_40px] animate-pulse"></div>
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/4 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute left-1/2 -top-6 transform -translate-x-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-20 hover:shadow-purple-500/50"
        title="Go to top"
      >
        <IoIosArrowUp size={24} className="text-white" />
      </button>

      {/* Main Footer Content */}
      <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">IBO</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Building the future of decentralized finance with cutting-edge blockchain technology and innovative solutions for the modern digital economy.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-white text-lg font-semibold mb-3">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200 text-sm"
                />
                <button
                  onClick={handleSubscribe}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:scale-105 transition-transform duration-200 text-sm"
                >
                  {isSubscribed ? "✓" : "→"}
                </button>
              </div>
            </div>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Wallet
              </a>
              <a href="#products" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Products
              </a>
              <a href="#ecosystem" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Ecosystem
              </a>
              <a href="#roadmap" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Roadmap
              </a>
              <a href="#tokenomics" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Tokenomics
              </a>
              <a href="#events" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Events
              </a>
              <a href="#faq" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                FAQ
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Support</h3>
            <div className="space-y-3">
              <a href="/terms-of-use" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Terms of Use
              </a>
              <a href="/privacy-policy" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Privacy Policy
              </a>
              <a href="/cookie-policy" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Cookie Policy
              </a>
              <a href="/contact-us" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Contact Us
              </a>
              <a href="/blogs" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Blog
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Resources</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Documentation
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                API Reference
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Whitepaper
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Help Center
              </a>
              {/* <a href="/login" className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Admin Login
              </a> */}
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              title={social.name}
              className="group relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
                <social.icon size={18} className="text-white" />
              </div>
            </a>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="text-gray-400 text-sm mb-4">
            Building the future of decentralized finance with innovative blockchain solutions.
          </div>
          <div className="text-gray-500 text-sm">
            © 2024 IBO Ecosystem. All rights reserved.
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;