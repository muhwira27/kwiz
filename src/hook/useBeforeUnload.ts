import { useEffect } from 'react';

const useBeforeUnload = (shouldPreventUnload: boolean, message?: string) => {
  useEffect(() => {
    const abortController = new AbortController();

    if (shouldPreventUnload)
      window.addEventListener(
        'beforeunload',
        (ev) => {
          ev.preventDefault();

          return (ev.returnValue = message ?? '');
        },
        { capture: true, signal: abortController.signal }
      );

    return () => abortController.abort();
  }, [shouldPreventUnload, message]);
};

export default useBeforeUnload;
