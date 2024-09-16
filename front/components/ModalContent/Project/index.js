"use client";

import { store as storeProject } from "/actions/projects";
import Index from "/app/projects/components/form";

export default function ProjectModalContent({ formData }) {
  return <Index {...formData} />;
}
