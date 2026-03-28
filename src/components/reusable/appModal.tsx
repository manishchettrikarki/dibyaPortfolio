"use client";

import { useEffect } from "react";
import { useSectionContext } from "./sectionContext";
import { CloseIcon } from "./icons";

export function AppModal() {
  const { modalContent, closeModal } = useSectionContext();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  return (
    <div
      className={`modal-overlay ${modalContent ? "modal-overlay--open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      {modalContent && (
        <div className="modal-box">
          <button
            onClick={closeModal}
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text)",
              transition: "color 0.25s",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--heading)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text)")
            }
          >
            <CloseIcon size={18} />
          </button>
          <div className="modal-scroll">{modalContent}</div>
        </div>
      )}
    </div>
  );
}
