import React, { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import AOS from "aos";
import "aos/dist/aos.css";
import slider4 from '../assets/slider4.png'
import slider2 from '../assets/image.png'
import slider3 from '../assets/images/image.png'
import slider1 from '../assets/coinstore-logo.png'
import slider6 from '../assets/TrustWallet.png'
const ListedOnSection = () => {
  const sliderRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollAmountRef = useRef(0);
  const isPausedRef = useRef(false);

const platforms = [
  {
    title: "Trust Wallet",
    link: "https://trustwallet.com/", 
    image: slider6
  },
  {
    title: "MEXC",
    link: "https://www.mexc.com/", 
    image: slider4
  },
  {
    title: "XT.COM",
    link: "https://www.xt.com/", 
    image:slider2
  },
  {
    title: "BitMart",
    link: "https://www.bitmart.com/", 
    image:slider3
  },
  {
    title: "CoinStore",
    link: "https://www.coinstore.com/", 
    image: slider1
  },
];



  const sliderItems = [...platforms, ...platforms]; // duplicated for loop scroll

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    let speed = 1.2;

    const animate = () => {
      if (slider && !isPausedRef.current) {
        scrollAmountRef.current += speed;
        if (scrollAmountRef.current >= slider.scrollWidth / 2) {
          scrollAmountRef.current = 0;
        }
        slider.scrollLeft = scrollAmountRef.current;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <section className="w-full py-12 px-4 bg-gradient-to-r from-[#6e00ff] via-[#9b00cc] to-[#ff007a] text-white">
      <div className="max-w-8xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-[3rem]" data-aos="fade-up">
          Listed On
        </h2>

        <div
          ref={sliderRef}
          className="flex gap-4 items-center overflow-x-auto no-scrollbar"
          style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {sliderItems.map((item, index) => (
            <Tilt
              key={index}
              transitionSpeed={500}
              glareEnable={false}
              className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border-2 border-white/20 bg-white/10"
              style={{
                width: "100%",
                maxWidth: "260px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              data-aos="zoom-in"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex flex-col items-center space-y-2 p-4 w-full"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-14 sm:h-16 md:h-20 object-contain transform transition duration-500 hover:scale-110 hover:drop-shadow-[0_0_10px_#fff]"
                />
                <p className="text-md font-bold sm:text-base">{item.title}</p>
              </a>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListedOnSection;
