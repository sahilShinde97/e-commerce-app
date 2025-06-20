import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-3 mb-3">
      <p className="text-gray-500">
        {text1}{' '}
        <span className="text-[#BFA760] font-medium">{text2}</span>
      </p>
      <div className="w-8 sm:w-12 h-[1.5px] bg-gradient-to-r from-[#BFA760] to-[#FFD700] rounded"></div>
    </div>
  )
}

export default Title
