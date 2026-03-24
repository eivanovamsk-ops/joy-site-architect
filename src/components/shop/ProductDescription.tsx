/**
 * Renders a plain-text product description with auto-detected subheadings
 * converted to semantic HTML (h2/h3) for SEO and readability.
 *
 * Heuristic: a "block" (text between blank lines) that is a single short line
 * (≤80 chars), does NOT start with a bullet ("•"/"-") and is NOT the very
 * first block (which is the intro paragraph) is treated as a subheading.
 */

interface ProductDescriptionProps {
  text: string;
  productName?: string;
}

export const ProductDescription = ({ text, productName }: ProductDescriptionProps) => {
  // Split by double-newline to get logical blocks
  const blocks = text.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);

  const isHeading = (block: string, index: number): boolean => {
    if (index === 0) return false; // first block is always intro
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length !== 1) return false;
    const line = lines[0];
    if (line.startsWith("•") || line.startsWith("-") || line.startsWith("—")) return false;
    if (line.length > 90) return false;
    // Must not be a single bullet list item or a very short fragment
    if (line.length < 5) return false;
    return true;
  };

  // Determine heading level: first heading after intro = h2, sub-sections = h3
  // Simple approach: use h2 for top-level headings, h3 if preceded by another heading recently
  let headingCount = 0;

  const renderBlock = (block: string, index: number) => {
    if (isHeading(block, index)) {
      headingCount++;
      // Use h2 for the first few major sections, h3 for deeper ones
      // Simple: alternate based on content hints (ending with ":")
      const Tag = block.endsWith(":") ? "h3" : "h2";
      return (
        <Tag
          key={index}
          className={
            Tag === "h2"
              ? "text-xl font-bold text-foreground mt-8 mb-3"
              : "text-lg font-semibold text-foreground mt-6 mb-2"
          }
        >
          {block.replace(/:$/, "")}
        </Tag>
      );
    }

    // Regular block — may contain bullet lines
    const lines = block.split("\n");
    const hasBullets = lines.some((l) => l.trim().startsWith("•") || l.trim().startsWith("-"));

    if (hasBullets) {
      const parts: React.ReactNode[] = [];
      let currentList: string[] = [];
      let nonBulletLines: string[] = [];

      const flushList = () => {
        if (currentList.length > 0) {
          parts.push(
            <ul key={`ul-${parts.length}`} className="list-disc list-inside space-y-1 text-foreground my-2 ml-1">
              {currentList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
          currentList = [];
        }
      };

      const flushText = () => {
        if (nonBulletLines.length > 0) {
          parts.push(
            <p key={`p-${parts.length}`} className="text-foreground mb-2">
              {nonBulletLines.join(" ")}
            </p>
          );
          nonBulletLines = [];
        }
      };

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("•") || trimmed.startsWith("- ")) {
          flushText();
          currentList.push(trimmed.replace(/^[•\-]\s*/, ""));
        } else if (trimmed) {
          flushList();
          nonBulletLines.push(trimmed);
        }
      }
      flushText();
      flushList();

      return <div key={index}>{parts}</div>;
    }

    // Plain paragraph
    return (
      <p key={index} className="text-foreground mb-4 leading-relaxed">
        {block}
      </p>
    );
  };

  return (
    <div className="product-description">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
};
