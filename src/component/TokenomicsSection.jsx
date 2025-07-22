import React, { useEffect, useRef, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Area,
  AreaChart
} from "recharts";
import { TrendingUp, TrendingDown, Users, Activity, DollarSign, Coins, Target, Zap, Shield, Globe } from "lucide-react";

const tabs = ["Token", "Market", "Tracker"];

const colors = [
  "#63E6BE", "#EC4899", "#A855F7", "#3B82F6", "#FACC15",
  "#67E8F9", "#C084FC", "#60A5FA", "#38BDF8", "#818CF8",
  "#4ADE80", "#F472B6", "#FB923C",
];

// Static data with enhanced structure
const staticTokenomicsData = [
  {
    name: "Public Sale",
    value: 25,
    tokens: "250,000",
    color: colors[0],
    icon: Globe,
    description: "Available for public participation during pre-sale.",
    locked: false,
    vestingPeriod: "0 months",
  },
  {
    name: "Team & Advisors",
    value: 20,
    tokens: "200,000",
    color: colors[1],
    icon: Users,
    description: "Allocated to the core team and advisors with vesting.",
    locked: true,
    vestingPeriod: "12 months",
  },
  {
    name: "Marketing & Growth",
    value: 15,
    tokens: "150,000",
    color: colors[2],
    icon: Target,
    description: "Used for branding, influencer partnerships, and growth campaigns.",
    locked: false,
    vestingPeriod: "6 months",
  },
  {
    name: "Staking Rewards",
    value: 20,
    tokens: "200,000",
    color: colors[3],
    icon: Shield,
    description: "Distributed to users staking IBO via the platform.",
    locked: true,
    vestingPeriod: "3 months",
  },
  {
    name: "Reserve Fund",
    value: 20,
    tokens: "200,000",
    color: colors[4],
    icon: Coins,
    description: "Held in reserve for future ecosystem development or emergencies.",
    locked: true,
    vestingPeriod: "24 months",
  },
];


const staticMarketStats = {
  price: "1.00",
  change24h: -1.05,
  marketCap: "800,000", // 800k circulating x $1
  volume24h: "125,000",
  priceHistory: [
    { time: "00:00", price: 1.01 },
    { time: "04:00", price: 1.00 },
    { time: "08:00", price: 0.99 },
    { time: "12:00", price: 1.00 },
    { time: "16:00", price: 1.01 },
    { time: "20:00", price: 1.00 },
    { time: "24:00", price: 1.00 },
  ],
};


const staticTokenTrackers = {
  totalHolders: 135000,
  holdersChange: 4.8,
  totalTransactions: 84200,
  transactionsChange: 2.1,
  circulatingSupply: 800000, // Matches market cap
  totalSupply: 1000000,
  BurnedToken: 200000, // Already burned
  holdersHistory: [
    { month: "Jan", holders: 45000 },
    { month: "Feb", holders: 70000 },
    { month: "Mar", holders: 95000 },
    { month: "Apr", holders: 120000 },
    { month: "May", holders: 135000 },
  ],
  transactionHistory: [
    { day: "Mon", transactions: 1600 },
    { day: "Tue", transactions: 2100 },
    { day: "Wed", transactions: 2400 },
    { day: "Thu", transactions: 2000 },
    { day: "Fri", transactions: 2700 },
    { day: "Sat", transactions: 2300 },
    { day: "Sun", transactions: 2100 },
  ],
};


export default function TokenomicsTabsStatic() {
  const [activeTab, setActiveTab] = useState("Token");
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [gsap, setGsap] = useState(null);
  const [ScrollTrigger, setScrollTrigger] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const tabsRef = useRef([]);
  const contentRef = useRef(null);

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

    // Animate tabs
    tabsRef.current.forEach((tab, index) => {
      if (tab) {
        tl.fromTo(tab, {
          y: 30,
          opacity: 0,
          scale: 0.8
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        }, `-=${0.3 - index * 0.1}`);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [gsap, ScrollTrigger]);

  useEffect(() => {
    if (!gsap || !contentRef.current) return;

    // Animate content when tab changes
    gsap.fromTo(contentRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.95
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    });
  }, [activeTab, gsap]);

  // Animate numbers
  useEffect(() => {
    if (!gsap) return;

    const animateNumber = (start, end, key) => {
      gsap.to(animatedValues, {
        [key]: end,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          setAnimatedValues(prev => ({ ...prev, [key]: prev[key] || start }));
        }
      });
    };

    // Animate various numbers based on active tab
    if (activeTab === "Tracker") {
      animateNumber(0, staticTokenTrackers.totalHolders, 'totalHolders');
      animateNumber(0, staticTokenTrackers.totalTransactions, 'totalTransactions');
    }
  }, [activeTab, gsap]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#120540]/95 backdrop-blur-sm border border-[#4A088C]/50 rounded-lg p-3 shadow-xl">
          <p className="text-[#AEA7D9] font-semibold">{label}</p>
          <p className="text-white">
            {payload[0].name}: <span className="text-[#4A088C] font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderTable = () => (
    <div className="space-y-4">
      {staticTokenomicsData.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className={`relative group bg-gradient-to-r from-[#120540]/50 to-[#1b0a2d]/50 rounded-xl p-4 border border-[#727FA6]/30 hover:border-[#4A088C]/60 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              selectedSegment === index ? 'border-[#4A088C] bg-[#4A088C]/10' : ''
            }`}
            onClick={() => setSelectedSegment(selectedSegment === index ? null : index)}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: item.color + '20' }}
              >
                <IconComponent className="w-6 h-6" style={{ color: item.color }} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-lg">{item.name}</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-[#AEA7D9] font-medium">{item.value}%</span>
                    <span className="text-white font-bold">{item.tokens}</span>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex-1 bg-[#433C73]/30 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${item.value}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {item.locked && (
                      <span className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded-full">
                        Locked
                      </span>
                    )}
                    <span className="text-xs text-[#AEA7D9]">
                      {item.vestingPeriod}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {selectedSegment === index && (
              <div className="mt-4 pt-4 border-t border-[#727FA6]/30">
                <p className="text-[#AEA7D9] text-sm">{item.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderMarket = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#120540]/60 via-[#1b0a2d]/60 to-[#433C73]/60 rounded-xl p-6 border border-[#727FA6]/30">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <DollarSign className="w-8 h-8 text-[#4A088C]" />
              <h3 className="text-2xl font-bold text-white">Current Price</h3>
            </div>
            <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] bg-clip-text mb-2">
              ${staticMarketStats.price}
            </p>
            <div className="flex items-center justify-center gap-2">
              {staticMarketStats.change24h >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
              <span className={`text-lg font-semibold ${staticMarketStats.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                {staticMarketStats.change24h >= 0 ? "+" : ""}
                {staticMarketStats.change24h}% (24h)
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-[#4A088C]/10 rounded-lg">
              <p className="text-lg font-bold text-white">Market Cap</p>
              <p className="text-[#AEA7D9] text-xl">${staticMarketStats.marketCap}</p>
            </div>
            <div className="text-center p-4 bg-[#4A088C]/10 rounded-lg">
              <p className="text-lg font-bold text-white">Volume 24h</p>
              <p className="text-[#AEA7D9] text-xl">${staticMarketStats.volume24h}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#120540]/60 via-[#1b0a2d]/60 to-[#433C73]/60 rounded-xl p-6 border border-[#727FA6]/30">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#4A088C]" />
            24h Price Chart
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={staticMarketStats.priceHistory}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A088C" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4A088C" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#727FA6" opacity={0.3} />
              <XAxis dataKey="time" stroke="#AEA7D9" />
              <YAxis stroke="#AEA7D9" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#4A088C"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderTracker = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div 
          className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
            hoveredStat === 'holders' ? 'bg-[#433C73]/30 border-[#4A088C]' : 'bg-[#433C73]/20 border-[#727FA6]/30'
          }`}
          onMouseEnter={() => setHoveredStat('holders')}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="flex items-center gap-4 mb-4">
            <Users className="w-8 h-8 text-[#4A088C]" />
            <div>
              <p className="text-xl text-[#AEA7D9] font-bold">Total Holders</p>
              <p className="text-3xl font-bold text-white">
                {(animatedValues.totalHolders || 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">
              {staticTokenTrackers.holdersChange}% this week
            </span>
          </div>
        </div>

        <div 
          className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
            hoveredStat === 'transactions' ? 'bg-[#4A088C]/30 border-[#4A088C]' : 'bg-[#4A088C]/20 border-[#727FA6]/30'
          }`}
          onMouseEnter={() => setHoveredStat('transactions')}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="flex items-center gap-4 mb-4">
            <Activity className="w-8 h-8 text-[#4A088C]" />
            <div>
              <p className="text-xl text-[#AEA7D9] font-bold">Total Transactions</p>
              <p className="text-3xl font-bold text-white">
                {(animatedValues.totalTransactions || 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">
              {staticTokenTrackers.transactionsChange}% this week
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#120540]/60 via-[#1b0a2d]/60 to-[#433C73]/60 rounded-xl p-6 border border-[#727FA6]/30">
          <h3 className="text-xl font-bold text-white mb-4">Holders Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={staticTokenTrackers.holdersHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#727FA6" opacity={0.3} />
              <XAxis dataKey="month" stroke="#AEA7D9" />
              <YAxis stroke="#AEA7D9" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="holders"
                stroke="#4A088C"
                strokeWidth={3}
                dot={{ fill: '#4A088C', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#AEA7D9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-[#120540]/60 via-[#1b0a2d]/60 to-[#433C73]/60 rounded-xl p-6 border border-[#727FA6]/30">
          <h3 className="text-xl font-bold text-white mb-4">Weekly Transactions</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={staticTokenTrackers.transactionHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#727FA6" opacity={0.3} />
              <XAxis dataKey="day" stroke="#AEA7D9" />
              <YAxis stroke="#AEA7D9" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="transactions" fill="#4A088C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Circulating Supply", value: staticTokenTrackers.circulatingSupply, icon: Coins },
          { label: "Total Supply", value: staticTokenTrackers.totalSupply, icon: Target },
          { label: "Burned Tokens", value: staticTokenTrackers.BurnedToken, icon: Zap },
          { label: "Max Supply", value: 1234567890, icon: Shield },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="bg-[#120540]/50 p-4 rounded-lg text-center hover:bg-[#120540]/70 transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <stat.icon className="w-6 h-6 text-[#4A088C] mx-auto mb-2" />
            <p className="text-[#AEA7D9] text-sm font-medium">{stat.label}</p>
            <p className="text-white font-bold">{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#433C73] via-[#1b0a2d] to-[#120540] overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-[#AEA7D9] to-[#4A088C] rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#4A088C] via-[#AEA7D9] to-[#4A088C] bg-clip-text text-transparent mb-8"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient 3s ease infinite'
            }}
          >
            Tokenomics
          </h2>
          
          <div className="flex justify-center flex-wrap gap-4">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                ref={el => tabsRef.current[index] = el}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] text-white shadow-2xl shadow-[#4A088C]/25"
                    : "bg-[#120540]/80 backdrop-blur-sm text-[#AEA7D9] hover:bg-[#120540] border border-[#433C73]/50 hover:border-[#4A088C]/50"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] rounded-2xl blur opacity-50 -z-10"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div ref={contentRef}>
          {activeTab === "Token" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[#120540]/70 via-[#1b0a2d]/70 to-[#433C73]/70 rounded-2xl p-6 border border-[#727FA6]/50">
                <h3 className="text-2xl font-bold text-center mb-6 text-[#AEA7D9] flex items-center justify-center gap-2">
                  <Target className="w-6 h-6" />
                  Token Distribution
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={staticTokenomicsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      outerRadius={120}
                      stroke="#1f2937"
                      strokeWidth={2}
                    >
                      {staticTokenomicsData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          style={{
                            filter: selectedSegment === index ? 'brightness(1.2)' : 'brightness(1)',
                            cursor: 'pointer'
                          }}
                          onClick={() => setSelectedSegment(selectedSegment === index ? null : index)}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={70} 
                      iconType="circle"
                      wrapperStyle={{ fontSize: '14px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-gradient-to-br from-[#120540]/70 via-[#1b0a2d]/70 to-[#433C73]/70 rounded-2xl p-6 border border-[#727FA6]/50">
                <h3 className="text-2xl font-bold text-center mb-6 text-[#AEA7D9] flex items-center justify-center gap-2">
                  <Coins className="w-6 h-6" />
                  Detailed Breakdown
                </h3>
                {renderTable()}
              </div>
            </div>
          )}

          {activeTab === "Market" && renderMarket()}
          {activeTab === "Tracker" && renderTracker()}
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
}