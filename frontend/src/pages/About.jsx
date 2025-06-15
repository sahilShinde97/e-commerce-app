import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>

    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'} text2={'US'} />
    </div>

    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to our cake shop! We are passionate about baking the most delicious and beautiful cakes for all your special moments. Each of our cakes is made with love, care, and the finest ingredients.</p>

        <p>From birthdays and weddings to everyday sweet cravings, we offer a wide variety of cakes that suit every occasion and taste. Our team is dedicated to bringing smiles through every slice.</p>
        
        <b className='text-gray-800'>Our Mission</b>
        
        <p>Our mission is to deliver joy and celebration through premium-quality cakes, crafted with creativity and commitment. We strive to be your trusted partner for every sweet memory.</p>
      </div>
    </div>

    <div className='text-xl py-4'>
      <Title text1={'WHY'} text2={'CHOOSE US'}/>
    </div>

    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>Our cakes are made from premium ingredients and baked fresh every day. We maintain the highest standards of hygiene and taste to ensure a delightful experience every time.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convenience:</b>
        <p className='text-gray-600'>Easily browse, select, and order your favorite cakes online from the comfort of your home. We ensure timely deliveries and a smooth shopping experience for every customer.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-600'>Our friendly support team is always here to help you with customizations, queries, or special requests. We believe in making your cake-buying journey as sweet as the cake itself.</p>
      </div>
    </div>

    <NewsLetterBox />

    </div>
  )
}

export default About
