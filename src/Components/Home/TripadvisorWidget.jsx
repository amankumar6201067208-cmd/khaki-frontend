import { useEffect, useRef } from "react";

/**
 * @param {string} html      
 * @param {string} scriptSrc 
 */
const TripadvisorWidget = ({ html, scriptSrc, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.innerHTML = html;

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.setAttribute("data-loadtrk", "");
    el.appendChild(script);

    return () => {
      el.innerHTML = "";
    };
  }, [html, scriptSrc]);

  return <div ref={ref} className={className} />;
};

export default TripadvisorWidget;
