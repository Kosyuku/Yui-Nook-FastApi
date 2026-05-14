import { useEffect } from "react";
import "./SettingsLoveApp.css";
import "./settings-love-stage/tokens.jsx";
import "./settings-love-stage/widgets.jsx";
import StageAtelierScreen from "./settings-love-stage/stage-atelier.jsx";

export default function SettingsLoveApp({ onClose }) {
  useEffect(() => {
    const id = "settings-love-stage-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600&family=Noto+Sans+SC:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Caveat:wght@400;500&family=JetBrains+Mono:wght@400&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className="sla-root"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#FAF7F5",
      }}
    >
      <StageAtelierScreen onClose={onClose} />
    </div>
  );
}
