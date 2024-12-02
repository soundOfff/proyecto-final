"use server";

export async function generatePdf(params) {
  const url = new URL(`${process.env.API_URL}/generate-pdf`);
  url.search = new URLSearchParams(params);

  return url.toString();
}

export async function generateBalancePdf(projectId) {
  const url = new URL(
    `${process.env.API_URL}/generate-balance-pdf/${projectId}`
  );

  return url.toString();
}
