import { CogIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/structure";
import { Documentation } from "./components/Documentation";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Documentation")
        .child(S.component(Documentation).title("CMS Documentation")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "settings"),
      S.divider(),
      S.listItem()
        .title("Settings")
        .icon(CogIcon)
        .id("settings")
        .child(S.document().schemaType("settings").documentId("settings")),
    ]);
