import queryString from 'query-string';
import { useMemo } from 'react';

const useCourseId = () => {
  const courseId = useMemo(() => {
    if (typeof window === 'undefined') {
      return 0;
    }

    return Number(queryString.parse(window.location.search).courseId);
  }, []);

  return {
    courseId,
  };
};

export default useCourseId;
