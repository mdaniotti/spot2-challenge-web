import logoUrl from "@/assets/logo.svg";

interface LogoProps {
  className?: string;
  size?: string;
}

const Logo = ({ className = "", size = "h-12" }: LogoProps) => {
  return <img src={logoUrl} alt="Logo" className={`${size} ${className}`} />;
};

export default Logo;
