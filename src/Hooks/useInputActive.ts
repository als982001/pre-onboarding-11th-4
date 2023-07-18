import { useState } from "react";

export default function useInputActive() {
  const [inputActive, setInputActive] = useState<boolean>(false);

  const handleInputActive = () => {
    setInputActive((prev) => true);
  };

  const handleInputInactive = () => {
    setInputActive((prev) => false);
  };

  return { inputActive, handleInputActive, handleInputInactive };
}
