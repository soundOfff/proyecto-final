"use server";

import { redirect } from "next/navigation";

export async function generatePdf(params) {
  const url = new URL(`${process.env.API_URL}/generate-pdf`);
  url.search = new URLSearchParams(params);

  redirect(url);
}
