import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import babelParser from "@typescript-eslint/parser";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  
  {
     
    rules:{
      "@typescript-eslint/no-explicit-any": ["off"],
       'vue/multi-word-component-names':'off',
       "@typescript-eslint/no-non-null-assertion": "off",
       "@typescript-eslint/no-unused-vars": "off",
       "@typescript-eslint/no-empty-function": "off",
       "vue/no-unused-components": "off",
       "vue/require-prop-types-constructor": "off",
       "no-undef": "off",
    },
   
    "languageOptions": {
        parser: babelParser,
        parserOptions: {  
          ecmaVersion: 2023, // 指定 ECMAScript 版本  
          sourceType: 'module', // 默认为 script 或 module  
          ecmaFeatures: {  
            // 如果你需要处理 JSX，则启用此选项  
            jsx: true // 例如，在使用 Vue 的 JSX/TSX 语法时  
          }  
        },  
       
    }
    
   
  },
  
];