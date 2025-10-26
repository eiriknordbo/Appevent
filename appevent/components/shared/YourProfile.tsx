import { Link } from "react-router";

export default function YourProfile() {
  return (
    <article
      className="bg-[#FFB200] w-auto text-black text-lg font-medium rounded-lg shadow-lg
                            hover:bg-[#FFC84A] hover:shadow-2xl hover:border hover:border-black transition
                            flex justify-center items-center px-4 py-2"
    >
      <Link to="/profile" className="px-6 py-3 min-w-[120px] text-center block">
        Min profil
      </Link>
    </article>
  );
}
