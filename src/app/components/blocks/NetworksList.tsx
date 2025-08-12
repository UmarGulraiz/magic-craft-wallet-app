import { FC, useMemo } from "react";
import classNames from "clsx";
import { useLazyAtomValue } from "lib/atom-utils";

import { compareNetworks } from "core/common/network";
import { getAllNativeTokensAtom } from "app/atoms";
import { useLazyAllNetworks, useAccounts } from "app/hooks";

import NetworkIcon from "../elements/NetworkIcon";
import NetworksButton from "./NetworksButton";

const NetworksList: FC = () => {
  const allNetworksPure = useLazyAllNetworks();
  const { currentAccount } = useAccounts();

  const accountNativeTokens = useLazyAtomValue(
    getAllNativeTokensAtom(currentAccount.address),
    "off",
  );

  const balancesMap = useMemo(
    () =>
      accountNativeTokens
        ? new Map(accountNativeTokens.map((t) => [t.chainId, t.portfolioUSD]))
        : null,
    [accountNativeTokens],
  );

  const allNetworks = useMemo(() => {
    if (!allNetworksPure || !balancesMap) return [];
    if (balancesMap.size === 0) return allNetworksPure;
    return allNetworksPure
      .map((n) => ({
        ...n,
        balanceUSD: balancesMap?.get(n.chainId),
      }))
      .sort(compareNetworks);
  }, [allNetworksPure, balancesMap]);

  return (
    <div className="flex gap-3 py-4 border-b border-white min-h-[6.2rem]">
      <NetworksButton className="!w-1/4">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {allNetworks.slice(0, 3).map((network, index) => (
              <NetworkIcon
                key={network.chainId}
                network={network}
                className={classNames("w-8 h-8", index !== 0 ? "-ml-3" : "")}
              />
            ))}
          </div>
          <span className="truncate min-w-0">Networks</span>
        </div>
      </NetworksButton>
    </div>
  );
};

export default NetworksList;
