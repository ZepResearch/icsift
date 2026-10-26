// Display helpers for Journals records, usable from server and client components.

export const INDEX_TABS = [
  ["all", "All"],
  ["Scopus", "Scopus"],
  ["ABDC", "ABDC"],
  ["Wos", "Web of Science"],
  ["GoogleScholar", "Google Scholar"],
];

const INDEX_NAME = Object.fromEntries(INDEX_TABS.slice(1));

export const indexName = (type) => INDEX_NAME[type] || null;

export const coverOf = (journal) =>
  journal.imgs ? `https://zep-research.pockethost.io/api/files/Journals/${journal.id}/${journal.imgs}` : journal.img || null;
