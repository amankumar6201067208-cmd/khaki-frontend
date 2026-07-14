import { useEffect, useRef } from "react";

/**
 * Embeds a Tripadvisor script widget (jscache.com/wejs) in React.
 *
 * React does not execute <script> tags rendered in JSX, and the Tripadvisor
 * script needs its container markup present in the DOM before it runs. So we
 * inject the container HTML and then append the loader script imperatively.
 *
 * @param {string} html      the widget container markup (the <div id="TA_...">…)
 * @param {string} scriptSrc the jscache.com/wejs loader URL (entities decoded)
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
