import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      {/* Section Title */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Section */}
      <div className="my-16 px-4 flex flex-col-reverse md:flex-row justify-center items-center gap-10">
        {/* Text Content */}
        <div className="flex flex-col justify-center items-start gap-6 max-w-lg text-gray-700">
          <div>
            <p className="font-semibold text-xl mb-1 text-gray-800">Our Store</p>
            <p className="text-gray-600 leading-relaxed text-sm">
              E-1, 33, B-3, Ekta Apartment,<br />
              Sector-10, Ground Floor,<br />
              Nerul, Navi Mumbai - 400706
            </p>
          </div>
          <div className="text-sm">
            <p className="text-gray-600">
              <span className="font-medium text-black">Phone:</span> +91-913-651-8859
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-black">Email:</span> chinchpure4287@gmail.com
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:max-w-[480px]">
          <img src={assets.contact_img} alt="Contact Us" className="w-full rounded-lg shadow-md" />
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetterBox />
    </div>
  )
}

export default Contact
