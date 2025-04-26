const BtnStyle1 = ({ label, onClick }) => {
  return (
    <button
      className="w-32 bg-purple-dark hover:bg-purple-hover text-white text-[15px] font-semibold px-6 py-2 rounded-3xl transition"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default BtnStyle1;
