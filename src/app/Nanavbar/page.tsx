import  Link from 'next/link';


function Navbar() {
    return (
      <nav className="w-full bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
        <div className="text-lg font-bold">My Dashboard</div>
        <ul className="flex gap-4">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
  export default Navbar;