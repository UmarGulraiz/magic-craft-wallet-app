import { FC, useMemo } from "react";
import classNames from "clsx";
import { useAtomValue } from "jotai";

import { settingTabAtom } from "app/atoms";
import { SettingTab as SettingTabEnum } from "app/nav";
import SecondaryTabs from "app/components/blocks/SecondaryTabs";
import ScrollAreaContainer from "app/components/elements/ScrollAreaContainer";
import { ReactComponent as NetworkIcon } from "app/icons/setting-network.svg";
import SettingsTab from "./Settings.Tab";

const Settings: FC = () => {
  const activeTabRoute = useAtomValue(settingTabAtom);

  const activeRoute = useMemo(
    () =>
      tabsContent.find(({ route }) => route.setting === activeTabRoute)?.route,
    [activeTabRoute],
  );

  return (
    <div
      className={classNames(
        "px-6 -mx-6 min-h-0",
        "flex grow",
        "overflow-x-auto scrollbar-hide",
      )}
    >
      <SecondaryTabs tabs={tabsContent} activeRoute={activeRoute} />

      {activeTabRoute !== SettingTabEnum.Networks ? (
        <ScrollAreaContainer
          className="box-content w-full pr-6"
          viewPortClassName="pb-5 pt-5 pl-6"
          scrollBarClassName="py-0 pt-5 pb-5"
        >
          <SettingsTab />
        </ScrollAreaContainer>
      ) : (
        <SettingsTab />
      )}
    </div>
  );
};

export default Settings;

const tabsContent = [
  {
    route: { page: "settings", setting: SettingTabEnum.Networks },
    Icon: NetworkIcon,
    title: "Networks",
    desc: "Add a new network or configure the settings of an existing one.",
  },
];
