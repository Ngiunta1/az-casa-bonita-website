import { Animate } from "./Animate";

const SOCIALS = [
  {
    name: "Instagram",
    style: "fa-brands fa-instagram text-white text-2xl",
    onClick: () => {
      window.open("https://www.instagram.com/azcasabonitaservices");
    },
  },
  {
    name: "TikTok",
    style: "fa-brands fa-tiktok text-white text-2xl",
    onClick: () => {
      window.open("https://www.tiktok.com/@azcasabonitaservices");
    },
  },
  {
    name: "Phone",
    style: "fa-solid fa-phone text-white text-xl",
    onClick: () => {
      window.location.href = "tel:+1 (602) 884-9751";
    },
  },
  {
    name: "Email",
    style: "fa-regular fa-envelope text-white text-2xl",
    onClick: () => {
      window.location.href = "mailto:AZCasaBonitaServices@gmail.com";
    },
  },
];

const Footer = () => {
  return (
    <footer
      className={`flex p-4 h-16 items-center justify-between bg-[rgba(23,23,23,0.4)]`}
    >
      <div className={`flex place-content-start text-white gap-4`}>
        {SOCIALS.map((social, index) => (
          <div className="flex items-center gap-4">
            <Animate
              hover={{ variant: "lift", intensity: "subtle" }}
              className="cursor-pointer"
            >
              <i className={social.style} onClick={social.onClick} />
            </Animate>
            {index < SOCIALS.length - 1 && <div>|</div>}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
