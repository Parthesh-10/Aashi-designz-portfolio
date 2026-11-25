import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-16">
      <div className="max-w-md w-full mb-6">
        <img src="/img/errorImg.svg" alt="Page not found" className="w-full h-auto" />
      </div>
      <h3 className="text-2xl font-medium text-[#313944] mb-6">
        Ohh Snap!! The Page Cannot be found.
      </h3>
      <Link href="/">
        <button className="h-[2.4rem] px-6 rounded-[20px] bg-[#b487ef] text-white text-base border-0 cursor-pointer">
          Home Page
        </button>
      </Link>
    </div>
  );
}
