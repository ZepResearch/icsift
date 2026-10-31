// Renders schema.org structured data as a real <script type="application/ld+json"> tag, which is what search engines
// read. `<` is escaped so no value can close the script tag early.
export default function JsonLd({ data }) {
  const items = Array.isArray(data) ? data : [data];
  return items.map((item, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
    />
  ));
}
