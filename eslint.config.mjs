import nodeConfig from "./packages/config/eslint/node.js";
import reactConfig from "./packages/config/eslint/react.js";

export default [
  ...nodeConfig,
  {
    files: ["apps/web/**/*.{ts,tsx}", "packages/ui/**/*.{ts,tsx}"],
    ...reactConfig[reactConfig.length - 1]
  }
];
