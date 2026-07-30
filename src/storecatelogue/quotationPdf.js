import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// jsPDF's built-in fonts only cover the Latin-1/WinAnsi range, so symbols
// like ₦ or ₹ print as a broken box. Where the store's currency symbol
// falls outside that range, fall back to a plain 3-letter code instead —
// extend this map as you support more currencies. The app's own UI keeps
// showing the real symbol everywhere else, since browser fonts support it.
const CURRENCY_PDF_FALLBACKS = {
  "₦": "NGN",
  "₹": "INR",
  "₩": "KRW",
  "₫": "VND",
  "₱": "PHP",
  "₴": "UAH",
  "₪": "ILS",
  "₡": "CRC",
  "₲": "PYG",
  "₭": "LAK",
};
const DEFAULT_CURRENCY = "₦";
const NAVY = [15, 42, 71];
const TEAL = [55, 180, 197];
const MUTED = [107, 122, 141];

function isPdfSafe(symbol) {
  return Array.from(symbol).every((ch) => ch.codePointAt(0) <= 255);
}

function pdfSafeCurrency(symbol) {
  if (!symbol) return CURRENCY_PDF_FALLBACKS[DEFAULT_CURRENCY];
  if (isPdfSafe(symbol)) return symbol;
  return CURRENCY_PDF_FALLBACKS[symbol] || "";
}

function formatPricePdf(amount, currency) {
  const safe = pdfSafeCurrency(currency);
  return (safe ? safe + " " : "") + Number(amount || 0).toLocaleString("en-NG");
}

/**
 * buildQuotationPdf
 *
 * Renders a one-page quotation PDF for a cart of items from a single store.
 * Client-side only (jsPDF) — no server round-trip needed.
 *
 * cart: array of { product, subUnit, qty, unitPrice } — same shape StoreCatalogue
 *   keeps in its cart state.
 *
 * Returns { blob, filename } — blob is a `Blob` of type "application/pdf",
 * ready to download or hand to the Web Share API / your own upload endpoint.
 */
export function buildQuotationPdf(store, cart, total) {
  const currency = store.currency || DEFAULT_CURRENCY;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;

  // ---------- Header ----------
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageWidth, 90, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(store.storeName, margin, 40);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(200, 220, 230);
  doc.text("Product Quotation", margin, 58);
  doc.text(new Date().toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" }), margin, 72);

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  const contactLines = [store.phoneNumber, store.storeAddress].filter(Boolean);
  contactLines.forEach((line, i) => {
    doc.text(line, pageWidth - margin, 40 + i * 14, { align: "right" });
  });

  // ---------- Items table ----------
  const rows = cart.map((item) => [
    item.product.name + (item.subUnit ? ` (${item.subUnit.name})` : ""),
    String(item.qty),
    formatPricePdf(item.unitPrice, currency),
    formatPricePdf(item.unitPrice * item.qty, currency),
  ]);

  autoTable(doc, {
    startY: 115,
    margin: { left: margin, right: margin },
    tableWidth: "wrap",
    layout: "fixed",
    head: [["Item", "Qty", "Unit Price", "Line Total"]],
    body: rows,
    styles: { font: "helvetica", fontSize: 10, cellPadding: 8, textColor: NAVY, overflow: "linebreak" },
    headStyles: { fillColor: TEAL, textColor: [255, 255, 255], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [247, 249, 251] },
    columnStyles: {
      0: { cellWidth: 235 },
      1: { cellWidth: 45 },
      2: { cellWidth: 110 },
      3: { cellWidth: 110 },
    },
  });

  // ---------- Total ----------
  const finalY = doc.lastAutoTable.finalY + 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...NAVY);
  doc.text("Total", pageWidth - margin - 160, finalY);
  doc.text(formatPricePdf(total, currency), pageWidth - margin, finalY, { align: "right" });

  // ---------- Footer ----------
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("This is a quotation, not an invoice. Prices are subject to change until confirmed by the seller.", margin, doc.internal.pageSize.getHeight() - 40);
  doc.text("Generated with StoreLense. Inventory Manager", margin, doc.internal.pageSize.getHeight() - 26);

  const blob = doc.output("blob");
  const filename = `quotation-${store.storeName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.pdf`;

  return { blob, filename };
}
