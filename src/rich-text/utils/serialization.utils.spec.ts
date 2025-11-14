import { describe, it, expect } from "vitest";
import { serialize, deserialize } from "./serialization.utils";

describe("Slate Utils", () => {
  describe(".serialize()", () => {
    it("should serialize an example with code", () => {
      expect(
        serialize([
          {
            type: "p",
            children: [
              { text: "An " },
              { text: "opening", bold: true, italic: true, underline: true },
              { text: " paragraph with a " },
              {
                type: "link",
                url: "https://example.com",
                children: [{ text: "link" }],
              },
              { text: " in it." },
            ],
          },
          {
            type: "blockquote",
            children: [{ text: "A wise quote." }],
          },
          {
            type: "p",
            children: [{ text: "A closing paragraph!" }],
          },
          {
            type: "code",
            language: "javascript",
            children: [
              {
                type: "code-line",
                children: [{ text: "if (true) { return 1 }" }],
              },
              {
                type: "code-line",
                children: [{ text: "if (false) { return 2 }" }],
              },
            ],
          },
          {
            type: "ol",
            children: [
              {
                type: "li",
                children: [{ text: "one" }],
              },
              {
                type: "li",
                children: [{ text: "two" }],
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ text: "a" }],
              },
              {
                type: "li",
                children: [{ text: "b" }],
              },
            ],
          },
          {
            type: "h1",
            align: "left",
            children: [{ text: "head1" }],
          },
          {
            type: "h2",
            align: "center",
            children: [{ text: "head2" }],
          },
          {
            type: "h3",
            align: "right",
            children: [{ text: "head3" }],
          },
          {
            type: "h4",
            align: "justify",
            children: [{ text: "head4" }],
          },
        ])
      )
        .toEqual(`<p>An <u><em><strong>opening</strong></em></u> paragraph with a <a href="https://example.com">link</a> in it.</p>
<blockquote><p>A wise quote.</p></blockquote>
<p>A closing paragraph!</p>
<code data-language="javascript">if (true) { return 1 }\nif (false) { return 2 }</code>
<ol><li>one</li><li>two</li></ol>
<ul><li>a</li><li>b</li></ul>
<h1 style="text-align: left">head1</h1>
<h2 style="text-align: center">head2</h2>
<h3 style="text-align: right">head3</h3>
<h4 style="text-align: justify">head4</h4>`);
    });
  });

  describe(".deserialize()", () => {
    it('should split code lines into code-lines', () => {
      const value = '<code data-language="javascript">if (true) { return 1 }\nif (false) { return 2 }</code>';
      const document = new DOMParser().parseFromString(value, "text/html");
      expect(deserialize(document.body)).toEqual([
        {
          type: "code",
          language: "javascript",
          children: [
            {
              type: "code-line",
              children: [{ text: "if (true) { return 1 }" }],
            },
            {
              type: "code-line",
              children: [{ text: "if (false) { return 2 }" }],
            },
          ],
        },
      ]);
    });

    it("should deserialize an example with code", () => {
      const value =
        '<h1 style="text-align: left">head1</h1><h2 style="text-align: center">head2</h2><h3 style="text-align: right">head3</h3><h4 style="text-align: justify">head4</h4><h5>head5</h5><h6>head6</h6><p>Theres <strong>some</strong> <u><em>text</em></u>!!</p><code data-language="javascript">if (true) { return 1 }\nif (false) { return 2 }</code><p>There you have it!</p><ol><li>one</li><li>two</li></ol><ul><li>a</li><li>b</li></ul>';
      const document = new DOMParser().parseFromString(value, "text/html");
      expect(deserialize(document.body)).toEqual([
        {
          type: "h1",
          align: "left",
          children: [{ text: "head1" }],
        },
        {
          type: "h2",
          align: "center",
          children: [{ text: "head2" }],
        },
        {
          type: "h3",
          align: "right",
          children: [{ text: "head3" }],
        },
        {
          type: "h4",
          align: "justify",
          children: [{ text: "head4" }],
        },
        {
          type: "h5",
          children: [{ text: "head5" }],
        },
        {
          type: "h6",
          children: [{ text: "head6" }],
        },
        {
          type: "p",
          children: [
            { text: "Theres " },
            { text: "some", bold: true },
            { text: " " },
            { text: "text", italic: true, underline: true },
            { text: "!!" },
          ],
        },
        {
          type: "code",
          language: "javascript",
          children: [
            {
              type: "code-line",
              children: [{ text: "if (true) { return 1 }" }],
            },
            {
              type: "code-line",
              children: [{ text: "if (false) { return 2 }" }],
            },
          ],
        },
        {
          type: "p",
          children: [{ text: "There you have it!" }],
        },
        {
          type: "ol",
          children: [
            { type: "li", children: [{ text: "one" }] },
            { type: "li", children: [{ text: "two" }] },
          ],
        },
        {
          type: "ul",
          children: [
            { type: "li", children: [{ text: "a" }] },
            { type: "li", children: [{ text: "b" }] },
          ],
        },
      ]);
    });
  });
});
