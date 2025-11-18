import { throttle } from 'lodash-es';
import { useCallback, useEffect, useRef } from 'react';

interface UseAutoScrollOptions {
  threshold?: number; // viewport 경계로부터의 거리 (px)
  speed?: number; // 스크롤 속도 (px per frame)
  enabled?: boolean; // auto-scroll 활성화/비활성화
}

export const useAutoScroll = ({
  threshold = 50,
  speed = 5,
  enabled = true,
}: UseAutoScrollOptions = {}) => {
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);
  const scrollEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const getScrollContainer = useCallback(() => {
    if (scrollContainerRef.current) {
      return scrollContainerRef.current;
    }

    let element = document.getElementById('builder-root');

    while (element && element !== document.body) {
      const style = window.getComputedStyle(element);
      const isScrollable =
        element.scrollHeight > element.clientHeight &&
        (style.overflowY === 'auto' || style.overflowY === 'scroll');

      if (isScrollable) {
        scrollContainerRef.current = element;

        return element;
      }
      element = element.parentElement;
    }

    scrollContainerRef.current = document.body;

    return document.body;
  }, []);

  const triggerScrollRecalculation = useCallback(() => {
    const scrollContainer = getScrollContainer();
    const scrollEvent = new Event('scroll', {
      bubbles: true,
      cancelable: false,
    });

    scrollContainer.dispatchEvent(scrollEvent);
    window.dispatchEvent(scrollEvent);
  }, [getScrollContainer]);

  const handleScrollEnd = useCallback(() => {
    if (scrollEndTimeoutRef.current) {
      clearTimeout(scrollEndTimeoutRef.current);
    }

    if (!isDragging.current) {
      return;
    }

    scrollEndTimeoutRef.current = setTimeout(() => {
      triggerScrollRecalculation();
    }, 150);
  }, [triggerScrollRecalculation]);

  const startAutoScroll = useCallback(
    (direction: 'up' | 'down') => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }

      scrollIntervalRef.current = setInterval(() => {
        const scrollAmount = direction === 'up' ? -speed : speed;
        const scrollContainer = getScrollContainer();

        scrollContainer.scrollBy(0, scrollAmount);
        handleScrollEnd();
      }, 16);
    },
    [speed, handleScrollEnd, getScrollContainer]
  );

  const stopAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;

      handleScrollEnd();
    }
  }, [handleScrollEnd]);

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
    stopAutoScroll();
  }, [stopAutoScroll]);

  const handleDragOverInternal = useCallback(
    (e: DragEvent) => {
      if (!enabled || !isDragging.current) {
        return;
      }

      e.preventDefault();

      const { clientY } = e;
      const { innerHeight } = window;

      if (clientY < threshold) {
        startAutoScroll('up');
      } else if (clientY > innerHeight - threshold) {
        startAutoScroll('down');
      } else {
        stopAutoScroll();
      }
    },
    [enabled, threshold, startAutoScroll, stopAutoScroll]
  );

  const handleDragOver = throttle(handleDragOverInternal, 16);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragend', handleDragEnd);
    document.addEventListener('dragover', handleDragOver);

    return () => {
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('dragend', handleDragEnd);
      document.removeEventListener('dragover', handleDragOver);

      stopAutoScroll();

      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
    };
  }, [enabled, handleDragStart, handleDragEnd, handleDragOver, stopAutoScroll]);

  useEffect(
    () => () => {
      stopAutoScroll();

      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
    },
    [stopAutoScroll]
  );

  return {
    startAutoScroll,
    stopAutoScroll,
    triggerScrollRecalculation,
    isDragging: isDragging.current,
  };
};
