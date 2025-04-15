// import React from 'react';

// const Upper = () => {
//   return (
//     <div className='flex justify-around items-center text-black p-4 bg-white-1000 mt-12'>
//       <div className='flex flex-col items-center text-center space-y-1'>
//         <div className=' justify-center align-middle h-14 w-14 bg-[#000000] flex rounded-full  border-2 border-gray-500 '>
//         <img src='/icons/delivery.png' alt='Free Delivery' className=' flex justify-center align-middle w-8 h-8' />
//         </div>
//         <p className='font-semibold'>Free AND FAST DELIVERY</p>
//         <p className='text-sm'>Free delivery for all orders above RS.2000</p>
//       </div>

//       <div className='flex flex-col items-center text-center space-y-1'>
//         <img src='/icons/Customer service.png' alt='Customer Service' className='w-8 h-8' />
//         <p className='font-semibold'>24/7 CUSTOMER SERVICE</p>
//         <p className='text-sm'>Friendly 24/7 customer support</p>
//       </div>

//       <div className='flex flex-col items-center text-center space-y-1'>
//         <img src='/icons/secure.png' alt='Money Back' className='w-8 h-8' />
//         <p className='font-semibold'>MONEY BACK GUARANTEE</p>
//         <p className='text-sm'>We return money within 30 days</p>
//       </div>
//     </div>
//   );
// };

// export default Upper;
import React from 'react';

const Upper = () => {
  return (
    <div className="flex justify-around items-center text-black p-4 bg-white mt-12">

      <div className="flex flex-col items-center text-center space-y-1">
        <div className="flex justify-center items-center h-16 w-16 bg-black rounded-full border-6 border-gray-400">
          <img src="/icons/delivery.png" alt="Free Delivery" className="w-8 h-8" />
        </div>
        <p className="font-semibold mt-1">FREE AND FAST DELIVERY</p>
        <p className="text-sm">Free delivery for all orders above RS.2000</p>
      </div>

      <div className="flex flex-col items-center text-center space-y-1">
        <div className="flex justify-center items-center h-16 w-16 bg-black rounded-full border-6 border-gray-400">
          <img src="/icons/Customer service.png" alt="Customer Service" className="w-8 h-8" />
        </div>
        <p className="font-semibold mt-1">24/7 CUSTOMER SERVICE</p>
        <p className="text-sm">Friendly 24/7 customer support</p>
      </div>


      <div className="flex flex-col items-center text-center space-y-1">
        <div className="flex justify-center items-center h-16 w-16 bg-black rounded-full border-6 border-gray-400">
          <img src="/icons/secure.png" alt="Money Back" className="w-8 h-8" />
        </div>
        <p className="font-semibold mt-1">MONEY BACK GUARANTEE</p>
        <p className="text-sm">We return money within 30 days</p>
      </div>
    </div>
  );
};

export default Upper;
