import { useEffect, useRef, useState } from "react";

/**
 
 * @param {string} html      the widget container markup (the <div id="TA_...">…)
 * @param {string} scriptSrc the jscache.com/wejs loader URL (entities decoded)
 * @param {number} scale     visual shrink factor (1 = native size)
 */
const TripadvisorWidget = ({ html, scriptSrc, className = "", scale = 1 }) => {
  const iframeRef = useRef(null);
  const [size, setSize] = useState({ w: 340 * scale, h: 120 * scale });

  const srcDoc =
    `<!doctype html><html><head><meta charset="utf-8">` +
    `<style>html,body{margin:0;padding:0;background:transparent;}` +
    `body{display:inline-block;transform:scale(${scale});transform-origin:top left;}</style></head>` +
    `<body>${html}<script data-loadtrk src="${scriptSrc}"></script></body></html>`;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let stopped = false;

    const measure = () => {
      if (stopped) return;
      try {
        const body = iframe.contentDocument && iframe.contentDocument.body;
        if (body && body.scrollWidth && body.scrollHeight) {
          const w = Math.ceil(body.scrollWidth * scale);
          const h = Math.ceil(body.scrollHeight * scale);
          setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
        }
      } catch {
        /* same-origin srcdoc — ignore any transient access error */
      }
    };

    const interval = setInterval(measure, 300);
    const stop = setTimeout(() => {
      stopped = true;
      clearInterval(interval);
    }, 8000);

    return () => {
      stopped = true;
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, [srcDoc, scale]);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={srcDoc}
      title="Tripadvisor"
      scrolling="no"
      className={className}
      style={{
        width: size.w,
        height: size.h,
        maxWidth: "100%",
        border: 0,
        overflow: "hidden",
      }}
    />
  );
};

export default TripadvisorWidget;
