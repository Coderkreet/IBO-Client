import React, { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import AOS from "aos";
import "aos/dist/aos.css";

const ListedOnSection = () => {
  const sliderRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollAmountRef = useRef(0);
  const isPausedRef = useRef(false);

  const platforms = [
    {
      title: "Trust Wallet",
      link: "https://trustwallet.com/",
      image: "https://seeklogo.com/images/T/trustwallet-logo-112F8E2965-seeklogo.com.png",
    },
    {
      title: "BitMart",
      link: "https://www.bitmart.com/",
      image: "https://cryptologos.cc/logos/bitmart-token-bmx-logo.png",
    },
    {
      title: "Hello",
      link: "https://www.hello.one/",
      image: "https://hello.one/images/logo-white.svg",
    },
    {
      title: "CoinStore",
      link: "https://www.coinstore.com/",
      image: "https://assets-global.website-files.com/6375cba9371ee5c68686baf3/6375cba9371ee55aa886bafb_Coinstore_Logo.png",
    },
    {
      title: "XT.COM",
      link: "https://www.xt.com/",
      image: "https://pbs.twimg.com/profile_images/1753245290717325312/ZZH-4Xcv_400x400.jpg",
    },
    {
      title: "MEXC",
      link: "https://www.mexc.com/",
      image: "https://cryptologos.cc/logos/mexc-global-mexc-logo.png",
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
