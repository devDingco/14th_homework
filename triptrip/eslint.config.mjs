import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import { version } from "react-dom";

export default defineConfig([
  {languageOptions: { 
    globals: globals.browser 
  }},
  js.configs.recommended,
  tseslint.configs.recommended,
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      react: pluginReact,
    },
    rules:{
      "react/react-in-jsx-scope": "off"
    },
    settings:{
      react: {version: "detect"},
    },
  },
]);
