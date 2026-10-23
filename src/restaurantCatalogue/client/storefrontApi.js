import { storefrontUrl, onlineOrdersPublicUrl } from "../../api/hospitalityEndpoint.js"; // TODO: match your path (see SETUP.md)

/*
  The public online order page's calls. No token: customers aren't signed in.
  Every call returns the JSON body or throws an Error with the server's
  message (and .status), so the page can show it as it is.
*/

async function call(url, options = {}) {
  let res;
  try {
    res = await fetch(url, {
      ...options,
      headers: { Accept: "application/json", ...(options.body ? { "Content-Type": "application/json" } : {}) },
    });
  } catch {
    throw Object.assign(new Error("No connection. Check your internet and try again."), { status: 0 });
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.message || "Something went wrong. Try again."), { status: res.status });
  return data;
}

export const storefrontApi = {
  /* → { venue, menu, categories, payment: { options } } */
  load: (venueType, venueId) => call(`${storefrontUrl}/${encodeURIComponent(venueType)}/${encodeURIComponent(venueId)}`),

  /* → { order, trackingCode, trackingUrl, payment: { authorizationUrl } | { error } | null } */
  placeOrder: (venueType, venueId, body) =>
    call(`${onlineOrdersPublicUrl}/${encodeURIComponent(venueType)}/${encodeURIComponent(venueId)}`, { method: "POST", body: JSON.stringify(body) }),

  /* → { order } ; reference: Paystack's, when coming back from payment */
  track: (code, reference) => call(`${storefrontUrl}/track/${encodeURIComponent(code)}${reference ? `?reference=${encodeURIComponent(reference)}` : ""}`),

  /* → { authorizationUrl } */
  payAgain: (code) => call(`${storefrontUrl}/track/${encodeURIComponent(code)}/pay`, { method: "POST", body: "{}" }),

  /* → { summary, reviews, more } ; rating: 1–5 or null for all, before: the last review's createdAt */
  reviews: (venueType, venueId, { rating, before } = {}) => {
    const q = new URLSearchParams();
    if (rating) q.set("rating", rating);
    if (before) q.set("before", before);
    return call(`${storefrontUrl}/${encodeURIComponent(venueType)}/${encodeURIComponent(venueId)}/reviews${q.toString() ? `?${q}` : ""}`);
  },

  /* → { review, canReview, reviewUntil, reviewName } ; once delivered, sending again changes it */
  rateOrder: (code, { rating, comment }) =>
    call(`${storefrontUrl}/track/${encodeURIComponent(code)}/review`, { method: "POST", body: JSON.stringify({ rating, comment }) }),
};
