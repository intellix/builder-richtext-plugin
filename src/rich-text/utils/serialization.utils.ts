import { Text, Descendant } from "slate";
import { jsx } from "slate-hyperscript";
import escapeHTML from "escape-html";

export function serialize(nodes: Descendant[]): string {
  return nodes.map(serializeNode).join("\n");
}

function serializeNode(node: Descendant): string {
  if (Text.isText(node)) {
    let string = escapeHTML(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    return string;
  }

  if (node.type === 'code') {
    return `<code data-language="${node.language}">${node.children?.map(serializeNode).join('\n')}</code>`;
  }

  const children = node.children?.map(serializeNode).join("");

  switch (node.type) {
    case "blockquote":
      return `<blockquote><p>${children}</p></blockquote>`;
      case "link":
        return `<a href="${escapeHTML(node.url)}">${children}</a>`;
    case "p":
    case "ul":
    case "ol":
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      const tag = node.type;
      const styles = !!node.align ? ` style="text-align: ${node.align}"` : '';
      return `<${tag}${styles}>${children}</${tag}>`;
    case 'li': 
      return `<li>${children}</li>`;
    default:
      return children;
  }
}

export const deserialize = (el: Node, markAttributes = {}) => {
  if (el.nodeType === Node.TEXT_NODE) {
    return jsx("text", markAttributes, el.textContent);
  } else if (el.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const nodeAttributes: Record<string, any> = { ...markAttributes };

  // define attributes for text nodes
  switch (el.nodeName) {
    case "STRONG":
      nodeAttributes.bold = true;
      break;
    case "EM":
      nodeAttributes.italic = true;
      break;
    case "U":
      nodeAttributes.underline = true;
      break;
  }

  const children: any[] = Array.from(el.childNodes)
    .map((node) => deserialize(node as Element, nodeAttributes))
    .flat();

  if (children.length === 0) {
    children.push(jsx("text", nodeAttributes, ""));
  }

  if (el.nodeName === 'CODE') {
    // Flatten all text content inside <code> into a single string
    let codeText = '';
    
    function extractText(node: any) {
      if (node == null) return;
      if (typeof node === 'string') {
        codeText += node;
      } else if (node.text) {
        codeText += node.text;
      } else if (Array.isArray(node.children)) {
        node.children.forEach(extractText);
      }
    }

    children.forEach(extractText);
    // Split by \n and wrap each line in a code-line element
    const codeLines = codeText.split(/\r?\n/).map(line =>
      jsx('element', { type: 'code-line' }, jsx('text', {}, line))
    );
    return jsx(
      "element",
      {
        type: "code",
        language: (el as Element).getAttribute("data-language"),
      },
      codeLines,
    );
  }

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "BLOCKQUOTE":
    case "P":
    case "UL":
    case "OL":
    case "LI":
    case "H1":
    case "H2":
    case "H3":
    case "H4":
    case "H5":
    case "H6": {
      // Check for text-align style for all block elements
      let align: string | undefined;
      
      if (el instanceof HTMLElement && el.style && el.style.textAlign) {
        align = el.style.textAlign;
      } else if (el instanceof HTMLElement && el.hasAttribute('style')) {
        // fallback: parse style attribute manually
        const style = el.getAttribute('style');
        if (style) {
          const match = style.match(/text-align:\s*(\w+)/);
          if (match) align = match[1];
        }
      }

      const attrs: any = { type: el.nodeName.toLowerCase() };
      if (align) {
        attrs.align = align;
      }

      return jsx("element", attrs, children);
    }
    case "A":
      return jsx(
        "element",
        { type: "link", url: (el as Element).getAttribute("href") },
        children
      );
    default:
      return children;
  }
};
