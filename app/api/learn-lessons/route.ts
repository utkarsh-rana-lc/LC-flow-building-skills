import { NextResponse } from "next/server";

// Learning Academy content is maintained in this Google Sheet.
// Update the sheet (add/remove videos) and the app reflects it automatically.
// Sheet: https://docs.google.com/spreadsheets/d/17ow6nAKB0v6mESRhoXqxEbVf9-ADECs7sG_jtoLY2uM/edit?gid=0
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/17ow6nAKB0v6mESRhoXqxEbVf9-ADECs7sG_jtoLY2uM/export?format=csv&gid=0";

// Always run fresh so sheet edits (added/removed videos) show up immediately.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Fetched server-side to avoid the CORS redirect issue of Google's
    // export endpoint. `no-store` bypasses the Next data cache entirely.
    const response = await fetch(SHEET_CSV_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch lessons sheet" },
        { status: 502 },
      );
    }

    const csvText = await response.text();

    return new NextResponse(csvText, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch lessons sheet" },
      { status: 500 },
    );
  }
}
