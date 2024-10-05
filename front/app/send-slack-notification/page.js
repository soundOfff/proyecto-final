import FormComponent from "./components/form";
import { select } from "/actions/staffs";

export default async function SendSlackMessage() {
  const staffs = await select({ "filter[has-channels]": true });

  return <FormComponent staffs={staffs} />;
}
