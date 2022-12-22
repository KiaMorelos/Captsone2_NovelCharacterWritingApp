import { useState, useEffect } from "react";

function useLocalStorage(keyName, defaultVal = null) {
  const store = localStorage.getItem(keyName) || defaultVal;

  const [item, setItem] = useState(store);

  useEffect(
    function setItemLocalStorage() {
      if (!item) {
        localStorage.removeItem(keyName);
      } else {
        localStorage.setItem(keyName, item);
      }
    },
    [keyName, item]
  );

  return [item, setItem];
}

export default useLocalStorage;
