import { useState, useEffect, useRef, useCallback } from "react";

interface UseClickOutside {
  isVisible: boolean;
  callback?: () => void;
}

export function useClickOutside({
  isVisible,
  callback = () => {},
}: UseClickOutside) {
  const [isComponentVisible, setIsComponentVisible] = useState(isVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLDivElement)
      ) {
        setIsComponentVisible(false);
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { ref, isComponentVisible, setIsComponentVisible };
}
