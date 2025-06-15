'use client';

import { useEffect, useState, useRef } from 'react';

const logos = {'Magic Eden': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9165fb9188e59b9a6f675_Magic%20Eden_logo.webp','Poply': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67cb75a56fa2925b3b2e9a89_popy-logo.webp','NFTs2Me': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b917409fa4892d6237dc33_NFTs2Me_logo.webp', 'Lootify': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67bebc5c47f06f070fbb11bd_lootify.webp','Monad 2048': 'https://i0.wp.com/www.gizmotimes.com/wp-content/uploads/2023/10/Monad-Logo.png','Monadtiles': 'https://www.monadtiles.xyz/_next/image?url=%2Flogo%2Fnew-logo.png&w=640&q=75','Tezza Poker': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/682f7caa4bd8615922bce6a0_tezza.webp','Valor Quest': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/6834a1e5bc93ee52da7849c0_6834a1646afb796987d92c9d_Logo.webp','Wenwin':  'https://pbs.twimg.com/profile_images/1777691209206534144/B4Rme5dY_400x400.jpg','Meta Leap': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9167a9fa4892d62373abc_Meta%20Leap_logo.webp','Rug Rumble':  'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b919cfd031c30308e9ae18_Rug%20Rumble_logo.webp','LootGO':  'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9163ce0429ca00f50873e_LootGO_logo.webp','Plato': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9192e8330a99a8711679a_Plato_logo.webp','DRKVRS':  'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67d3a1aa464cdce0ecbee499_drkvrs%20jpg.webp','Showdown': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b919f86e9a2707acfe0c32_Showdown_logo.webp', 'Opinion Labs': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67f01e251bab371f4e1e652a_D2wLYRXX_400x400.webp','Dusted':  'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9141c84cbdc367d620003_Dusted_logo.webp','Fantasy Top': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b914a186bf1f948b414066_Fantasy%20Top_logo.webp','RareBetSports': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b91971779fac86351e9c4d_RareBetSports_logo.webp','Nad.fun': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b91753fc64a6c6e43c16e3_Nad.fun_logo.webp','Opals': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b917cf048c532f61e10d6c_Opals_logo.webp', 'Kizzy': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b915d16561ec94bfa425a1_Kizzy_logo.webp', 'iZUMi Finance':'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b915992a3730e911b7264c_IZUMi%20Finance_logo.webp', 'Curvance':  'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9137ae970ab23ad8030be_Curvance_logo.webp','Purps': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67e316aa60595f10c8613edb_Monda-Logo-400x400.webp','Amertis':  'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67cb75a41f9084980878c240_amertis_logo.webp','Ambient': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b910fa442716854f1f3390_Ambient_logo.webp','Apriori':  'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b91139ebe3a25cc1bbc74f_Apriori_logo.webp','Accountable': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9109d10f685d8b168f7ea_Accountable_logo.webp','Pancake Swap': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b918ac779fac86351e1b2f_Pancakeswap%20Logo.webp',  'Kuru': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b915ece21ffe4d105246dd_Kuru_logo.webp','OctoSwap':  'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67ce4ceb5a19b9c6f4206ffa_octoswap%20logo.webp','Magma': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9166595f6c765132080f7_Magma_logo.webp','Monorail':  'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9170173996311554e7bc6_Monorail_logo.webp','Mudigital': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b917246e9a2707acfc32e2_Mu%20Digital_logo.webp','Fastlane': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67d77203133e25b8b1565e04_nHQGz23P_400x400.webp','Sherpa': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9156e9fa4892d62367af2_Hedgemony_logo.webp','Kintsu': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b915bf6e9a2707acfb23b7_Kintsu_logo.webp','Bean Exchange':  'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9118b1f770571ff12b289_Bean%20Exchange_logo.webp','Crust Finance': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/6802d4bfe173e30b685ba3ea__EZGsvtJ_400x400%20(1).webp','Narwhal Finance': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9176689130464ea4285d6_Narwhal%20Finance_logo.webp','Pingu Exchange': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b91927ab78b729a9254691_Pingu%20Exchange_logo.webp','Nitro Finance': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b917961e79a03f6da6f980_NitroFinance_logo.webp','Clober': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67bebcb9cf681db7a60d2e22_clober.webp','Atlantis': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67d3a0a71b288e2e961f005f_400x400.webp','Mace': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b91d8d9fa4892d623b8b8a_mace%20logo.webp','Uniswap': 'https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b91b5f48ee25af9be38700_Uniswap%20Wallet_logo.webp'};
const urls = {'Magic Eden': 'https://magiceden.io/monad-testnet','Poply': 'https://poply.xyz/','NFTs2Me': 'https://nfts2me.com/', 'Lootify': 'https://beta.lootify.xyz/','Monad 2048': 'https://2048.monad.xyz/','Monadtiles': 'https://www.monadtiles.xyz/','Tezza Poker': 'https://play.tezza.poker/','Valor Quest': 'https://t.me/ValorQuestBot','Wenwin':  'https://app.wenwin.com/','Meta Leap': 'https://metaleap.io','Rug Rumble':  'https://www.rugrumble.xyz/','LootGO':  'https://www.lootgo.app/','Plato': 'https://m.getplato.app/monad','DRKVRS':  'https://www.drkvrs.io/','Showdown': 'https://showdown.win/', 'Opinion Labs': 'https://app.olab.xyz/','Dusted':  'https://www.dusted.app/','Fantasy Top': 'https://monad.fantasy.top/','RareBetSports': 'https://www.rarebetsports.io/','Nad.fun': 'https://testnet.nad.fun','Opals': 'https://opals.io/', 'Kizzy': 'https://testnet.kizzy.io','iZUMi Finance':'https://alpha.izumi.finance/','Curvance':  'https://app.curvance.com/monad','Purps': 'https://app.purps.xyz','Amertis':  'https://testnet.amertis.exchange/','Ambient': 'https://ambient.finance/','Apriori':  'https://stake.apr.io','Accountable': 'https://game.accountable.capital/','Pancake Swap': 'https://pancakeswap.finance/',  'Kuru': 'https://kuru.io','OctoSwap':  'https://octo.exchange/','Magma': 'https://www.magmastaking.xyz/','Monorail':  'https://testnet-preview.monorail.xyz/','Mudigital': 'https://testnet.mudigital.net/','Fastlane': 'https://shmonad.fastlane.xyz/','Sherpa': 'https://app.sherpa.trade/','Kintsu': 'https://kintsu.xyz/','Bean Exchange':  'https://swap.bean.exchange/','Crust Finance': 'https://testnet.crust.finance','Narwhal Finance': 'https://testnet.narwhal.finance/','Pingu Exchange': 'https://pingu.exchange/','Nitro Finance': 'https://testapp.nitrofinance.xyz/','Clober': 'https://alpha.clober.io/trade','Atlantis': 'https://app.atlantisdex.xyz/','Mace': 'https://testnet.swaps.mace.ag/','Uniswap': 'https://app.uniswap.org/'};
const categoryData = [
  {
    label: "NFT",
    happyImg: "/happy_chog.png",
    sadImg: "/sad_chog.png",
    gradient: "from-pink-500 to-pink-300",
  },
  {
    label: "DeFi",
    happyImg: "/happy_salmonad.png",
    sadImg: "/sad_salmonad.png",
    gradient: "from-cyan-500 to-cyan-300",
  },
  {
    label: "Gaming",
    happyImg: "/happy_moyaki.png",
    sadImg: "/sad_moyaki.png",
    gradient: "from-green-400 to-lime-300",
  },
  {
    label: "Social",
    happyImg: "/happy_molandak.png",
    sadImg: "/sad_molandak.png",
    gradient: "from-purple-500 to-violet-300",
  },
  {
    label: "Others",
    happyImg: "/happy_mosferatu.png",
    sadImg: "/sad_mosferatu.png",
    gradient: "from-yellow-400 to-amber-200",
  },
];

function safePercentChange(current: number, prev: number): number {
  return prev === 0 ? 0 : Number(((current - prev) / prev).toFixed(2));
}

export default function Home() {
  const [blockNumber, setBlockNumber] = useState(null);
  const [gasUsed, setGasUsed] = useState(null);
  const [gasLimit, setGasLimit] = useState(null);
  const [volume, setVolume] = useState(null);
  const [tps, setTps] = useState<number>(0);
  const [topDapps, setTopDapps] = useState<[string, number][]>([]);
  const [barTot, setBarTot] = useState(Array(5).fill(0));
  const [percentageBarChange, setPercentageBarChange] = useState([0.0,0.0,0.0,0.0,0.0]);
  const [latestTxs, setLatestTxs] = useState<{ hash: string; value: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });

        if (!response.ok) { throw new Error(`HTTP error: ${response.status} ${response.statusText}`); }
  
        const result = await response.json();

        setBlockNumber(result.blockNumber);
        setGasUsed(result.gasUsed);
        setGasLimit(result.gasLimit);
        setVolume(result.volume);
        setTps(result.tps);
        setLatestTxs(
          result.transactions.map((tx: { hash: string; value: string }) => ({
            hash: tx.hash,
            value: tx.value,
          }))
        );

        const prevNftsTot = (Object.values(result.previousCounts.nftsCount) as number[]).reduce((sum, val) => sum + val, 0);
        const prevDefiTot =
          (Object.values(result.previousCounts.defiCount) as number[]).reduce((sum, val) => sum + val, 0) +
          (Object.values(result.previousCounts.defiTokensCount) as number[]).reduce((sum, val) => sum + val, 0);
        const prevGamingTot = (Object.values(result.previousCounts.gamingCount) as number[]).reduce((sum, val) => sum + val, 0);
        const prevSocialTot = (Object.values(result.previousCounts.socialCount) as number[]).reduce((sum, val) => sum + val, 0);
        const prevOthersTot = result.previousCounts.tps - prevNftsTot - prevDefiTot - prevGamingTot - prevSocialTot;

        const nftsTot = (Object.values(result.nftsCount) as number[]).reduce((sum, val) => sum + val, 0);
        const defiTot =
          (Object.values(result.defiCount) as number[]).reduce((sum, val) => sum + val, 0) +
          (Object.values(result.defiTokensCount) as number[]).reduce((sum, val) => sum + val, 0);
        const gamingTot = (Object.values(result.gamingCount) as number[]).reduce((sum, val) => sum + val, 0);
        const socialTot = (Object.values(result.socialCount) as number[]).reduce((sum, val) => sum + val, 0);
        const othersTot = result.tps - nftsTot - gamingTot - socialTot - defiTot;

        const changes = [
          safePercentChange(nftsTot, prevNftsTot),
          safePercentChange(defiTot, prevDefiTot),
          safePercentChange(gamingTot, prevGamingTot),
          safePercentChange(socialTot, prevSocialTot),
          safePercentChange(othersTot, prevOthersTot),
        ];
        setPercentageBarChange(changes);
        setBarTot([nftsTot, defiTot, gamingTot, socialTot, othersTot]);

        const combined = { ...result.nftsCount, ...result.defiCount, ...result.gamingCount, ...result.socialCount};
        const sortedCombined = Object.fromEntries(
          Object.entries(combined).sort(([, a], [, b]) => (b as number) - (a as number))
        );

        const top = Object.entries(sortedCombined).slice(0, 13) as [string, number][];
        setTopDapps(top);


      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatValue = (val: string) => {
    const mon = Number(BigInt(val) / BigInt(1e16)) / 100;
    return mon.toFixed(2);
  };

  const maxVal = Math.max(...barTot);
  const maxIndex = barTot.findIndex((v) => v === maxVal);

  return (
  <div className="flex flex-col h-screen w-full bg-black p-4">
    <AudioManager maxIndex={maxIndex} />

    {/* Header */}
    <div className="w-full mb-1 p-0 bg-black">
      <div className="relative text-center mt-2">
        <h1 className="text-1xl md:text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-500 via-purple-500 drop-shadow-[0_0_15px_rgba(200,100,255,0.6)]">
          A N I M O N A&nbsp;  
          <span className="relative w-[3rem] h-[3rem] inline-block align-middle ml-2">
            <img
              src="cool_salmonad.png"
              alt="D"
              className="absolute inset-0 object-contain w-full h-full animate-bounce drop-shadow-[0_0_10px_rgba(200,0,255,0.7)]"
            />
          </span>
        </h1>
      </div>
    </div>

    {/* Main Container */}
    <div className="flex flex-col lg:flex-row gap-6 items-stretch min-w-0 flex-grow overflow-hidden">

      {/* Left Container */}
      <div className="flex-1 flex flex-col bg-black text-white overflow-hidden rounded-xl">

        {/* Top Metric Box */}
        {blockNumber && gasUsed && gasLimit && volume && tps && (
          <div className="m-2 p-2 rounded-xl bg-black">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Block Number */}
              <div className="flex flex-col items-center space-y-1 w-full">
                <div className="relative w-full h-6 bg-gray-950 border border-purple-400 rounded-lg overflow-hidden shadow-[0_0_8px_#a78bfa]">
                  <div className="h-full bg-purple-500/80 w-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-purple-100 font-semibold">
                      #{blockNumber}
                    </span>
                  </div>
                </div>
                <div className="text-white text-xs mt-1">🧱 Block</div>
              </div>

              {/* Volume */}
              <div className="flex flex-col items-center space-y-1 w-full">
                <div className="relative w-full h-6 bg-gray-950 border border-indigo-400 rounded-lg overflow-hidden shadow-[0_0_8px_#818cf8]">
                  <div className="h-full bg-indigo-500/80 w-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-indigo-100 font-semibold">
                      {formatValue(volume)} MON
                    </span>
                  </div>
                </div>
                <div className="text-white text-xs mt-1">💰 Volume/s</div>
              </div>

              {/* Gas Usage */}
              <div className="flex flex-col items-center space-y-1 w-full">
                <div
                  className="relative w-full h-6 bg-gray-900 border border-pink-500 rounded-lg overflow-hidden shadow-[0_0_8px_#ec4899]"
                  title={`⛽ ${Number(BigInt(gasUsed) / BigInt(1e6)).toLocaleString()} / ${Number(BigInt(gasLimit) / BigInt(1e6)).toLocaleString()} Mwei/s`}
                >
                  <div
                    className="h-full bg-pink-500 transition-all duration-500"
                    style={{
                      width: `${Math.min((Number(gasUsed) / Number(gasLimit)) * 100, 100)}%`,
                    }}
                  />
                  <div className="absolute right-0 top-0 h-full w-12 bg-black/30 flex items-center justify-end pr-2">
                    <span className="text-xs text-pink-200 drop-shadow-[0_0_2px_#ec4899]">
                      {((Number(gasUsed) / Number(gasLimit)) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="text-white text-xs mt-1">
                  ⛽ {(BigInt(gasUsed) / BigInt(1e6)).toString()} Mwei/s
                </div>
              </div>

              {/* TPS */}
              <div className="flex flex-col items-center space-y-1 w-full">
                <div
                  className="relative w-full h-6 bg-gray-900 border border-lime-400 rounded-lg overflow-hidden shadow-[0_0_8px_#84cc16]"
                  title={`⚡ ${tps.toLocaleString()} TPS / 10,000`}
                >
                  <div
                    className="h-full bg-lime-400 transition-all duration-500"
                    style={{
                      width: `${Math.min((tps / 10000) * 100, 100)}%`,
                    }}
                  />
                  <div className="absolute right-0 top-0 h-full w-12 bg-black/30 flex items-center justify-end pr-2">
                    <span className="text-xs text-lime-200 drop-shadow-[0_0_2px_#84cc16]">
                      {Math.min((tps / 10000) * 100, 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="text-white text-xs mt-1">⚡ {tps} TPS</div>
              </div>
            </div>
          </div>
        )}

        {/* Graph Container */}
        <div className="flex-grow m-2 p-3 rounded-xl bg-black/80 shadow-[0_0_30px_#9333ea80] flex flex-col h-full min-h-0">
          <div className="flex-shrink-0 flex justify-between items-center text-white px-4 pb-2 min-h-[60px]">
            <h2 className="text-xl font-semibold"></h2>
            <a
              href="https://docs.google.com/spreadsheets/d/11vji0UhVjwzCRdvb8TXzBo5jSl0X_i-p0xP5rRgjui4/edit?gid=715484899#gid=715484899"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
            </a>
          </div>

          {/* Bar Chart */}
          <div className="flex-1 flex flex-col justify-end px-2 pb-4 w-full h-full">
            {barTot.every(val => val === 0) ? (
              <div className="text-white text-xs flex items-center justify-center w-full h-full">No data available</div>
            ) : (
              <div className="flex justify-around items-end w-full h-full">
                {categoryData.map((item, idx) => {
                  const value = barTot[idx] || 0;
                  const maxValue = Math.max(...barTot, 1);
                  const heightPercent = (value / maxValue) * (100 * (5 / 6));
                  const change = percentageBarChange?.[idx] ?? 0;
                  const isTop = value === maxValue;

                  console.log(
                    `Bar ${item.label}: value=${value}, maxValue=${maxValue}, heightPercent=${heightPercent}%`
                  );

                  return (
                    <div key={idx} className="flex flex-col items-center w-20 h-full">
                      <div className="relative w-full flex items-end justify-center h-full">
                        {/* Bar */}
                        <div
                          className={`w-10 rounded-t-xl bg-gradient-to-t ${item.gradient} transition-all duration-700 ${
                            isTop ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-105" : ""
                          }`}
                          style={{
                            height: `${heightPercent}%`,
                            zIndex: 1,
                            backgroundImage: `linear-gradient(to top, ${item.gradient.split(" ")[0]}, ${item.gradient.split(" ")[2]})`,
                          }}
                        />

                        <div
                          className="absolute flex flex-col items-center transition-all duration-700"
                          style={{
                            bottom: `${heightPercent}%`,
                            transform: "translateY(-10%)",
                            zIndex: 2,
                          }}
                        >
                          <img
                            src={change >= 0 ? item.happyImg : item.sadImg}
                            alt={item.label}
                            className={`transition-all duration-500 ${
                              isTop ? "w-16 h-16" : "w-12 h-12 opacity-80"
                            }`}
                          />
                          <div className="text-xs font-bold text-white mt-1 flex items-center space-x-1">
                            <span>{value}</span>
                            <span
                              className={`text-sm ${
                                change > 0 ? "text-green-400" : change < 0 ? "text-red-400" : "text-gray-400"
                              }`}
                            >
                              {change > 0 ? "▲" : change < 0 ? "▼" : "–"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-white font-semibold mt-2 text-center">{item.label}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

                {/* Caption */}
                <div className="flex-shrink-0 flex justify-between items-center text-xs text-white px-4 py-2">
                  <span className="flex-1 text-center font-bold text-lg">🌈 TPS vs Categories</span>
                  <a
                    href="https://docs.google.com/spreadsheets/d/11vji0UhVjwzCRdvb8TXzBo5jSl0X_i-p0xP5rRgjui4/edit?gid=715484899#gid=715484899"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    🔗
                  </a>
              </div>
            </div>
          </div>
  
          {/* Right Container */}
          <div className="flex-1 flex flex-col p-0 bg-black text-white rounded-2xl min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full h-full min-h-0">

              {/* Top dApps */}
              <div className="flex flex-col h-full overflow-hidden min-h-0 bg-gradient-to-br from-pink-900/60 via-purple-900/70 to-black/80 p-3 rounded-xl shadow-[0_0_15px_#9333ea80] border border-pink-300/10 backdrop-blur text-xs">
                <h2 className="text-white text-lg font-semibold mb-2 shrink-0">💻&nbsp; Top&nbsp; 10&nbsp; dApps</h2>
                <div className="flex-1 overflow-hidden min-h-0 relative">
                  <table className="w-full table-fixed text-white text-xs border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-pink-800/20 text-pink-200">
                        <th className="text-left px-2 py-1 w-10 border-b border-pink-400/20"></th>
                        <th className="text-left px-2 py-1 border-b border-pink-400/20">Name</th>
                        <th className="text-right px-2 py-1 w-12 border-b border-pink-400/20">TPS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topDapps?.map(([name, tps], idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-pink-700/10 transition-all duration-150"
                          style={{ height: "32px" }}
                        >
                          <td className="px-2 py-1 border-b border-pink-300/10">
                            {logos?.[name as keyof typeof logos] ? (
                              <img src={logos[name as keyof typeof logos]} alt={name} className="w-5 h-5 rounded-lg" />
                            ) : (
                              <span className="text-pink-300 text-xs">N/A</span>
                            )}
                          </td>
                          <td className="px-2 py-1 border-b border-pink-300/10 truncate">
                            {urls?.[name as keyof typeof urls] ? (
                              <a
                                href={urls[name as keyof typeof urls]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline"
                              >
                                Visit
                              </a>
                            ) : (
                              <span className="text-pink-300 text-xs">N/A</span>
                            )}

                          </td>
                          <td className="px-2 py-1 border-b border-pink-300/10 text-right">
                            {tps}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Latest Transactions */}
              <div className="flex flex-col h-full overflow-hidden min-h-0 bg-gradient-to-br from-purple-900/60 via-pink-900/70 to-black/80 p-3 rounded-xl shadow-[0_0_15px_#9333ea80] border border-purple-300/10 backdrop-blur text-xs">
                <h2 className="text-white text-lg font-semibold mb-2 shrink-0">💵&nbsp; Latest&nbsp; TXs</h2>
                <div className="flex-1 overflow-hidden min-h-0 relative">
                  <table className="w-full table-fixed text-white text-xs border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-purple-800/20 text-purple-200">
                        <th className="text-left px-2 py-1 w-36 border-b border-purple-400/20">Hash</th>
                        <th className="text-right px-2 py-1 w-16 border-b border-purple-400/20">MON</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestTxs?.map((tx, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-purple-700/10 transition-all duration-150"
                          style={{ height: "32px" }}
                        >
                          <td className="px-2 py-1 border-b border-purple-300/10 truncate">
                            <a
                              href={`https://testnet.monadexplorer.com/tx/${tx.hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-purple-300 block truncate text-purple-100"
                            >
                              {tx.hash.slice(0, 6)}...{tx.hash.slice(-6)}
                            </a>
                          </td>
                          <td className="px-2 py-1 border-b border-purple-300/10 text-right text-purple-100">
                            {formatValue(tx.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full mt-4 p-0 bg-black">
          <div className="relative text-center mt-2">
            <h1 className="text-xs text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-500 via-purple-500 drop-shadow-[0_0_15px_rgba(200,100,255,0.6)]">
              Built by <a href="https://x.com/Samruddhi_Krnr" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-300">Samk</a>
            </h1>
          </div>
        </div>

      </div>
  );
}

const sounds = ["a_2", "d_2", "c_2", "b_2", "e_2"].map((n) => `/sounds/${n}.mp3`);

const AudioManager = ({ maxIndex }: { maxIndex: number }) => {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      setElapsed(((Date.now() - start) / 1000) % 20);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    audioRefs.current.forEach((audio, idx) => {
      if (!audio) return;

      if (idx === maxIndex) {
        if (audio.paused || Math.abs(audio.currentTime - elapsed) > 0.3) {
          audio.currentTime = elapsed;
          audio.play().catch(() => {});
        }
      } else {
        audio.pause();
      }
    });
  }, [maxIndex, elapsed]);

  return (
    <>
      {sounds.map((src, idx) => (
        <audio
          key={idx}
          src={src}
          ref={(el) => (audioRefs.current[idx] = el!)}
          preload="auto"
        />
      ))}
    </>
  );
};