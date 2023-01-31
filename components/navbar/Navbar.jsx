import Link from "next/link";


const Navbar = () => {
  return (
    <div className="capitalize hidden md:flex">
      <ul className="flex items-center space-x-12 text-white">
        <li >
          <Link className="cursor-pointer"  href="/">home</Link>
        </li>
        <li>
          <Link href="/">posts</Link>
        </li>
        <li>
          <Link href="/">contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
