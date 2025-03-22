import { Route, Routes } from "react-router-dom";
import NCHLConfiguration from "./NCHLConfiguration";
import SAPConfiguration from "./SAPConfiguration";
import SmsIntegration from "./SmsIntegration";
import { SettingsSidebar } from "./subPages/settingsSidebar";
import EmailConfiguration from "./EmailConfiguration";

const Settings = () => {
  return (
    <div className="flex overflow-auto bg-white">
      <SettingsSidebar />
      <div className="w-full sm:w-[90vw] h-[88vh] p-5 overflow-scroll">
        <Routes>
          <Route path="/sms-integration" element={<SmsIntegration />} />
          <Route path="/sap-configuration" element={<SAPConfiguration />} />
          <Route path="/nchl-configuration" element={<NCHLConfiguration />} />
          <Route path="/email-configuration" element={<EmailConfiguration />} />
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
