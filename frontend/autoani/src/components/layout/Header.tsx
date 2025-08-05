import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-slate-900 text-white py-4">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-2xl font-bold">
          AutoAni
        </Link>
      </div>
    </header>
  );
};

export default Header;
