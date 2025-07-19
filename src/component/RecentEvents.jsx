import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Note: In a real project, you would install and import Lenis like this:
// import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger);

const tabs = ["Events", "Upcoming Events", "Gallery"];

// Enhanced static data with more details
const staticEventData = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    text: "TechFest 2025",
    description: "Annual technology festival featuring latest innovations",
    date: "March 15-17, 2025",
    type: "event",
    category: "Technology"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    text: "AI Summit",
    description: "Exploring the future of artificial intelligence",
    date: "April 8, 2025",
    type: "upcoming",
    category: "AI & ML"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
    text: "Cultural Night Highlights",
    description: "Celebrating diversity through music and dance",
    date: "February 28, 2025",
    type: "gallery",
    category: "Cultural"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    text: "DevHackathon",
    description: "48-hour coding challenge for developers",
    date: "March 22-24, 2025",
    type: "event",
    category: "Development"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    text: "Cloud Computing Workshop",
    description: "Hands-on workshop on cloud technologies",
    date: "April 12, 2025",
    type: "upcoming",
    category: "Cloud"
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
    text: "Design Thinking Workshop",
    description: "Creative problem-solving methodologies",
    date: "May 3, 2025",
    type: "upcoming",
    category: "Design"
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop",
    text: "Music Festival 2024",
    description: "Best moments from our annual music festival",
    date: "December 2024",
    type: "gallery",
    category: "Music"
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop",
    text: "Innovation Expo",
    description: "Showcasing breakthrough technologies and ideas",
    date: "June 10, 2025",
    type: "event",
    category: "Innovation"
  }
];

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState("Events");
  const [events, setEvents] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Refs for animations
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const tabsRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const backgroundRef = useRef(null);
  const floatingElementsRef = useRef([]);
  
  // Initialize Lenis smooth scrolling (simulation)
  useEffect(() => {
    // In a real implementation, you would initialize Lenis here:
    // const lenis = new Lenis({
    //   duration: 1.2,
    //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //   smooth: true,
    //   smoothTouch: false,
    //   touchMultiplier: 2,
    // });
    
    // function raf(time) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);
    
    setEvents(staticEventData);
  }, []);

  // Enhanced entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Background entrance
    tl.fromTo(
      backgroundRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
    );

    // Floating elements animation
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        tl.fromTo(
          el,
          { opacity: 0, scale: 0, rotate: -180 },
          { 
            opacity: 1, 
            scale: 1, 
            rotate: 0, 
            duration: 1.2, 
            ease: "back.out(1.7)" 
          },
          `-=${0.8 - index * 0.2}`
        );
      }
    });

    // Heading animations
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 80, scale: 0.8, rotationX: 90 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotationX: 0, 
        duration: 1.2, 
        ease: "power4.out" 
      },
      "-=0.8"
    )
    .fromTo(
      subheadingRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        ease: "power3.out" 
      },
      "-=0.6"
    );

    // Tab buttons animation
    tl.fromTo(
      tabsRef.current.children,
      { opacity: 0, y: 40, rotationY: 90 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Continuous floating animation for heading
    gsap.to(headingRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Parallax effect for the section
    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: -100,
      ease: "none",
    });

    // Floating elements continuous animation
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          x: `+=${20 + index * 10}`,
          y: `+=${15 + index * 8}`,
          rotation: 360,
          duration: 8 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.5,
        });
      }
    });

  }, []);

  // Enhanced cards animation
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { 
          opacity: 0, 
          y: 60, 
          rotationX: -20, 
          rotationY: 10,
          scale: 0.8 
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
        }
      );
    }
  }, [activeTab, events]);

  const handleTabClick = (tab) => {
    if (tab === activeTab) return;
    
    // Enhanced tab transition
    const tl = gsap.timeline();
    
    tl.to(cardsRef.current, {
      opacity: 0,
      y: -30,
      scale: 0.95,
      rotationX: 10,
      duration: 0.4,
      stagger: 0.05,
      ease: "power3.in",
    })
    .call(() => setActiveTab(tab))
    .to(gridRef.current, {
      scale: 1.02,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    }, "-=0.2");
  };

  const handleCardHover = (cardId, isHovering) => {
    setHoveredCard(isHovering ? cardId : null);
    
    const card = cardsRef.current.find(ref => ref && ref.dataset.cardId === cardId);
    if (card) {
      gsap.to(card, {
        y: isHovering ? -10 : 0,
        scale: isHovering ? 1.05 : 1,
        rotationY: isHovering ? 5 : 0,
        duration: 0.4,
        ease: "power3.out",
      });
      
      // Add glow effect
      const glowElement = card.querySelector('.card-glow');
      if (glowElement) {
        gsap.to(glowElement, {
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1.1 : 1,
          duration: 0.3,
        });
      }
    }
  };

  const renderData = events.filter((event) => {
    if (activeTab === "Events") return event.type === "event";
    if (activeTab === "Upcoming Events") return event.type === "upcoming";
    if (activeTab === "Gallery") return event.type === "gallery";
    return false;
  });

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-[#433C73] via-[#1b0a2d] to-[#120540] overflow-hidden min-h-screen"
    >
      {/* Enhanced Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,0,255,0.1)_0%,transparent_70%)]"
      />
      
      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          ref={el => floatingElementsRef.current[0] = el}
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-[#7f00ff]/30 to-[#e100ff]/20 rounded-full blur-3xl"
        />
        <div 
          ref={el => floatingElementsRef.current[1] = el}
          className="absolute bottom-20 right-10 w-56 h-56 bg-gradient-to-br from-[#4A088C]/25 to-[#fbaeff]/15 rounded-full blur-3xl"
        />
        <div 
          ref={el => floatingElementsRef.current[2] = el}
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-[#e100ff]/40 to-transparent rounded-full blur-2xl"
        />
        <div 
          ref={el => floatingElementsRef.current[3] = el}
          className="absolute top-32 right-1/4 w-24 h-24 bg-gradient-to-br from-[#AEA7D9]/30 to-[#4A088C]/20 rounded-full blur-2xl"
        />
        <div 
          ref={el => floatingElementsRef.current[4] = el}
          className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-br from-[#fbaeff]/25 to-[#7f00ff]/20 rounded-full blur-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Heading Section */}
        <div className="text-center mb-20">
          <h2
            // ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 font-mono bg-gradient-to-r from-[#4A088C] via-[#7f00ff] to-[#fbaeff] bg-clip-text text-transparent relative"
          >
            Events
            <div className="absolute -inset-6 bg-gradient-to-r from-[#7f00ff]/15 to-[#e100ff]/15 rounded-full blur-2xl -z-10" />
          </h2>
          
          <p
            ref={subheadingRef}
            className="text-lg sm:text-xl md:text-2xl text-[#AEA7D9] font-medium mb-8 max-w-2xl mx-auto"
          >
            Discover amazing events, upcoming experiences, and memorable moments
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-2">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#7f00ff] to-transparent rounded-full shadow-[0_0_20px_#7f00ff]" />
            <div className="w-3 h-3 bg-[#e100ff] rounded-full animate-pulse shadow-[0_0_10px_#e100ff]" />
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#e100ff] to-transparent rounded-full shadow-[0_0_20px_#e100ff]" />
          </div>
        </div>

        {/* Enhanced Filter Buttons */}
        <div
          ref={tabsRef}
          className="flex flex-wrap justify-center gap-6 mb-20"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`group relative px-10 py-5 rounded-2xl text-base sm:text-lg lg:text-xl font-bold transition-all duration-700 transform hover:scale-110 backdrop-blur-sm ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] text-white shadow-[0_0_40px_#7f00ff] border-2 border-[#4A088C]/70"
                  : "bg-gradient-to-r from-[#433C73]/50 to-[#727FA6]/50 border-2 border-white/20 text-white hover:border-[#4A088C]/50 hover:bg-gradient-to-r hover:from-[#4A088C]/30 hover:to-[#AEA7D9]/30"
              }`}
            >
              {/* Enhanced Button Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
                activeTab === tab 
                  ? "opacity-100 bg-gradient-to-r from-[#4A088C]/30 to-[#AEA7D9]/30 blur-xl scale-110" 
                  : "opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#4A088C]/20 to-[#AEA7D9]/20 blur-xl scale-105"
              }`} />
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-2xl">
                  {tab === "Events" && "🎉"}
                  {tab === "Upcoming Events" && "📅"}
                  {tab === "Gallery" && "🖼️"}
                </span>
                {tab}
              </span>
              
              {/* Enhanced Active Tab Indicator */}
              {activeTab === tab && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#4A088C] rounded-full animate-pulse shadow-[0_0_15px_#4A088C]">
                  <div className="absolute inset-0 bg-[#e100ff] rounded-full animate-ping" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
        >
          {renderData.length === 0 ? (
            <div className="col-span-full text-center py-24 bg-gradient-to-br from-[#4A088C]/20 to-[#AEA7D9]/20 rounded-3xl backdrop-blur-sm border border-white/10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#4A088C]/30 to-[#AEA7D9]/30 rounded-full mb-8 backdrop-blur-sm border border-white/20">
                <span className="text-4xl">📭</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Events Available</h3>
              <p className="text-lg text-white/80 max-w-md mx-auto">Check back later for exciting events and experiences!</p>
            </div>
          ) : (
            renderData.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) {
                    cardsRef.current[index] = el;
                    el.dataset.cardId = item.id;
                  }
                }}
                onMouseEnter={() => handleCardHover(item.id, true)}
                onMouseLeave={() => handleCardHover(item.id, false)}
                className="group relative bg-gradient-to-br from-[#4A088C]/90 to-[#AEA7D9]/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 border border-white/20 hover:border-[#4A088C]/70 cursor-pointer"
              >
                {/* Enhanced Card Glow Effect */}
                <div className="card-glow absolute -inset-2 bg-gradient-to-br from-[#4A088C]/30 via-[#7f00ff]/20 to-[#AEA7D9]/30 rounded-3xl blur-xl opacity-0 transition-all duration-500" />
                
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-115"
                  />
                  
                  {/* Enhanced Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                    {item.category}
                  </div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {item.date}
                  </div>
                </div>
                
                {/* Enhanced Card Content */}
                <div className="relative p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-transparent bg-gradient-to-r from-[#e1cef4] to-[#AEA7D9] bg-clip-text group-hover:from-[#bdabd0] group-hover:to-[#AEA7D9] transition-all duration-500">
                    {item.text}
                  </h3>
                  
                  <p className="text-white/80 text-sm mb-4 line-clamp-2 group-hover:text-white transition-colors duration-300">
                    {item.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className="flex justify-between items-center">
                    <span className="text-[#AEA7D9] text-sm font-medium">
                      {activeTab === "Events" && "🎯 Live Event"}
                      {activeTab === "Upcoming Events" && "⏰ Coming Soon"}
                      {activeTab === "Gallery" && "📸 View Gallery"}
                    </span>
                    
                    <button className="opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      View Details
                    </button>
                  </div>
                  
                  {/* Enhanced Card Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4A088C] via-[#7f00ff] to-[#AEA7D9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;