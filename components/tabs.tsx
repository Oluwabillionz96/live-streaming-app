import { Dispatch, SetStateAction } from "react";

const Tabs = ({
  tabValues,
  setActiveTab,
  tab,
}: {
  tabValues: {
    activeTab: "live" | "past" | "upcoming";
    value: string;
  }[];
  setActiveTab: Dispatch<SetStateAction<"live" | "past" | "upcoming">>;
  tab: "live" | "past" | "upcoming";
}) => {
  return (
    <div className="flex gap-6 mb-8 border-b border-gray-800">
      {tabValues.map((item, index) => (
        <TabButton
          key={index}
          activeTab={item.activeTab}
          setActiveTab={setActiveTab}
          tab={tab}
          value={item.value}
        />
      ))}
    </div>
  );
};

export function TabButton({
  setActiveTab,
  activeTab,
  value,
  tab,
}: {
  setActiveTab: Dispatch<SetStateAction<"live" | "past" | "upcoming">>;
  activeTab: "live" | "past" | "upcoming";
  value: string;
  tab: "live" | "past" | "upcoming";
}) {
  return (
    <button
      onClick={() => setActiveTab(activeTab)}
      className={`pb-4 px-2 font-semibold cursor-pointer transition-colors relative ${
        tab === activeTab ? "text-white" : "text-gray-400 hover:text-gray-300"
      }`}
    >
      <span className="hidden md:block">{value.trim()}</span>
      <span className="md:hidden">{value.trim().split(" ")[0]}</span>
      {tab === activeTab && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      )}
    </button>
  );
}

export default Tabs;
