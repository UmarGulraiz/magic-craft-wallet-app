import {
  FC,
  ReactNode,
  Suspense,
  useCallback,
  useState,
  useMemo,
  PropsWithChildren,
} from "react";
import { useAtomValue } from "jotai";
import classNames from "clsx";
import { match } from "ts-pattern";
import { PopupToolbarTab } from "app/nav";
import { useAtomsAll, useLazyAtomValue } from "lib/atom-utils";

import { TokenType, WalletStatus } from "core/types";
import * as repo from "core/repo";

import {
  activeTabAtom,
  getPermissionAtom,
  getTabOrigin,
  isSidePanelEnabledAtom,
  popupToolbarTabAtom,
  tokenTypeAtom,
  walletStateAtom,
  web3MetaMaskCompatibleAtom,
} from "app/atoms";
import { useAccountToken, useIsSyncing, useLazyNetwork } from "app/hooks";
import { useTokenList } from "app/hooks/tokenList";

import PopupLayout from "../layouts/PopupLayout";
import PreloadBaseAndSync from "../layouts/PreloadBaseAndSync";
import NullState from "../blocks/tokenList/NullState";
import NoNftState from "../blocks/tokenList/NoNftState";
import ActivityContent from "../blocks/activity/ActivityContent";

import AssetsManagement, { ManageMode } from "../elements/AssetsManagement";
import NetworksButton from "../blocks/NetworksButton";
import NetworkIcon from "../elements/NetworkIcon";
import { NATIVE_TOKEN_SLUG } from "core/common";
import FiatAmount from "../elements/FiatAmount";

const Popup: FC = () => {
  const tab = useAtomValue(popupToolbarTabAtom);

  return (
    <PreloadAndSync>
      <PopupLayout>{matchPopupTabs(tab) as unknown as ReactNode}</PopupLayout>
    </PreloadAndSync>
  );
};

export default Popup;

const Assets: FC = () => {
  const { walletStatus } = useAtomValue(walletStateAtom);
  const tokenType = useAtomValue(tokenTypeAtom);
  const isUnlocked = walletStatus === WalletStatus.Unlocked;

  return isUnlocked ? (
    <>
      <PopupNetworkSelect />
      <TokenList key={tokenType} />
    </>
  ) : null;
};

const Activities: FC = () => {
  const { walletStatus } = useAtomValue(walletStateAtom);
  const isUnlocked = walletStatus === WalletStatus.Unlocked;

  return isUnlocked ? (
    <Suspense fallback={null}>
      <ActivityContent />
    </Suspense>
  ) : null;
};

const PreloadAndSync: FC<PropsWithChildren> = ({ children }) => {
  useAtomsAll([web3MetaMaskCompatibleAtom, isSidePanelEnabledAtom]);

  const tab = useAtomValue(activeTabAtom);
  const tabOrigin = getTabOrigin(tab);

  const permission = useLazyAtomValue(getPermissionAtom(tabOrigin), "off");

  return (
    <PreloadBaseAndSync chainId={permission?.chainId}>
      {children}
    </PreloadBaseAndSync>
  );
};

const PopupNetworkSelect: FC = () => {
  const activeTab = useAtomValue(activeTabAtom);
  const tabOrigin = getTabOrigin(activeTab);
  const isSyncing = useIsSyncing();
  const currentNetwork = useLazyNetwork();

  const nativeToken = useAccountToken(NATIVE_TOKEN_SLUG);

  const handleChange = useCallback(
    (chainId: number) => {
      if (!tabOrigin) return;

      repo.permissions
        .where({ origin: tabOrigin })
        .modify((perm) => {
          perm.chainId = chainId;
        })
        .catch(console.error);
    },
    [tabOrigin],
  );

  return (
    <NetworksButton className="max-w-auto" size="small" onChange={handleChange}>
      {currentNetwork ? (
        <>
          <NetworkIcon
            network={currentNetwork}
            className={classNames("w-8 h-8 mr-3", isSyncing && "animate-pulse")}
          />

          <span className="min-w-0 truncate mr-auto">
            {currentNetwork.name}
          </span>

          {nativeToken?.portfolioUSD && (
            <FiatAmount
              amount={nativeToken?.portfolioUSD}
              copiable={false}
              className={classNames(
                "ml-auto mr-2 pl-2 text-base font-bold text-brand-light",
              )}
            />
          )}
        </>
      ) : (
        <div className="h-8" />
      )}
    </NetworksButton>
  );
};

const TokenList: FC = () => {
  const tokenType = useAtomValue(tokenTypeAtom);

  const {
    searchValue,
    setSearchValue,
    searchInputRef,
    tokens: tokensPure,
    loadMoreTriggerRef,
    manageModeEnabled,
    setManageModeEnabled,
    tokenIdSearchValue,
    setTokenIdSearchValue,
    tokenIdSearchInputRef,
    tokenIdSearchDisplayed,
    focusSearchInput,
    currentAccount,
    isNftsSelected,
    syncing,
    searching,
    searchValueIsAddress,
  } = useTokenList(tokenType, {
    searchPersist: tokenType === TokenType.NFT,
  });

  const [mode, setMode] = useState<ManageMode>(null);

  const tokens = useMemo(
    () => (mode === "add" && !searchValueIsAddress ? [] : tokensPure),
    [mode, searchValueIsAddress, tokensPure],
  );

  const tokensBar = useMemo(() => {
    if (tokens.length === 0) {
      if (searchValue) {
        return (
          <NullState
            searching={searching}
            focusSearchInput={focusSearchInput}
          />
        );
      } else if (isNftsSelected) {
        return <NoNftState syncing={syncing} className="-mt-2" />;
      }
    }
    return null;
  }, [
    currentAccount,
    focusSearchInput,
    isNftsSelected,
    loadMoreTriggerRef,
    manageModeEnabled,
    searchValue,
    searching,
    syncing,
    tokens,
  ]);

  return (
    <>
      <AssetsManagement
        size="small"
        manageModeEnabled={manageModeEnabled}
        setManageModeEnabled={setManageModeEnabled}
        searchInputRef={searchInputRef}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        tokenIdSearchValue={tokenIdSearchValue}
        setTokenIdSearchValue={setTokenIdSearchValue}
        tokenIdSearchInputRef={tokenIdSearchInputRef}
        tokenIdSearchDisplayed={tokenIdSearchDisplayed}
        mode={mode}
        onModeChange={setMode}
        className="my-3"
      />
      {tokensBar}
    </>
  );
};

const matchPopupTabs = (tab: PopupToolbarTab) => {
  return match<PopupToolbarTab, ReactNode>(tab)
    .with(PopupToolbarTab.Assets, () => <Assets />)
    .with(PopupToolbarTab.Activity, () => <Activities />)
    .otherwise(() => <Assets />);
};
