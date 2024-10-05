import { getAll as getAllActivities } from "/actions/activities";
import Timeline from "./components/timeline";

export default async function Changes({ params: { id } }) {
  const params = {
    "filter[subject_id]": id,
    "filter[subject_type]": "task",
    "filter[event]": "updated",
    include: ["causer", "subject"],
  };
  const changes = await getAllActivities(params);

  return <Timeline changes={changes} />;
}
