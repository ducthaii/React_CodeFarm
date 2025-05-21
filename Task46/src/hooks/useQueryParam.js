import { useSearchParams } from 'react-router-dom';

export function useQueryParam(key, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(key) || defaultValue;

  const setValue = (newValue) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, newValue);
    setSearchParams(params);
  };

  return [value, setValue];
}
