import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import jsdoc from 'eslint-plugin-jsdoc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  // Make the configuration compatible with React Native and ignore the
  // external code.
  {
    extends: fixupConfigRules(compat.extends('@react-native')),
    ignores: ['node_modules/', 'lib/'],
  },
  // Warning for missing JSDoc, except on:
  // - destructured props (e.g. {children}: props), deactivate the need to
  //   documentate the children,
  // - arrow functions that are components, deactivate @returns,
  // - arrow functions that are components, deactivate @param,
  // - arrow functions that are not components (PascalCase), constructors,
  //   getters, and setters, deactivate the whole doc,
  // - tags introduced by TypeDoc are enabled.
  jsdoc.configs['flat/recommended-typescript'],
  {
    rules: {
      'jsdoc/check-param-names': ['warn', { checkDestructured: false }],
      'jsdoc/require-returns': [
        'warn',
        {
          contexts: [
            'FunctionDeclaration',
            'ClassDeclaration',
            'MethodDefinition',
            'VariableDeclaration > VariableDeclarator[id.name=/^[a-z_]/] > ArrowFunctionExpression',
          ],
        },
      ],
      'jsdoc/require-param': [
        'warn',
        {
          contexts: [
            'FunctionDeclaration',
            'ClassDeclaration',
            'MethodDefinition',
            'VariableDeclaration > VariableDeclarator[id.name=/^[a-z_]/] > ArrowFunctionExpression',
          ],
        },
      ],
      'jsdoc/require-jsdoc': [
        'warn',
        {
          contexts: [
            'FunctionDeclaration',
            'ClassDeclaration',
            'MethodDefinition',
            'VariableDeclaration > VariableDeclarator[id.name=/^[A-Z]/] > ArrowFunctionExpression',
          ],
          checkConstructors: false,
          checkGetters: false,
          checkSetters: false,
        },
      ],
      'jsdoc/check-tag-names': [
        'error',
        {
          definedTags: [
            'group',
            'groupDescription',
            'showGroups',
            'hideGroups',
            'disableGroups',
            'category',
            'categoryDescription',
            'packageDocumentation',
            'defaultValue',
          ],
        },
      ],
    },
  },
  // Deploy eslint-config-prettier and eslint-plugin-prettier recommended config
  // on top of everything.
  prettierPluginRecommended,
  // Override prettier settings to force max-len of 80 characters for special
  // cases and show errors.
  {
    rules: {
      'max-len': [
        'error',
        {
          code: 80,
          comments: 80,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
    },
  },
])
