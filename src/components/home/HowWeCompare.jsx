import React from 'react';

const HowWeCompare = () => {
  const features = [
    'No Vet Visits',
    'Available 24/7',
    'Receive GPS Location text alerts',
    'Online Pet Profile',
    'Access To Owners Details',
    'Protect Multiple Pets',
    'Vet & Medical Information',
    "What's App Location Sharing",
    'One Price For All Features',
  ];

  return (
    <div className="w-full bg-white py-16 px-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto min-w-0">
        <h2 className="font-helvetica-neue font-bold text-[20px] md:text-[40px] text-[#0F2137] text-center mb-6 md:mb-12">
          The Digital Tails Difference
        </h2>

        {/* Mobile: single grid so header and rows share same column tracks */}
        <div className="md:hidden min-w-0 overflow-hidden rounded-lg shadow-sm border border-gray-100 grid grid-cols-[45%_1fr_1fr_1fr]">
          <div className="font-helvetica-neue font-bold text-[12px] text-white flex items-center justify-center p-3 bg-[#3A9BC9]">Feature</div>
          <div className="font-helvetica-neue font-bold text-[10px] sm:text-[11px] text-[#0F2137] text-center flex items-center justify-center p-3 bg-[#FDE68A]">Digital Tails</div>
          <div className="font-helvetica-neue font-bold text-[10px] sm:text-[11px] text-white text-center flex items-center justify-center p-3 bg-[#3A9BC9]">Microchipped</div>
          <div className="font-helvetica-neue font-bold text-[10px] sm:text-[11px] text-[#0F2137] text-center flex items-center justify-center p-3 bg-[#FDE68A]">Other Brands</div>
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <div className="font-helvetica-neue font-normal text-[14px] text-[#283646] p-3 bg-[#4CB2E2]/20 flex items-center break-words border-t border-gray-200">{feature}</div>
              <div className="text-center text-green-600 font-bold p-3 flex items-center justify-center bg-[#FEFCE8] border-t border-gray-200">✓</div>
              <div className="text-center text-red-500 font-bold p-3 flex items-center justify-center bg-[#4CB2E2]/20 border-t border-gray-200">✗</div>
              <div className={`text-center font-bold p-3 flex items-center justify-center bg-[#FEFCE8] border-t border-gray-200 ${index >= features.length - 2 ? 'text-red-500' : 'text-green-600'}`}>
                {index >= features.length - 2 ? '✗' : '✓'}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Desktop: table - col1 light blue, col2 yellow, col3 blue, col4 yellow */}
        <div className="hidden md:block">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr>
                <th className="text-left font-helvetica-neue font-bold text-[16px] p-4 bg-[#3A9BC9] text-white">
                  Feature
                </th>
                <th className="text-center font-helvetica-neue font-bold text-[16px] p-4 bg-[#FDE68A] text-[#0F2137]">
                  Digital Tails
                </th>
                <th className="text-center font-helvetica-neue font-bold text-[16px] p-4 bg-[#3A9BC9] text-white">
                  Microchipped
                </th>
                <th className="text-center font-helvetica-neue font-bold text-[16px] p-4 bg-[#FDE68A] text-[#0F2137]">
                  Other Brands
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index}>
                  <td className="font-helvetica-neue text-[16px] text-[#283646] p-4 bg-[#4CB2E2]/20">
                    {feature}
                  </td>
                  <td className="text-center text-green-600 font-bold p-4 bg-[#FEFCE8]">✓</td>
                  <td className="text-center text-red-500 font-bold p-4 bg-[#4CB2E2]/20">✗</td>
                  <td className={`text-center font-bold p-4 bg-[#FEFCE8] ${index >= features.length - 2 ? 'text-red-500' : 'text-green-600'}`}>
                    {index >= features.length - 2 ? '✗' : '✓'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HowWeCompare;
