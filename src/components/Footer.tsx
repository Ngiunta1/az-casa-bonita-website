const Footer = () => {
  return (
    <footer
      className={`flex p-4 h-16 items-center justify-between bg-[rgba(23,23,23,0.4)]`}
    >
      <div className={`flex items-center place-content-start text-white gap-4`}>
        <i className="fa-brands fa-instagram text-white text-2xl"></i>
        <div>|</div>
        <i className="fa-brands fa-tiktok text-white text-2xl"></i>
        <div>|</div>
        <i className="fa-solid fa-phone text-white text-xl"></i>
        <div>|</div>
        <i className="fa-regular fa-envelope text-white text-2xl"></i>
      </div>
      <div className="text-xl text-white">Handcrafted</div>
    </footer>
  );
};

export default Footer;
