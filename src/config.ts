import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "mesh-role-draw",
  description: "A first-claim role picker for a small group.",
  accentHex: "#a84f62",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});
