import React, { useEffect, useState } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import {
  getAllConnectWallets,
  getAllHeaderContent,
  getXioData,
  purchaseXioCoin,
} from "../api/admin-api";
import { SiTether } from "react-icons/si";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import USDTPaymentMain from "./USDTPaymentMain";

// USDT Contract Configuration
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const USDT_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const getTokenPrice = async (symbol) => {
  // Only fetch tether price (always 1)
  if (symbol === "tether") return 1;
  return 0;
};

const WalletConnectButton = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  return (
    <div>
      {!isConnected ? (
        <button
          onClick={() => open()}
          className="px-6 py-2 border border-white/40 font-semibold rounded-md"
          style={{
            backgroundImage: "linear-gradient(to right, #120540, #433C73)",
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <span
          onClick={() => open()}
          className="px-2 py-1 bg-gray-500 rounded-sm cursor-pointer"
        >
          {address?.slice(0, 4) + "..." + address?.slice(-4)}
        </span>
      )}
    </div>
  );
};

const WalletConnect = () => {
  const [walletContent, setWalletContent] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [saleEnabled, setSaleEnabled] = useState(true); // Toggle for purchase section

  // Remove selectedToken state, always use 'usdt'
  const [pricePerToken, setPricePerToken] = useState(0.012091);
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // Helper to close all modals and show a SweetAlert
  const closeAllModals = (type, message) => {
    setShowPaymentModal(false);
    // If you have other modals like setShowWalletModal, close them here
    // setShowWalletModal && setShowWalletModal(false);
    if (type === 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: message || 'Your payment was successful!',
        confirmButtonText: 'OK',
        timer: 5000,
        showConfirmButton: true,
      });
    } else if (type === 'error') {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: message || 'Payment was rejected or failed.',
        confirmButtonText: 'OK',
        timer: 5000,
        showConfirmButton: true,
      });
    }
  };
  const [xioData, setXioData] = useState(null);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);

  const [walletType, setWalletType] = useState("");
  const [recipientAddress] = useState(
    // TODO: Replace with your actual payment address
    // "0x0000000000000000000000000000000000000000"
    import.meta.env.VITE_PAYMENT_ADDRESS
  );

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("2025-07-05T18:00:00"); // <-- SET YOUR TARGET DATE
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = String(
        Math.floor(difference / (1000 * 60 * 60 * 24))
      ).padStart(2, "0");
      const hours = String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((difference / 1000 / 60) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
        2,
        "0"
      );

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllHeaderContent();

        console.log("Header Content:", res);
        const xioData = await getXioData();
        console.log("XIO Data:", xioData);

        if (xioData.success) {
          setPricePerToken(xioData.data.price || 0.0015);
          setXioData(xioData.data);
        }
        if (res?.data?.navLogo) {
          setLogoUrl(res.data.navLogo);
        }
      } catch (err) {
        console.error("Error fetching logo:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await getAllConnectWallets();
        if (Array.isArray(data.data) && data.data.length > 0) {
          setWalletContent(data.data[0]);
        } else if (typeof data.data === "object" && data.data !== null) {
          setWalletContent(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchWallets();
  }, []);



  const getTokenUSDValue = () => {
    // Always 1:1 for USDT
    return (parseFloat(purchaseAmount || 0) * 1).toFixed(2);
  };

  const getTokenAmount = () => {
    const usd = getTokenUSDValue();
    return (parseFloat(usd) / pricePerToken).toFixed(2);
  };

  // Payment handling functions
  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x38",
                    chainName: "Binance Smart Chain",
                    nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB",
                      decimals: 18,
                    },
                    rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                    blockExplorerUrls: ["https://bscscan.com/"],
                  },
                ],
              });
            } catch (addError) {
              console.error("Error adding BSC network:", addError);
              throw new Error("Failed to add BSC network");
            }
          } else {
            throw switchError;
          }
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("Connected wallet address:", userAddress);

        return { provider, signer, userAddress };
      } else {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "Wallet is not installed.",
        });
        throw new Error("Wallet is not installed.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: error.message || "Failed to connect wallet. Please try again.",
      });
      throw error;
    }
  };

  const handleBuyTokens = async () => {
    if (!purchaseAmount || parseFloat(purchaseAmount) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Please enter a valid purchase amount.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Connect wallet
      const { provider, signer, userAddress } = await handleConnectWallet();

      // Check network
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (chainId !== "0x38") {
        throw new Error("Please connect to BSC network first");
      }

      // USDT Payment only
      const usdtContract = new ethers.Contract(
        USDT_ADDRESS,
        USDT_ABI,
        signer
      );

      try {
        const decimals = await usdtContract.decimals();
        console.log(`Token decimals: ${decimals}`);
      } catch (error) {
        console.error("Error fetching USDT decimals:", error);
        throw new Error("Invalid USDT contract on BSC network");
      }

      const balance = await usdtContract.balanceOf(userAddress);
      const amountInUSDT = ethers.parseUnits(purchaseAmount.toString(), 18);

      if (balance < amountInUSDT) {
        throw new Error("Insufficient USDT balance");
      }

      const tx = await usdtContract.transfer(recipientAddress, amountInUSDT);
      await tx.wait();
      console.log("Transaction hash:", tx.hash);

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: `Successfully purchased ${getTokenAmount()} XIO tokens with ${purchaseAmount} USDT`,
      });
    } catch (error) {
      console.error("Error during payment:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.message || "Failed to complete payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  async function handlePurchase(data) {
    // setPurchaseLoading(true);
    // setPurchaseError(null);
    // setPurchaseSuccess(null);

    console.log("Purchase data:", data);

    if (
      !purchaseAmount ||
      isNaN(purchaseAmount) ||
      Number(purchaseAmount) <= 0
    ) {
      setPurchaseError("Please enter a valid amount.");
      setPurchaseLoading(false);
      return;
    }

    try {
      const res = await purchaseXioCoin({
        amount: getTokenAmount(),
        recipientAddress: data?.recipientAddress,
        userAddress: data?.userAddress,
        txResponse: data?.txResponse,
      });

      if (res.success) {
        setPurchaseSuccess("Purchase successful!");
        setPurchaseAmount("");
        closeAllModals('success', `You have successfully purchased ${getTokenAmount()} XIO Coin.`);
      } else {
        setPurchaseError(res.message || "Purchase failed.");
        closeAllModals('error', res.message || "Purchase failed.");
      }
    } catch (err) {
      console.error(err);
      setPurchaseError("An error occurred during purchase.");
      closeAllModals('error', "An error occurred during purchase.");
    } finally {
      setPurchaseLoading(false);
    }
  }

  const formatNumberWithSuffix = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "B"; // Convert to billions and add "B"
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M"; // Convert to millions and add "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K"; // Convert to thousands and add "K"
    }
    return num; // Return the number as is if it's less than a thousand
  };



  const checkValidPurchaseAmount = () => {
    
    console.log("purchase Amount ", purchaseAmount)
    if (
      purchaseAmount === "" ||
      isNaN(purchaseAmount) ||
      Number(purchaseAmount) < 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Minimum purchase amount is $1. Please enter a valid amount.",
        confirmButtonText: "OK",
        timer: 5000,
        showConfirmButton: true,
      });
    } else {
      setShowPaymentModal(true);
    }
  };

  const leftTitle = walletContent?.leftTitle || "XIO PRESALE IS CLOSED";
  const leftDescription =
    walletContent?.leftDescription || `Stay tuned for future updates.`;

  const tokenRaised = 20.46;
  const tokenTarget = 41.34;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#433C73] via-[#1b0a2d] to-[#120540] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full grid grid-cols-1  gap-8">
        {/* Left Section */}
        <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <div className="flex justify-between items-center mb-8">
            <WalletConnectButton />
            {logoUrl ? (
              <img
                src={logoUrl}
                className="w-12 h-12 rounded-lg bg-white/10 p-1"
                alt="logo"
              />
            ) : null}
          </div>

          {!saleEnabled ? (
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-bold mb-4">
                {leftTitle}
              </h2>
              {leftDescription.split("\n").map((line, idx) => (
                <p
                  key={idx}
                  className="text-gray-300 text-sm leading-relaxed mb-3"
                >
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <div className="text-white">
              <h2 className="text-2xl font-bold text-center mb-6 text-[#9797e4] tracking-wide">
                &gt;&gt;&gt; BUY XIO &lt;&lt;&lt;
              </h2>
              <div className="flex justify-center mb-4 gap-4 mt-6">
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center px-4 py-3 rounded-lg border-2 text-white font-bold text-lg min-w-[65px]"
                    style={{
                      borderColor: "#4b4b91",
                      backgroundColor: "#0A0F2C",
                      boxShadow: "0 0 10px #4b4b91",
                    }}
                  >
                    <span className="text-2xl">{value}</span>
                    <span className="text-xs tracking-wider">
                      {label.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
              {/* Remove BNB/USDT/OTHER buttons, only show USDT */}
              <div className="flex justify-between gap-2 my-6">
                <button
                  className="w-full py-2 rounded border flex items-center justify-center gap-2 bg-[#9797e4]"
                  disabled
                >
                  <SiTether size={22} color="#26A17B" />
                  USDT
                </button>
              </div>
              <div className="text-sm text-gray-400 mb-1">Purchase Amount</div>
              <div className="flex items-center mb-4">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  className="flex-1 p-3 rounded bg-black border border-white/20 text-white"
                />
                <span className="ml-2 text-gray-300 font-semibold uppercase">
                  USDT
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="p-3 bg-black border border-white/10 rounded">
                  <div className="text-gray-400">Amount You'll Get</div>
                  <div className="text-white text-lg font-bold">
                    {getTokenAmount()}
                  </div>
                </div>
                <div className="p-3 bg-black border border-white/10 rounded">
                  <div className="text-gray-400">USD Worth</div>
                  <div className="text-white text-lg font-bold">
                    ${getTokenUSDValue()}
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-[#9797e4] hover:bg-[#4f4f7f] transition p-3 rounded text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={checkValidPurchaseAmount}
                disabled={
                  isProcessing ||
                  !purchaseAmount ||
                  parseFloat(purchaseAmount) <= 0
                }
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </div>
                ) : (
                  `BUY TOKENS WITH USDT`
                )}
              </button>
            </div>
          )}
          <button
            onClick={() => setSaleEnabled(!saleEnabled)}
            className="mt-8 text-sm text-purple-300 underline"
          >
            Toggle {saleEnabled ? "Disabled" : "Enabled"} Mode
          </button>
        </div>
      </div>
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 w-full max-w-md mx-4 rounded-xl border border-gray-700 shadow-2xl">
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-6">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="App Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </div>
                {/* Only show USDTPaymentMain */}
                <USDTPaymentMain
                  amount={Number(purchaseAmount)}
                  walletType={walletType}
                  onSuccess={handlePurchase}
                  onFailure={() => closeAllModals('error', 'Payment was rejected or failed.')}
                />
                <div className="mt-6 w-full">
                  <button
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    onClick={() => closeAllModals('error', 'Payment modal closed.')}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
