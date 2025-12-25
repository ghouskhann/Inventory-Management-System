export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium
                 hover:bg-red-700 active:scale-95 transition-all duration-150 shadow-md hover:shadow-lg"
    >
      {text}
    </button>
  );
}
