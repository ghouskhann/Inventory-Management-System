export default function InputField({ label }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-gray-300 font-medium">{label}</label>
      <input className="bg-gray-800 border border-gray-700 text-white p-3 w-full rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200" />
    </div>
  );
}
