// useMenuVisible.js
import { useState } from 'react';

let sharedMenuVisible = true;
let setSharedMenuVisible = () => {};

export function useMenuVisible() {
  const [menuVisible, setMenuVisible] = useState(sharedMenuVisible);

  setSharedMenuVisible = setMenuVisible;

  const updateMenuVisible = (value) => {
    sharedMenuVisible = value;
    setMenuVisible(value);
  };

  return [menuVisible, updateMenuVisible];
}
