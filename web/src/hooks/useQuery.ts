import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { useMemo } from 'react';

export const useQuery = () => {
  const location = useLocation();
  return useMemo(() => qs.parse(location.search), [location.search]);
};