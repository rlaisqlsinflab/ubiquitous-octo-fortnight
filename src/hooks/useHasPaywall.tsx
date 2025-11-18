import { useEditor } from '@craftjs/core';
import { isNil } from 'lodash-es';
import { useContext, useEffect, useState } from 'react';

import { BUILDER_ROOT_ID } from '../components/Frame';
import { EnvironmentValuesContext } from '../context/EnvironmentValuesContext';

export const useHasPaywall = () => {
  const { query } = useEditor();
  const [hasPaywall, setHasPaywall] = useState(false);
  const { payWallInfo } = useContext(EnvironmentValuesContext);
  const enabledPaywallOption = !isNil(payWallInfo);

  useEffect(() => {
    const checkPaywall = () => {
      const state = query.getState();
      const paywallExists = Object.values(state.nodes).some(
        (node) => node.data.displayName === 'OneColumnPaywall'
      );
      setHasPaywall(paywallExists);
    };

    checkPaywall();

    const targetNode = document.getElementById(BUILDER_ROOT_ID) || document.body;
    const observer = new MutationObserver(() => {
      checkPaywall();
    });

    observer.observe(targetNode, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'data-node-id'],
    });

    return () => {
      observer.disconnect();
    };
  }, [query]);

  return { hasPaywall, enabledPaywallOption };
};
