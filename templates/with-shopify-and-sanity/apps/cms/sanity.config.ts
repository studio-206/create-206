import { defineConfig, isDev } from "sanity";
import { theme } from "https://themer.sanity.build/api/hues?preset=pixel-art&primary=695cff";

import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
import { structure } from "./desk";

import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";
import { media, mediaAssetSource } from "sanity-plugin-media";
import { customDocumentActions } from "./plugins/customDocumentActions";
import { Logo } from "./components/logo";

const devOnlyPlugins = [visionTool()];

export default defineConfig({
  name: "default",
  title: "Studio 206 Shopify Demo",

  projectId: "8z0ph8yg",
  dataset: "production",

  theme,
  studio: {
    components: {
      logo: Logo,
    },
  },

  plugins: [
    deskTool({ structure }),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    file: {
      assetSources: previousAssetSources => {
        return previousAssetSources.filter(assetSource => assetSource !== mediaAssetSource);
      },
    },
    image: {
      assetSources: previousAssetSources => {
        return previousAssetSources.filter(assetSource => assetSource === mediaAssetSource);
      },
    },
  },
});
