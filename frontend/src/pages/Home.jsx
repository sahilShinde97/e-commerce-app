import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import { OurPolicy } from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
  return (
    <div>
      <div className="bg-white">
        <Hero />
      </div>
      <div className="bg-gray-50">
        <LatestCollection />
      </div>
      <div className="bg-white">
        <BestSeller />
      </div>
      <div className="bg-gray-50">
        <OurPolicy />
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Home
