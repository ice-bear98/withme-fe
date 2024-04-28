import { useEffect, useState } from "react";
import { MdPets } from "react-icons/md";

export default function ScrollTopBtn() {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      className={`${
        isScroll ? "bottom-40" : "-bottom-96"
      } fixed right-[16.5%] l:right-[5%] bg-sky-300 text-white p-3 rounded-full z-50 dark:bg-slate-500 hover:brightness-110 dark:hover:brightness-125 transition-all ease-out duration-500`}
      onClick={scrollToTop}
    >
      <MdPets />
    </button>
  );
}
