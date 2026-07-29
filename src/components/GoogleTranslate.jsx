"use client";

import { useEffect, useRef } from "react";

let translateInitialized = false; // module-level guard, survives remounts

export default function GoogleTranslate() {
  const initRef = useRef(false);

  useEffect(() => {
    // Guard 1: prevent this specific component instance from running twice
    // (handles React Strict Mode's mount -> unmount -> mount in dev)
    if (initRef.current) return;
    initRef.current = true;

    // Guard 2: prevent duplicate init across remounts/navigations
    if (translateInitialized) return;

    const initWidget = () => {
      const container = document.getElementById("google_translate_element");
      if (!container) return;

      // Safety net: if Google already dropped markup in here, don't add more
      if (container.childElementCount > 0) {
        translateInitialized = true;
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      translateInitialized = true;
    };

    // If the Google script already loaded (e.g. fast refresh / client nav),
    // just init directly instead of injecting the script again.
    if (window.google?.translate) {
      initWidget();
      return;
    }

    window.googleTranslateElementInit = initWidget;

    // Avoid appending the <script> tag more than once
    if (document.getElementById("google_translate_script")) return;

    const script = document.createElement("script");
    script.id = "google_translate_script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {/* Spacer to avoid layout jump */}
      <div className="translate-top-spacer" />

      <div className="translate-top-bar">
        <div className="translate-inner">
          <span className="translate-label">🌐 Language</span>
          <div
            id="google_translate_element"
            className="translate-widget"
          />
        </div>
      </div>

      <style jsx global>{`
        /* Space above site (like selected language state) */
        .translate-top-spacer {
          height: 15px;
          width: 100%;
        }

        /* Light top bar */
        .translate-top-bar {
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
   
        }

        .translate-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 10px 16px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
        }

        .translate-label {
          color: #374151;
          font-size: 13px;
          font-weight: 500;
        }

        /* Ensure widget shows */
        .translate-widget {
          min-width: 150px;
        }

        .goog-te-gadget {
          font-size: 0 !important;
        }

        /* Dropdown (light theme) */
        .goog-te-combo {
          min-width: 150px;
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          background: #f9fafb;
          color: #111827;
          font-size: 13px;
          cursor: pointer;
        }

        .goog-te-combo:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
        }

        /* Hide Google branding */
        .goog-logo-link,
        .goog-te-gadget span {
          display: none !important;
        }

        /* Kill Google banner that pushes content */
        .goog-te-banner-frame {
          display: none !important;
        }

        body {
          top: 0 !important;
        }

        /* Mobile */
        @media (max-width: 640px) {
          .translate-inner {
            justify-content: center;
          }

          .translate-widget {
            width: 100%;
          }

          .goog-te-combo {
            width: 100%;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}