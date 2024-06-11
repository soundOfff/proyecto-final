import { logout } from "/actions/staffs";

export async function POST(request) {
  const body = await request.json();

  await logout(body.staff_id);

  return Response.json({ message: "Usuario deslogeado correctamente" });
}
