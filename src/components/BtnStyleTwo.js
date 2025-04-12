const BtnStyle2 = ({ label, onClick }) => {
    return (
      <button
        className="border border-purple-dark  text-purple-dark text-[15px] font-semibold hover:bg-purple-medium hover:text-white px-4 py-2 rounded-3xl transition"
        onClick={onClick}
      >
        {label}
      </button>
    );
  };
  
  export default BtnStyle2;
  