import { memo } from "react";
import classNames from "clsx";

import Delay from "../misc/Delay";

type NoNftStateProps = {
  syncing: boolean;
  className?: string;
};

const NoNftState = memo<NoNftStateProps>(({ syncing, className }) => (
  <div
    className={classNames(
      "flex flex-col items-center",
      "h-full w-full pb-5",
      syncing ? "pt-9" : "pt-2",
      "text-sm text-brand-placeholder text-center",
      className,
    )}
  >
    <Delay ms={500}>
      {!syncing ? (
        <div className="mt-4 flex flex-col items-center animate-bootfadein">
          <span></span>
        </div>
      ) : (
        <div className="mt-8 atom-spinner w-8 h-8" />
      )}
    </Delay>
  </div>
));

export default NoNftState;
