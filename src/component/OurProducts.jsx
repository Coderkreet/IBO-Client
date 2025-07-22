import React, { useEffect, useRef, useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';

const OurProducts = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  const [gsap, setGsap] = useState(null);
  const [ScrollTrigger, setScrollTrigger] = useState(null);

  const [section] = useState({
    text: 'Our Products',
    description: 'Explore our wide range of innovative products designed to accelerate your blockchain journey.',
  cards: [
  {
    title: "IBO Swap",
    url: "https://swap.ibocoin.io",
    image: "https://via.placeholder.com/400x300.png?text=IBO+Swap",
    description:
      "IBO Swap is our decentralized exchange (DEX), enabling fast, secure, and low-fee token swaps within the IBO ecosystem. Built for scalability and ease of use.",
  },
  {
    title: "IBO Wallet",
    url: "https://wallet.ibocoin.io",
    image: "https://via.placeholder.com/400x300.png?text=IBO+Wallet",
    description:
      "Securely store, send, and manage your IBO and other supported tokens with IBO Wallet — a non-custodial, multi-chain crypto wallet designed for both beginners and pros.",
  },
  {
    title: "IBO Bridge",
    url: "https://bridge.ibocoin.io",
    image: "https://via.placeholder.com/400x300.png?text=IBO+Bridge",
    description:
      "IBO Bridge allows seamless asset transfers across blockchain networks, empowering true interoperability between Ethereum, BSC, and upcoming supported chains.",
  },
  {
    title: "IBO Launchpad",
    url: "https://launchpad.ibocoin.io",
    image: "https://via.placeholder.com/400x300.png?text=IBO+Launchpad",
    description:
      "A next-gen token launch platform helping emerging blockchain projects with smart contract deployment, community funding, and trusted investor onboarding.",
  },
]

  });

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

    // Animate description
    tl.fromTo(descriptionRef.current, {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5');

    // Animate cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        tl.fromTo(card, {
          y: 80,
          opacity: 0,
          scale: 0.8,
          rotateX: 45
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, `-=${0.6 - index * 0.1}`);
      }
    });

    // Hover animations for cards
    cardsRef.current.forEach((card) => {
      if (card) {
        const cardInner = card.querySelector('.card-inner');
        const cardOverlay = card.querySelector('.card-overlay');
        const cardButton = card.querySelector('.card-button');
        const cardArrow = card.querySelector('.card-arrow');

        card.addEventListener('mouseenter', () => {
          gsap.to(cardInner, {
            scale: 1.05,
            rotateY: 5,
            duration: 0.5,
            ease: 'power2.out'
          });
          gsap.to(cardOverlay, {
            opacity: 1,
            duration: 0.3
          });
          gsap.to(cardButton, {
            scale: 1.1,
            duration: 0.3
          });
          gsap.to(cardArrow, {
            rotate: 45,
            scale: 1.2,
            duration: 0.3
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(cardInner, {
            scale: 1,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
          gsap.to(cardOverlay, {
            opacity: 0,
            duration: 0.3
          });
          gsap.to(cardButton, {
            scale: 1,
            duration: 0.3
          });
          gsap.to(cardArrow, {
            rotate: 0,
            scale: 1,
            duration: 0.3
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [gsap, ScrollTrigger]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-[#433C73] via-[#1b0a2d] to-[#120540] text-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#4A088C] to-[#fbaeff] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#fbaeff] to-[#4A088C] rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Title + Description */}
        <div className="mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#4A088C] via-[#fbaeff] to-[#4A088C] bg-clip-text text-transparent bg-size-200 animate-gradient"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient 3s ease infinite'
            }}
          >
            {section.text}
          </h2>
          {section.description && (
            <p
              ref={descriptionRef}
              className="text-[#AEA7D9] text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
            >
              {section.description}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {section.cards.map((product, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="relative w-full max-w-sm group perspective-1000"
            >
              <div 
                className="card-inner relative w-full h-[400px] bg-gradient-to-b from-[#120540] to-[#0a0220] rounded-3xl overflow-hidden shadow-2xl border border-[#4A088C]/20 transition-all duration-500"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#120540]/95 via-[#120540]/60 to-transparent"></div>
                
                {/* Hover Overlay */}
                <div className="card-overlay absolute inset-0 bg-gradient-to-t from-[#4A088C]/20 via-transparent to-transparent opacity-0 transition-opacity duration-300"></div>

                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{
                       background: 'linear-gradient(45deg, #4A088C, #fbaeff, #4A088C)',
                       padding: '2px',
                       borderRadius: '24px'
                     }}>
                  <div className="w-full h-full bg-[#120540] rounded-3xl"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#fbaeff] transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="text-[#AEA7D9] text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <a href={product.url} target="_blank" rel="noopener noreferrer">
                      <button className="card-button px-6 py-3 text-sm text-white bg-gradient-to-r from-[#4A088C] to-[#fbaeff] rounded-full font-medium hover:shadow-lg hover:shadow-[#4A088C]/25 transition-all duration-300 transform hover:-translate-y-1">
                        Explore Now
                      </button>
                    </a>
                    <a href={product.url} target="_blank" rel="noopener noreferrer">
                      <button className="card-arrow bg-white/10 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300">
                        <GoArrowUpRight className="text-white text-xl" />
                      </button>
                    </a>
                  </div>
                </div>

                {/* Floating Particles Effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-[#fbaeff] rounded-full animate-ping"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-[#4A088C] rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default OurProducts;