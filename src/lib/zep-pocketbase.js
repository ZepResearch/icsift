import PocketBase from "pocketbase"

const PB_URL = process.env.NEXT_PUBLIC_PB_URL_ZEP || "https://admin.zepresearch.com"
const pb = new PocketBase(PB_URL)

if (typeof window !== "undefined") {
	try {
		const saved = localStorage.getItem("pb_auth")
		if (saved) {
			pb.authStore.save(JSON.parse(saved))
		}
	} catch (err) {
		// corrupted saved auth; clear it
		try { localStorage.removeItem("pb_auth") } catch (e) {}
		// continue without restored auth
		// eslint-disable-next-line no-console
		console.warn("Failed to restore PocketBase auth from localStorage", err)
	}

	// persist auth store changes
	pb.authStore.onChange(() => {
		try {
			const obj = pb.authStore.exportToObject()
			localStorage.setItem("pb_auth", JSON.stringify(obj))
		} catch (err) {
			// eslint-disable-next-line no-console
			console.warn("Failed to persist PocketBase auth to localStorage", err)
		}
	})
}

export function clearPbAuth() {
	if (typeof window !== "undefined") {
		try { localStorage.removeItem("pb_auth") } catch (e) {}
	}
	try { pb.authStore.clear() } catch (e) {}
}

export default pb

