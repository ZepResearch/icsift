// lib/matchSpeaker.js

// Strips titles (Dr., Prof.) and trailing degree suffixes (LPT, PhD, RN, etc.)
// then returns lowercase space-separated tokens for comparison.
function getNameKey(raw) {
  if (!raw) return ""
  return raw
    .split(",")[0] // drop everything after first comma (degrees/affiliation)
    .toLowerCase()
    .replace(/\b(dr|prof|mr|mrs|ms|md)\b\.?/g, "")
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Finds the best-matching PocketBase speaker record for a given agenda name.
 * Uses token overlap (all/most tokens of the PB name must appear in the agenda name).
 */
export function matchSpeaker(agendaName, speakers = []) {
  if (!agendaName || !speakers.length) return null

  const agendaTokens = getNameKey(agendaName).split(" ").filter(Boolean)
  if (!agendaTokens.length) return null

  let best = null
  let bestScore = 0

  for (const sp of speakers) {
    const spTokens = getNameKey(sp.name).split(" ").filter(Boolean)
    if (!spTokens.length) continue

    const overlap = spTokens.filter((t) => agendaTokens.includes(t)).length
    const score = overlap / spTokens.length

    if (score > bestScore) {
      bestScore = score
      best = sp
    }
  }

  // require at least ~60% of the PB record's name tokens to be present
  return bestScore >= 0.6 ? best : null
}

export function getSpeakerImageUrl(speaker) {
  if (!speaker?.image) return null
  const base = process.env.NEXT_PUBLIC_POCKETBASE_URL
  return `${base}/api/files/${speaker.collectionId}/${speaker.id}/${speaker.image}`
}