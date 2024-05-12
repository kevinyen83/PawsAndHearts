import Link from 'next/link';

const DonateSuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Donation Successful</h1>
      <p className="text-lg mb-8">Your donation was successful.</p>
      <Link href="/adopt_a_paw">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Return to HOME page
        </button>
      </Link>
    </div>
  );
};

export default DonateSuccessPage;
