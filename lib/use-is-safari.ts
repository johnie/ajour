"use client";

import { useEffect, useState } from "react";

export function useIsSafari() {
  const [isSafari, setSafari] = useState(false);

  useEffect(() => {
    const detectedSafari =
      navigator.userAgent.indexOf("Safari") > -1 &&
      navigator.userAgent.indexOf("Chrome") <= -1;

    setSafari(detectedSafari);
  }, []);

  return isSafari;
}
