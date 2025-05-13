import React from 'react'

const Profile = ({ id }) => {
  return (
    <div className="max-w-[673px] mx-auto px-4 py-16">
      {/* Title */}
      <h1 className="font-helvetica-neue font-medium text-[24px] sm:text-[32px] md:text-[48px] leading-[100%] text-black text-center capitalize mb-8">
        Pet Profile Overview
      </h1>

      {/* Pet Image */}
      <div className="flex justify-center mb-8">
        <div className="w-[130px] h-[130px] rounded-full overflow-hidden">
          <img 
            src="/profile/profile.svg" 
            alt="Pet" 
            className="w-full h-full object-cover"
            onError={(e) => e.target.src = "/fallback-pet-image.svg"}
          />
        </div>
      </div>

      {/* Top Action Buttons */}
      <div className="flex justify-between gap-4 mb-4">
        <div className="w-[328.5px] h-[34px] bg-[#DBEEFF] rounded-[8px] px-4 py-2 flex items-center justify-center">
          <span className="font-afacad font-medium text-[12px] leading-[18px] text-[#0897FF] text-center">
            Domestic Short-hair X No
          </span>
        </div>
        <div className="w-[328.5px] h-[34px] bg-[#DBEEFF] rounded-[8px] px-4 py-2 flex items-center justify-center">
          <span className="font-afacad font-medium text-[12px] leading-[18px] text-[#0897FF] text-center">
            Female
          </span>
        </div>
      </div>

      {/* Share Location Buttons */}
      <div className="space-y-4 mb-4">
        <button className="w-full h-[57px] bg-[#4CB2E2] rounded-[12px] text-white font-medium flex items-center justify-center gap-2">
          <img src="/profile/location.svg" alt="Location icon" />
          Share Location
        </button>
        <button 
          className="w-full h-[57px] rounded-[12px] text-black font-medium flex items-center justify-center gap-2"
          style={{
            background: 'radial-gradient(58.93% 58.93% at 50% 77.68%, #FFD700 0%, #B89D0B 100%)'
          }}
        >
          <img src="/profile/call.svg" alt="Call icon" />
          Call Owner
        </button>
      </div>

      {/* Help Text */}
      <p className="font-afacad text-[15px] leading-[22.5px] text-[#4E4E4E] text-center mb-8">
        If you've found me, share location with my owner using the button above, or contact them using the details.
      </p>

      {/* Address Section */}
      <div className="w-full border border-gray-200 rounded-[8px] p-4 mb-8">
        <h2 className="font-afacad font-semibold text-[18px] leading-[25.2px] mb-4">
          Addresses
        </h2>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-afacad font-semibold text-[18px] leading-[25.2px] mb-2">
            Owner
          </h3>
          <p className="font-afacad font-normal text-[16px] leading-[25.6px] text-[#666666]">***************oad</p>
          <p className="font-afacad font-normal text-[16px] leading-[25.6px] text-[#666666]">Oldham</p>
          <p className="font-afacad font-normal text-[16px] leading-[25.6px] text-[#666666]">Greater Manchester</p>
          <p className="font-afacad font-normal text-[16px] leading-[25.6px] text-[#666666]">OL84LN</p>
        </div>

        <hr className='mt-4' />
        <p className="text-sm text-gray-500 mt-4 italic ">
          The full address is hidden for privacy. Please contact the owner if you require it to return Ellie.
        </p>
      </div>

      {/* Pet Information Section */}
      <div className="w-full border border-gray-200 rounded-[8px] p-4 mb-8">
        <h2 className="font-afacad font-semibold text-[18px] leading-[25.2px] mb-4">
          Pet Information
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-afacad font-semibold text-[16px]">Pet Name</h3>
            <p className="text-gray-700">Braddy</p>
          </div>
          <div>
            <h3 className="font-afacad font-semibold text-[16px]">Notes</h3>
            <p className="text-gray-700">None</p>
          </div>
          <div>
            <h3 className="font-afacad font-semibold text-[16px]">Allergies</h3>
            <p className="text-gray-700">None</p>
          </div>
          <div>
            <h3 className="font-afacad font-semibold text-[16px]">Medication</h3>
            <p className="text-gray-700">None</p>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <button className="flex items-center justify-center gap-2 w-full md:w-[386px] h-[60px] md:h-[74px] bg-[#4CB2E2] text-white rounded-[100px] px-4 md:px-8 text-sm md:text-base">
          <img src="/profile/wa.svg" alt="WhatsApp" className="w-5 h-5 md:w-6 md:h-6" />
          Whatsapp Conversation
        </button>
        <button 
          className="flex items-center justify-center gap-2 w-full md:w-[386px] h-[60px] md:h-[74px] rounded-[100px] px-4 md:px-8 text-black text-sm md:text-base mt-3 md:mt-0"
          style={{
            background: 'radial-gradient(58.93% 58.93% at 50% 77.68%, #FFD700 0%, #B89D0B 100%)'
          }}
        >
          <img src="/profile/messanger.svg" alt="Location" className="w-5 h-5 md:w-6 md:h-6" />
          Share Location On Message
        </button>
      </div>
    </div>
  )
}

export default Profile
