import React, { useEffect, useState, useRef } from "react";
import {
  FaNetworkWired,
  FaUsers,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import updatecoin from "../assets/IBOLOGO.png";

const Overview = () => {
  const [overview, setOverview] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const particlesRef = useRef([]);
  const glowRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Dummy data
    const dummyOverview = {
      text: "Introducing IBO Token",
      topDescription: "Invest in the future of decentralized finance with the new IBO Token — secure, scalable, and community-driven.",
    };

    const dummyCards = [
      {
        _id: "1",
        title: "What is IBO Token?",
        description:
          "IBO Token is a next-gen cryptocurrency designed to power a decentralized investment ecosystem with unmatched security and scalability.",
        image:updatecoin,
      },
      {
        _id: "2",
        title: "How to Invest?",
        description:
          "Invest easily via BNB or USDT using our secure portal. Early investors enjoy exclusive bonuses and governance privileges.",
        image: updatecoin,
      },
      {
        _id: "3",
        title: "Tokenomics",
        description:
          "Total Supply: 1B | Circulating: 350M | Staking: Enabled | Burns: Monthly | Governance: DAO-driven for long-term growth.",
        image: updatecoin,
      },
      {
        _id: "4",
        title: "Roadmap & Utility",
        description:
          "Phase 1: Launch\nPhase 2: DEX Integration\nPhase 3: NFT Ecosystem\nPhase 4: LaunchPad Support\nPhase 5: Global Partnerships",
        image:updatecoin,
      },
    ];

    setOverview(dummyOverview);
    setCards(dummyCards);
  }, []);

  useEffect(() => {
    if (!cards.length) return;
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cards.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % cards.length);
      }, 4000);
    }
  };

  const icons = [
    <FaNetworkWired className="text-[#AEA7D9] text-2xl" />,
    <FaUsers className="text-[#AEA7D9] text-2xl" />,
    <FaShieldAlt className="text-[#AEA7D9] text-2xl" />,
    <FaChartLine className="text-[#AEA7D9] text-2xl" />,
  ];

  const iconBorders = [
    "border-[#4A088C] bg-[#AEA7D9]/10 shadow-[#4A088C]/20",
    "border-[#120540] bg-[#AEA7D9]/10 shadow-[#120540]/20",
    "border-[#433C73] bg-[#AEA7D9]/10 shadow-[#433C73]/20",
    "border-[#AEA7D9] bg-[#AEA7D9]/10 shadow-[#AEA7D9]/20",
  ];

  const gradients = [
    "from-[#4A088C]/20 to-[#4A088C]/5",
    "from-[#120540]/20 to-[#120540]/5",
    "from-[#433C73]/20 to-[#433C73]/5",
    "from-[#AEA7D9]/20 to-[#AEA7D9]/5",
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full h-full bg-gradient-to-br from-[#120540] via-[#1b0a2d] to-[#433C73] text-white py-[5rem] px-6 sm:px-12 md:px-20 font-sans relative overflow-hidden"
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className={`absolute w-2 h-2 rounded-full animate-pulse ${
              i % 4 === 0
                ? "bg-[#4A088C]/30"
                : i % 4 === 1
                ? "bg-[#120540]/30"
                : i % 4 === 2
                ? "bg-[#433C73]/30"
                : "bg-[#AEA7D9]/30"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="w-full mx-auto relative z-10">
        <div className="text-center mb-20 relative">
          <h2
            ref={headerRef}
            className="text-[3rem] font-bold mb-8 leading-tight bg-gradient-to-r from-[#4A088C] to-[#fbaeff] bg-clip-text text-transparent"
          >
            {overview?.text || "Overview"}
          </h2>
          <p className="mt-6 text-[#AEA7D9] text-lg max-w-2xl mx-auto">
            {overview?.topDescription}
          </p>
        </div>

        <div className="relative min-h-[500px]">
          {cards.map((item, index) => (
            <div
              key={item._id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`absolute inset-0 transition-all duration-700 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                <div className="flex justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-2xl w-full max-w-lg shadow-lg"
                  />
                </div>
                <div className="space-y-6">
                  <div
                    className={`p-8 rounded-3xl border border-white/10 bg-gradient-to-br ${gradients[index % gradients.length]} backdrop-blur-xl`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 flex items-center justify-center rounded-xl border-2 shadow-xl">
                        {icons[index % icons.length]}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-[#AEA7D9] whitespace-pre-line">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="mt-16 flex justify-center items-center space-x-4">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`relative transition-all duration-500 ${
                currentSlide === index
                  ? "w-12 h-4 bg-gradient-to-r from-[#e9d2ff] via-[#e9e6ff] to-[#AEA7D9] rounded-full"
                  : "w-4 h-4 bg-[#727FA6]/40 hover:bg-[#AEA7D9]/60 rounded-full"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {currentSlide === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#f1e3ff] via-[#cdc7f4] to-[#AEA7D9] rounded-full animate-pulse blur-sm opacity-60"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
