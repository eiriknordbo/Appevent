import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="flex justify-start items-left bg-[#3D5499] py-4">
      <Link
        to="/home"
        className="hover:scale-120 left-0  text-3xl text-[#FFFFFF]  p-10 "
      >
        Appevent
      </Link>
    </footer>
  );
}
