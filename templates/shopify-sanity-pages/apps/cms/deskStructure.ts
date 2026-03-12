import { CogIcon, InfoOutlineIcon, PackageIcon } from "@sanity/icons";
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
      ...S.documentTypeListItems().filter(
        (item) => !["settings", "collection", "product", "productVariant"].includes(item.getId()!),
      ),
      S.divider(),
      S.listItem()
        .title("Collections")
        .icon(PackageIcon)
        .schemaType("collection")
        .child(S.documentTypeList("collection")),
      S.listItem()
        .title("Products")
        .schemaType("product")
        .child(
          S.documentTypeList("product")
            .defaultLayout("detail")
            .child(async (id) =>
              S.list()
                .title("Products")
                .canHandleIntent(
                  (intentName, params) => intentName === "edit" && params.type === "product"
                )
                .items([
                  // Details
                  S.listItem()
                    .title("Details")
                    .icon(InfoOutlineIcon)
                    .schemaType("product")
                    .id(id)
                    .child(S.document().schemaType("product").documentId(id)),
                  // Product variants
                  S.listItem()
                    .title("Variants")
                    .schemaType("productVariant")
                    .child(
                      S.documentList()
                        .title("Variants")
                        .schemaType("productVariant")
                        .filter(
                          `
                          _type == "productVariant"
                          && store.productId == $productId
                        `
                        )
                        .params({
                          productId: Number(id.replace("shopifyProduct-", "")),
                        })
                        .canHandleIntent(
                          (intentName, params) =>
                            intentName === "edit" && params.type === "productVariant"
                        )
                    ),
                ])
            )
        ),
      S.divider(),
      S.listItem()
        .title("Settings")
        .icon(CogIcon)
        .id("settings")
        .child(S.document().schemaType("settings").documentId("settings")),
    ]);
