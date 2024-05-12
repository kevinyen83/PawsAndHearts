import Link from 'next/link';

const DonateCancelPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Donation Cancelled</h1>
      <p className="text-lg mb-8">Your donation was cancelled.</p>
      <Link href="/adopt_a_paw">
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Return to HOME page
        </button>
      </Link>
    </div>
  );
};

export default DonateCancelPage;
