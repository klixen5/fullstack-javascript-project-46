import js from "@eslint/js"
import globals from 'globals'

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: "module",
            globals: {
                console: "readonly",
                process: "readonly",
                ...globals.node,
                ...globals.jest
            },
        },
    },
]