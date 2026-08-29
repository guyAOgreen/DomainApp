import globals from "globals";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

/**
 * Accessibility linting only.
 *
 * No general TypeScript or React style rules are enabled here on purpose. `tsc` already covers
 * type correctness and Prettier owns formatting, so widening this config would duplicate both and
 * turn an accessibility gate into a style debate.
 *
 * ESLint is pinned to 9 deliberately: eslint-plugin-jsx-a11y declares peer support up to 9 and
 * has not yet published support for 10. This is a considered constraint, not a stale dependency.
 */
export default [
  {
    // Mirrors the build output and coverage entries in .gitignore. `build` is a stale
    // Create React App artifact that still exists in some working copies.
    ignores: ["build/**", "dist/**", "coverage/**"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: { "jsx-a11y": jsxA11y },
    rules: jsxA11y.flatConfigs.recommended.rules,
  },
];
