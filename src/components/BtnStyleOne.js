const BtnStyle1 = ({ label, onClick }) => {
    return (
      <button
        className="bg-purple-dark hover:bg-purple-hover text-white text-[15px] font-semibold px-4 py-2 rounded-3xl transition"
        onClick={onClick}
      >
        {label}
      </button>
    );
  };
  
  export default BtnStyle1;
  