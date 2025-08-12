import { useMemo } from "react";
import { Page } from "app/nav";
import { useSetAtom } from "jotai";

import { ReactComponent as OverviewIcon } from "app/icons/Overview.svg";
import { ReactComponent as ReceiveIcon } from "app/icons/Receive.svg";
import { ReactComponent as SendIcon } from "app/icons/Send.svg";
import { ReactComponent as SettingsIcon } from "app/icons/Settings.svg";
import { ReactComponent as ActivityIcon } from "app/icons/ActivityIcon.svg";
import { activityModalAtom, receiveModalAtom } from "app/atoms";
import { useActivityBadge, useSwapBadge, useAccounts } from "app/hooks";

const useSidebarLinks = () => {
  const setActivityOpened = useSetAtom(activityModalAtom);
  const setReceiveOpened = useSetAtom(receiveModalAtom);
  const activityBadgeAmount = useActivityBadge();
  const { currentAccount } = useAccounts();

  const swapBadgeAmount = useSwapBadge(currentAccount.address);

  const NavLinksPrimary = useMemo(() => {
    return [
      {
        route: Page.Default,
        label: "Dashboard",
        Icon: OverviewIcon,
      },
      {
        label: "Transactions",
        Icon: ActivityIcon,
        action: () => setActivityOpened([true, "replace"]),
        badge: activityBadgeAmount,
      },
      {
        route: Page.Transfer,
        label: "Send",
        Icon: SendIcon,
      },
      {
        label: "Receive",
        Icon: ReceiveIcon,
        action: () => setReceiveOpened([true, "replace"]),
      },
      {
        route: Page.Settings,
        label: "Settings",
        Icon: SettingsIcon,
      },
    ];
  }, [
    activityBadgeAmount,
    swapBadgeAmount,
    setActivityOpened,
    setReceiveOpened,
  ]);

  return useMemo(
    () => ({
      NavLinksPrimary,
    }),
    [NavLinksPrimary],
  );
};

export default useSidebarLinks;
