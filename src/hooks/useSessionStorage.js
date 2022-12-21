import { useState, useEffect } from "react";

function useSessionStorage(keyName, defaultVal = null) {
  const store = sessionStorage.getItem(keyName) || defaultVal;

  const [item, setItem] = useState(store);

  useEffect(
    function setItemLocalStorage() {
      if (!item) {
        sessionStorage.removeItem(keyName);
      } else {
        sessionStorage.setItem(keyName, item);
      }
    },
    [keyName, item]
  );

  return [item, setItem];
}

export default useSessionStorage;
