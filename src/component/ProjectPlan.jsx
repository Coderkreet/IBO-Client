import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, Circle, Calendar, Target, Zap, Users, Rocket, Trophy } from "lucide-react";

const roadmapData = {
  "2025": [
    {
      quarter: "Q1",
      milestone: "Token Launch & Exchange Listing",
      status: "completed",
      progress: 100,
      icon: Rocket,
      color: "from-green-400 to-green-600",
      points: [
        "Official launch of IBO Coin on BSC network",
        "Initial listing on PancakeSwap",
        "Smart contract audit completed by CertiK",
        "Launch of IBO project whitepaper v1.0",
      ],
    },
    {
      quarter: "Q2",
      milestone: "Staking Platform & Yield Features",
      status: "in-progress",
      progress: 70,
      icon: Trophy,
      color: "from-blue-400 to-blue-600",
      points: [
        "Launch of staking dashboard with live rewards",
        "LP farming pools activated for BNB/IBO pair",
        "Reward distribution for early backers begins",
        "Security review & performance monitoring",
      ],
    },
    {
      quarter: "Q3",
      milestone: "Ecosystem Integrations & Tools",
      status: "upcoming",
      progress: 0,
      icon: Users,
      color: "from-purple-400 to-purple-600",
      points: [
        "Integration with major Web3 wallets (e.g. Trust Wallet, MetaMask)",
        "Partnership announcements with key DeFi protocols",
        "Beta release of IBO Swap and IBO Wallet",
        "User onboarding with secure KYC-less identity verification",
      ],
    },
  ],
  "2026": [
    {
      quarter: "Q1",
      milestone: "Global Expansion & Compliance",
      status: "upcoming",
      progress: 0,
      icon: Target,
      color: "from-orange-400 to-orange-600",
      points: [
        "Targeted marketing in Europe, SEA, and Middle East",
        "Onboarding to Tier-1 exchanges (e.g. Gate.io, KuCoin)",
        "Begin regional partnerships with fintech platforms",
        "Launch of IBO legal & compliance roadmap",
      ],
    },
    {
      quarter: "Q2",
      milestone: "IBO NFT & Launchpad Rollout",
      status: "upcoming",
      progress: 0,
      icon: Zap,
      color: "from-pink-400 to-pink-600",
      points: [
        "Launchpad support for new crypto startups",
        "Launch of IBO NFT Marketplace & Creator Studio",
        "Minting tools and limited-edition IBO NFTs for holders",
        "Launch of creator/investor airdrop reward programs",
      ],
    },
  ],
};


const ProjectPlan = () => {
  const [activeYear, setActiveYear] = useState("2025");
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [gsap, setGsap] = useState(null);
  const [ScrollTrigger, setScrollTrigger] = useState(null);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Load GSAP and ScrollTrigger
    const loadGSAP = async () => {
      try {
        const gsapModule = await import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        const scrollTriggerModule = await import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        
        const gsapInstance = gsapModule.default || gsapModule;
        const ScrollTriggerInstance = scrollTriggerModule.default || scrollTriggerModule;
        
        gsapInstance.registerPlugin(ScrollTriggerInstance);
        
        setGsap(gsapInstance);
        setScrollTrigger(ScrollTriggerInstance);
      } catch (error) {
        console.error('Error loading GSAP:', error);
      }
    };

    loadGSAP();
  }, []);

  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate title
    tl.fromTo(titleRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out'
    });

    // Animate timeline
    tl.fromTo(timelineRef.current, {
      scaleX: 0,
      transformOrigin: 'left'
    }, {
      scaleX: 1,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=0.5');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [gsap, ScrollTrigger]);

  useEffect(() => {
    if (!gsap) return;

    // Animate cards when year changes
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card, {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotation: 5
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: index * 0.1
        });
      }
    });
  }, [activeYear, gsap]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-blue-400';
      case 'upcoming': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress': return <Circle className="w-5 h-5 text-blue-400 animate-pulse" />;
      case 'upcoming': return <Circle className="w-5 h-5 text-gray-400" />;
      default: return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="relative py-20 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#120540] via-[#1b0a2d] to-[#433C73] overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-[#AEA7D9] to-[#4A088C] rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-16 bg-gradient-to-r from-[#4A088C] via-[#AEA7D9] to-[#4A088C] bg-clip-text text-transparent"
          style={{
            backgroundSize: '200% 200%',
            animation: 'gradient 3s ease infinite'
          }}
        >
          Roadmap
        </h2>

        {/* Year Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-16">
          {Object.keys(roadmapData).map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeYear === year
                  ? "bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] text-white shadow-2xl shadow-[#4A088C]/25"
                  : "bg-[#120540]/80 backdrop-blur-sm text-[#AEA7D9] hover:bg-[#120540] border border-[#433C73]/50 hover:border-[#4A088C]/50"
              }`}
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              {year}
              {activeYear === year && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] rounded-2xl blur opacity-50 -z-10"></div>
              )}
            </button>
          ))}
        </div>

        {/* Timeline Line */}
        <div className="relative mb-16">
          <div
            ref={timelineRef}
            className="h-1 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] mx-auto max-w-4xl rounded-full"
          ></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] rounded-full animate-pulse"></div>
        </div>

        {/* Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roadmapData[activeYear]?.length > 0 ? (
            roadmapData[activeYear].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  className={`relative group cursor-pointer transition-all duration-500 hover:scale-105 ${
                    selectedQuarter === `${activeYear}-${index}` ? 'scale-105' : ''
                  }`}
                  onClick={() => setSelectedQuarter(selectedQuarter === `${activeYear}-${index}` ? null : `${activeYear}-${index}`)}
                >
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-[#120540] to-[#0a0220] border border-[#433C73]/50 rounded-3xl p-6 shadow-2xl hover:shadow-[#4A088C]/20 transition-all duration-500 overflow-hidden">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
                    
                    {/* Status Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} bg-opacity-20`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Quarter */}
                    <h4 className="text-2xl font-bold text-[#AEA7D9] mb-2">
                      {item.quarter}
                    </h4>

                    {/* Milestone */}
                    <h5 className="text-lg font-semibold text-white mb-4 group-hover:text-[#AEA7D9] transition-colors duration-300">
                      {item.milestone}
                    </h5>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-[#AEA7D9] mb-1">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-[#433C73]/30 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className={`transition-all duration-500 ${
                      selectedQuarter === `${activeYear}-${index}` ? 'max-h-96 opacity-100' : 'max-h-20 opacity-70'
                    } overflow-hidden`}>
                      <ul className="space-y-2 text-[#AEA7D9] text-sm">
                        {item.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="group-hover:text-white transition-colors duration-300">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hover Effect Indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-[#AEA7D9] rounded-full animate-ping"></div>
                    </div>
                  </div>

                  {/* Connection Line for larger screens */}
                  {index < roadmapData[activeYear].length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] transform -translate-y-1/2 z-10"></div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-[#AEA7D9] text-xl">
                No roadmap data available for {activeYear}
              </p>
            </div>
          )}
        </div>

        {/* Interactive Legend */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="text-blue-400 text-sm font-medium">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400 text-sm font-medium">Upcoming</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default ProjectPlan;