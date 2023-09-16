import Image from "next/image";
import logo from "../../../public/logo.svg";

const Logo = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Image
        className="block h-8 w-auto lg:hidden"
        src={logo}
        alt="psyduck next"
        width={32}
        height={32}
      />
      <Image
        className="hidden h-8 w-auto lg:block"
        src={logo}
        alt="psyduck next"
        width={32}
        height={32}
      />
    </div>
  );
};

export default Logo;
