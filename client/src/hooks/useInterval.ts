import React, { useEffect, useRef } from 'react'

export const useInterval = (callback: any, delay: number) => {

  const savedCallback = useRef<null | any>(null);

  // Запомнить последний callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Установить интервал
  useEffect(() => {

    function tick() {
      if (savedCallback) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

  }, [delay]);
}
