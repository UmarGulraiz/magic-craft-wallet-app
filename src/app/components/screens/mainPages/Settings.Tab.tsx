import { FC, Suspense, useMemo } from "react";
import { useAtomValue } from "jotai";
import { match } from "ts-pattern";
import { Redirect } from "lib/navigation";

import { Page, SettingTab } from "app/nav";
import { settingTabAtom } from "app/atoms";
import Networks from "../settingTabs/Networks";

function matchSettingTab(settingTab: SettingTab) {
  return match(settingTab)
    .with(SettingTab.Networks, () => <Networks />)
    .otherwise(() => (
      <Redirect to={{ page: Page.Settings, setting: SettingTab.General }} />
    ));
}

const SettingsTab: FC = () => {
  const settingTab = useAtomValue(settingTabAtom);

  return useMemo(
    () => <Suspense fallback={null}>{matchSettingTab(settingTab)}</Suspense>,
    [settingTab],
  );
};

export default SettingsTab;
