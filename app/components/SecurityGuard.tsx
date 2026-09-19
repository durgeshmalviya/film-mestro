"use client";

import { useEffect } from "react";

export default function SecurityGuard() {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable common DevTools / view-source shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Ctrl + Shift + I / J / C
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" ||
          e.key === "i" ||
          e.key === "J" ||
          e.key === "j" ||
          e.key === "C" ||
          e.key === "c")
      ) {
        e.preventDefault();
        return false;
      }

      // Ctrl + U (view source)
      if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        return false;
      }

      // Ctrl + S (save page)
      if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return false;
      }

      // Ctrl + P (print)
      if (e.ctrlKey && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        return false;
      }
    };

    // Prevent image drag
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement)?.tagName === "IMG") {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    // Optional: disable text selection on images
    const style = document.createElement("style");
    style.innerHTML = `
      img {
        -webkit-user-drag: none;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      .protected-image, .capture-guard {
        -webkit-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
      document.head.removeChild(style);
    };
  }, []);

  return null;
}