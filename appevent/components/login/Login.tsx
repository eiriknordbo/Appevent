import { Auth } from "../authentication/Auth.tsx";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-[#223D8C75] shadow-2xl rounded-2xl p-10 w-120 flex flex-col items-center justify-center h-72">
        <h1 className="text-3xl font-semibold text-black mb-6">APPEVENT</h1>
        <Auth></Auth>
      </div>
    </div>
  );
}
