import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import shadow1 from "../assets/shadow1.png";
import shadow2 from "../assets/shadow2.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const staticFaqs = [
  {
    _id: "6845a15d597965788f2ab32c",
    question: "What is IBO?",
    answer:
      "IBO is a BSC token designed to make investing in crypto mining super simple, even without any knowledge or expensive equipment. We collaborate with strategic mining partners in Australia, the United Kingdom, Iceland, and India who utilize 100% hydroelectric and solar power for mining $BTC and other cryptocurrencies.",
  },
  {
    _id: "6845a14d597965788f2ab32a",
    question: "How do Mining Rewards Work?",
    answer:
      "All of the mining rewards, i.e. the $BTC earned from mining is added to the liquidity and market cap of $IBO, or in other words, used to purchase $IBO tokens, some of which are immediately burned after purchase. This not only increases the price of $IBO but also decreases the supply gradually giving you an asset to hold.",
  },
  {
    _id: "684132e56b4ba1ad16eef114",
    question: "Who are the people behind IBO? Where can I read about the team?",
    answer:
      "The Team behind the IBO Project comes with expertise in the domain of over a decade. They have been active investors, traders, miners, and also have a technical background that grew hand-in-hand with the growth of the domain.\n\nKeeping in line with the culture of crypto and blockchain, the team has chosen to be pseudonymous. The project's potential is backed by extensive research, experience, and learnings of the team. They envision the project shining in the light of its own progress, standing on its own merits. This allows IBO to be its authentic self.",
  },
  {
    _id: "684132ce6b4ba1ad16eef112",
    question: "I don't have a MetaMask Wallet. Can I still buy the IBO token?",
    answer:
      "To purchase $IBO, you can use a decentralized wallet like Trust Wallet or MetaMask. If you’re looking for a step-by-step guide on how to create a MetaMask Wallet, follow this:\nIf you prefer Trust Wallet, follow this -",
  },
  {
    _id: "684132bd6b4ba1ad16eef110",
    question: "I have purchased $IBO but don't know how to stake? How does $IBO Staking work?",
    answer:
      "When you visit IBO.io and connect your wallet, you get to see how many $IBO you currently hold. These tokens remain vested for 9 months from the date of purchase. But you have the opportunity to stake them and earn from staking during the vesting period. To know how to stake your IBO refer this guide:",
  },
  {
    _id: "684132b26b4ba1ad16eef10e",
    question: "Why can’t I trade $IBO soon after I buy? Why are my tokens locked and what is the vesting period?",
    answer:
      "When you buy $IBO, your tokens are locked for a period of 9 months from the date of purchase. We do this to protect investors from price fluctuations or what is largely known as ‘pump and dump’ in the crypto world. Waiting for a predetermined duration means that the token will have stability in price, and early investors can use our staking mechanism to benefit and receive rewards.",
  },
  {
    _id: "684132a76b4ba1ad16eef10c",
    question: "How does the $IBO Wallet Interface work?",
    answer:
      "Once you connect your MetaMask to access your $IBO Wallet Interface, you get several options that show you your $IBO holdings, staking, and referral earning data.\nStaking Rewards: You earn $IBO against staked IBO depending on the number of months you have staked for.\nReferral Rewards: You earn $IBO worth 5% of the deposit amount of all users using your unique referral ID.\nWithdraw button: All staking rewards and referral rewards can be withdrawn via this button. Staking rewards can be withdrawn on a monthly basis. Withdrawals can be made to the connected MetaMask wallet.",
  },
  {
    _id: "68399ed9fd4ce3214cab5daf",
    question: "When can I withdraw my Staking Rewards?",
    answer:
      "Staking rewards will reflect in your staking earnings on a monthly basis. They can be withdrawn on a monthly basis too. Staking rewards cannot be vested, but they can be traded immediately.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const mid = Math.ceil(staticFaqs.length / 2);
  const leftColumn = staticFaqs.slice(0, mid);
  const rightColumn = staticFaqs.slice(mid);

  return (
    <section className="relative bg-gradient-to-b from-[#120540] via-[#1b0a2d] to-[#433C73] py-16 px-4 font1 overflow-hidden">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-12" data-aos="zoom-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-[#4A088C] to-[#fbaeff] bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-xl mt-3">
          Below is a list of frequently asked questions and answers from partners.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Please check this FAQ before contacting us.
        </p>
      </div>

      {/* FAQ Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {[leftColumn, rightColumn].map((column, colIdx) => (
          <div key={colIdx} className="space-y-4">
            {column.map((item, idx) => {
              const globalIndex = colIdx === 0 ? idx : idx + leftColumn.length;
              const isOpen = openIndex === globalIndex;
              return (
                <div
                  key={item._id || globalIndex}
                  data-aos="fade-up"
                  data-aos-delay={globalIndex * 100}
                  className="border border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleAnswer(globalIndex)}
                    className="w-full text-left px-4 py-3 bg-[#100029] text-white font-medium flex items-center justify-between hover:bg-[linear-gradient(to_right,_#27B9DE,_#D426F6)]"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <FaChevronUp className="ml-4" />
                    ) : (
                      <FaChevronDown className="ml-4" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 py-3 bg-[#0F0F1A] text-gray-300 text-sm whitespace-pre-wrap">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Background Decorations with AOS */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
        data-aos="fade-right"
        data-aos-delay="300"
      >
        <img src={shadow2} className="w-full h-full object-cover" alt="" />
      </div>
      <div
        className="absolute hidden sm:block top-0 right-0 w-1/2 h-full pointer-events-none"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <img src={shadow1} className="w-full h-full object-cover" alt="" />
      </div>
    </section>
  );
};

export default FaqSection;
