import SettingsSidebar from "./subPages/SettingsSidebar";

const Settings = () => {
  return (
    <div className="flex overflow-auto bg-white">
      <SettingsSidebar />
      <div className="w-full sm:w-[90vw] h-[88vh] p-5 overflow-scroll"></div>
    </div>
  );
};

export default Settings;
