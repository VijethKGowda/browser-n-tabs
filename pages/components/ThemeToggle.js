import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme("dark");
  return (
    <>
      <div className="px-4 pt-4 mr-4 ">
        {theme === "light" ? (
          <button
            aria-label="moon"
            onClick={() => {
              setTheme("dark");
            }}
            className=""
          >
            <MoonIcon className="text-gray-700 w-6" />
          </button>
        ) : (
          <button
            aria-label="sun"
            onClick={() => {
              setTheme("light");
            }}
            className=""
          >
            <SunIcon className="text-orange-300 w-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default ThemeToggle;
