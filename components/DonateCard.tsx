import axios from 'axios'
import Link from 'next/link'

const DonateCard = ({price}) => {

// POST request 
const handleSubscription = async (e) => {
  e.preventDefault();
  const { data } = await axios.post('/api/payment',
  {
    priceId: price.id
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  );
  window.location.assign(data)
}

  return (
    <div className='border-gray-100 shadow-2xl border-4 text-center mt-10 max-w-[1040px]'>
       <div>
        <div className=' flex justify-center items-center bg-gray-100 h-28 font-bold'>
           <h4 className='text-3xl'>Plan</h4>
        </div>
        <div>
          <div className='flex flex-col items-center justify-center pt-4'>
              <h1 className='text-5xl font-bold'> 
              {(price.unit_amount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
              </h1>
          </div>
          <button className='mt-8 flex w-full justify-center rounded-md border border-transparent bg-blue-700 hover:bg-blue-800 py-2 px-4 text-sm font-medium text-white shadow-sm' onClick={handleSubscription}>
          Donate
          </button>
        </div>
       </div>
    </div>
  )
}

export default DonateCard