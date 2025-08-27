import React from 'react';
import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu';
import { FaChartLine, FaRegStar } from "react-icons/fa";

const AuthLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen'>
      {/* Left Panel - Main Content */}
      <div className="flex flex-col w-full md:w-[60vw] px-6 md:px-12 pt-8 pb-12">
        {/* Logo */}
        <span className='flex flex-row'>
          <h2 className='text-2xl font-semibold text-black'>Fin</h2>
          <h2 className='text-2xl font-semibold text-indigo-600'>Track</h2>
        </span>
        {/* Children (Login/Signup Forms) */}
        <div className='flex-1 flex items-center justify-center'>
            {children}
        </div>
      </div>

      {/* Right Panel - Dynamic Visual Section */}
      <div className='hidden md:flex flex-col items-center justify-center h-screen w-[60vw] p-8 relative overflow-hidden
      bg-gradient-to-br from-indigo-600 to-fuchsia-500 after:content-[""] after:absolute after:inset-0 after:bg-texture-pattern after:animate-flow'>
        
        {/* Decorative Shapes */}
        <div className='w-48 h-48 rounded-[40px] bg-purple-500/50 absolute top-10 -left-10 transform -rotate-12' />
        <div className='w-48 h-56 rounded-[40px] border-[20px] border-white/20 absolute bottom-10 -right-10 transform rotate-12' />

        {/* Added Text Headings */}
        <div className='relative z-20 text-center mb-10'>
          <h1 className='text-4xl font-bold text-white mb-2'>
            Your Financial Journey Starts Here
          </h1>
          <p className='text-lg text-white/80 max-w-sm mx-auto'>
            See your money in a new light with smart tracking and powerful insights.
          </p>
        </div>

        {/* Stats Cards with Layered Effect */}
        <div className='flex flex-col gap-6 z-20 w-full max-w-sm'>
          <StatsInfoCard
            icon={<FaChartLine />}
            label="Total Balance"
            value="4,30,000"
            trendType="up"
            percentage="3.2"
          />
          <StatsInfoCard
            icon={<FaRegStar />}
            label="Monthly Savings"
            value="1,25,000"
            trendType="down"
            percentage="1.5"
            className="md:self-end"
          />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, trendType, percentage, className }) => {
  const isUp = trendType === 'up';
  const TrendIcon = isUp ? LuTrendingUp : LuTrendingDown;
  const trendColor = isUp ? 'text-green-400' : 'text-red-400';

  return (
    <div className={`flex flex-col p-6 rounded-2xl shadow-xl transition-all duration-300 transform
    bg-white/10 backdrop-blur-md border border-white/20
    hover:scale-105 ${className}`}>
      
      {/* Icon & Label */}
      <div className='flex items-center justify-between mb-4'>
        <div className='w-14 h-14 flex items-center justify-center text-[28px] text-white
        bg-white/20 border border-white/50 rounded-full'>
          {icon}
        </div>
        <div className='flex items-center gap-1'>
          <TrendIcon className={`text-xl ${trendColor}`} />
          <span className={`text-sm font-semibold ${trendColor}`}>{percentage}%</span>
        </div>
      </div>

      {/* Value & Chart */}
      <div className='flex flex-col'>
        <span className='text-sm text-gray-200 mb-1'>{label}</span>
        <div className='flex items-end justify-between'>
          <span className='text-3xl text-white font-semibold'>₹{value}</span>
          {/* Mini Sparkline Chart */}
          <svg className="w-24 h-12" viewBox="0 0 100 50">
            <path
              d="M0 45 L20 20 L40 35 L60 10 L80 30 L100 5"
              fill="none"
              stroke={isUp ? "#86EFAC" : "#F87171"}
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}