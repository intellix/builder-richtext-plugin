import { useEffect } from "react";

export function useMaterialIcons() {
  useEffect(() => {
    const id = "m-icons";

    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
      document.head.appendChild(link);
    }
  });
}
