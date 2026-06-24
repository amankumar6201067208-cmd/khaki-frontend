import { STRAPI_BASE_URL } from "../api/strapi";

/* ------------------------------------------------------------------
   Strapi Rich-Text (Blocks) renderer
   Renders inline marks (bold / italic / underline / strikethrough /
   code / link) and block types (paragraph / heading / list / quote /
   code / image) so the editor formatting reflects on the frontend.

   Usage:  <RichTextRenderer nodes={blocksArray} />
   `nodes` is the raw Strapi "blocks" field value (an array).
------------------------------------------------------------------- */

// Inline node: a text leaf with marks, or a link
const renderLeaf = (node, key) => {
  // Link node — render an <a> with its (formatted) children inside
  if (node.type === "link") {
    return (
      <a
        key={key}
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#DB4D27] underline wrap-break-word"
      >
        {node.children?.map((child, i) => renderLeaf(child, i))}
      </a>
    );
  }

  // Empty text → keep line spacing intact
  if (node.text === "") return <br key={key} />;

  let el = node.text;

  if (node.bold) el = <strong>{el}</strong>;
  if (node.italic) el = <em>{el}</em>;
  if (node.underline) el = <u>{el}</u>;
  if (node.strikethrough) el = <s>{el}</s>;
  if (node.code) {
    el = (
      <code className="bg-gray-200 text-[#DB4D27] px-1.5 py-0.5 rounded text-sm font-mono">
        {el}
      </code>
    );
  }

  return <span key={key}>{el}</span>;
};

// Block-level node
const renderBlock = (node, key) => {
  const inline = node.children?.map((child, i) => renderLeaf(child, i));

  switch (node.type) {
    case "heading": {
      const Tag = `h${node.level || 2}`;
      const sizeMap = {
        1: "text-3xl",
        2: "text-2xl",
        3: "text-xl",
        4: "text-lg",
        5: "text-base",
        6: "text-sm",
      };
      return (
        <Tag
          key={key}
          className={`font-bold text-black mt-6 mb-3 ${sizeMap[node.level] || "text-xl"}`}
        >
          {inline}
        </Tag>
      );
    }

    case "list": {
      const Tag = node.format === "ordered" ? "ol" : "ul";
      return (
        <Tag
          key={key}
          className={`mb-4 ml-6 space-y-1 ${
            node.format === "ordered" ? "list-decimal" : "list-disc"
          }`}
        >
          {node.children?.map((item, i) => renderBlock(item, i))}
        </Tag>
      );
    }

    case "list-item":
      return (
        <li key={key} className="leading-relaxed">
          {node.children?.map((child, i) =>
            // Nested lists are block-level; everything else is inline
            child.type === "list" ? renderBlock(child, i) : renderLeaf(child, i)
          )}
        </li>
      );

    case "quote":
      return (
        <blockquote
          key={key}
          className="border-l-4 border-[#DB4D27] pl-4 italic text-gray-700 my-4"
        >
          {inline}
        </blockquote>
      );

    case "code":
      return (
        <pre
          key={key}
          className="bg-gray-900 text-white p-4 rounded my-4 overflow-x-auto text-sm"
        >
          <code>{node.children?.map((c) => c.text).join("")}</code>
        </pre>
      );

    case "image":
      return node.image?.url ? (
        <div key={key} className="flex justify-center my-6">
          <img
            src={`${STRAPI_BASE_URL}${node.image.url}`}
            alt={node.image.alternativeText || ""}
            className="max-w-full rounded"
          />
        </div>
      ) : null;

    case "paragraph":
    default:
      return (
        <p key={key} className="leading-relaxed mb-4">
          {inline}
        </p>
      );
  }
};

const RichTextRenderer = ({ nodes, className = "" }) => {
  if (!Array.isArray(nodes) || nodes.length === 0) return null;

  return (
    <div className={className}>
      {nodes.map((node, i) => renderBlock(node, i))}
    </div>
  );
};

export default RichTextRenderer;
