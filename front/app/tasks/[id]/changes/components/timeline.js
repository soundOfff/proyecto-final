"use client";

import TimelineList from "/examples/Timeline/TimelineList";
import TimelineItem from "/examples/Timeline/TimelineItem";
import { parseEditorState } from "/utils/parseEditorState";
import taskFieldTranslate from "/locales/es/task-fields";
import MDTypography from "/components/MDTypography";

export default function Timeline({ changes }) {
  const formatProperties = (values) => {
    let formattedProperties = [];

    for (const [key, value] of Object.entries(values)) {
      const translatedKey = taskFieldTranslate[key] || key;
      if (key === "description" && value) {
        const description = parseEditorState(value);
        formattedProperties = [
          ...formattedProperties,
          [
            `${translatedKey}: ${description
              .getCurrentContent()
              .getPlainText()}`,
          ],
        ];
        continue;
      }
      if (value instanceof Array) {
        formattedProperties = [
          ...formattedProperties,
          [`${translatedKey}: ${value.join(", ")}`],
        ];
        continue;
      }
      formattedProperties = [
        ...formattedProperties,
        [`${translatedKey}: ${value}`],
      ];
    }

    return formattedProperties;
  };

  return changes.length > 0 ? (
    <TimelineList title="Timeline">
      {changes.map((change) => (
        <TimelineItem
          key={change.id}
          color="dark"
          icon="panorama_fish_eye"
          title={`Tarea Actualizada por ${change.causer.name}`}
          dateTime={change.updatedAt}
          firstDescriptionTitle="Valores Anteriores: "
          firstDescription={formatProperties(change.properties.old)}
          secondDescriptionTitle="Valores Nuevos: "
          secondDescription={formatProperties(change.properties.attributes)}
          badges={["design"]}
        />
      ))}
    </TimelineList>
  ) : (
    <TimelineList title="Timeline">
      <MDTypography variant="body2" mx={1}>
        No hay cambios registrados
      </MDTypography>
    </TimelineList>
  );
}
