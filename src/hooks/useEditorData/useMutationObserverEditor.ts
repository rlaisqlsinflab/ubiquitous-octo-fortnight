import { useEffect, useRef } from 'react';

import { BUILDER_ROOT_ID } from '../../components/Frame';

type MutationObserverOptions = {
  onMutation: MutationCallback;
  options?: MutationObserverInit;
};

const DEFAULT_OPTIONS: MutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
};

export const useMutationObserverEditor = ({ onMutation, options }: MutationObserverOptions) => {
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const $root = document.getElementById(BUILDER_ROOT_ID);

    if (!$root) {
      return;
    }

    observerRef.current = new MutationObserver(onMutation);
    observerRef.current.observe($root, { ...DEFAULT_OPTIONS, ...options });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [onMutation, options]);
};
