import Index from "./components/index";

import {
  show as getMailTemplate,
  allowedFields,
} from "/actions/mail-templates";

export const dynamic = "force-dynamic";

export default async function MailTemplates({ params }) {
  const { id } = params;
  const mailTemplate = await getMailTemplate(id, { include: ["group"] });

  return <Index mailTemplate={mailTemplate} />;
}
