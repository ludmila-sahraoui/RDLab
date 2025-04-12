import logo from '../assets/images/logoRDLab.svg'; 
const LogoSlogan = () => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={logo}
        alt="RDLab Logo"
        className="w-24 h-auto"
      />
      <div className="w-fit">
        <h1 className="text-purple-dark font-extrabold text-7xl">
          RDLab
        </h1>
        <p className="text-purple-dark font-semibold text-lg leading-snug max-w-[25ch]">
          Your intelligent assistant for smarter Oil & Gas research.
        </p>
      </div>
    </div>
  );
};

export default LogoSlogan;
