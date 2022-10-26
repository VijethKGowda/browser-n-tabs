import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MoonIcon, PlusIcon, SunIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";

const Browser = ({ theme, setTheme }) => {
  const tabParent = useRef(null);
  const [width, setWidth] = useState(100);
  const [tabs, setTabs] = useState([
    { name: "New Tab", url: "google.com", id: Date.now() },
  ]);
  const [activeTab, setActiveTab] = useState(tabs[tabs.length - 1].id);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(tabParent.current.offsetWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const addTab = () => {
    setTabs((prev) => [
      ...prev,
      { name: "New Tab", url: "google.com", id: Date.now() },
    ]);
  };

  const removeTab = (id) => {
    const filteredTabs = tabs.filter((item) => item.id !== id);
    setTabs(filteredTabs);
  };

  useEffect(() => {
    setActiveTab(tabs[tabs.length - 1].id);
  }, [tabs]);

  console.log("haha", activeTab);

  return (
    <>
      <div
        className="border-2 border-gray-300 dark:border-gray-700 rounded-xl"
        style={{ height: "90vh" }}
      >
        <div className="bg-gray-300 dark:bg-gray-700 rounded-t-lg flex items-stretch">
          <div className="hidden md:block px-4 pt-4 mr-4 text-sm flex-0 text-gray-400 whitespace-nowrap">
            <i className="mx-1 rounded-full w-3 h-3 bg-red-500 inline-block"></i>
            <i className="mx-1 rounded-full w-3 h-3 bg-yellow-500 inline-block"></i>
            <i className="mx-1 rounded-full w-3 h-3 bg-green-600 inline-block"></i>
          </div>
          <div ref={tabParent} className="w-full ml-px">
            <ul className="flex relative gap-1" style={{ width: `${width}px` }}>
              {tabs.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                  }}
                  className={`px-4 py-2 mt-2 w-56 relative ${
                    item.id === activeTab
                      ? "bg-white dark:bg-dark"
                      : "bg-gray-100 dark:bg-gray-600"
                  }  rounded-t-lg float-left overflow-hidden whitespace-nowrap cursor-pointer text-ellipsis`}
                >
                  <div
                    className="text-sm overflow-hidden inline-block pt-1 w-full whitespace-nowrap text-ellipsis"
                    style={{ maxWidth: "275px" }}
                  >
                    {item.name}
                  </div>
                  {item.id === activeTab ? (
                    <button
                      onClick={() => removeTab(item.id)}
                      className="absolute right-2 top-4 bg-white dark:bg-dark"
                    >
                      <XCircleIcon className="w-4 h-4 text-gray-500 dark:text-white" />
                    </button>
                  ) : null}
                </li>
              ))}
              <button
                onClick={addTab}
                className="relative px-4 py-2 mt-2 flex place-items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-t-lg"
              >
                <PlusIcon className="h-4 w-4 font-bold text-gray-500 dark:text-white" />
              </button>
            </ul>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default Browser;
