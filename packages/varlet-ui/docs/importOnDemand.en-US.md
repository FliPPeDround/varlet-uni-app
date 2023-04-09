# Import On Demand

### Intro

On-demand import avoids the full import of components, which can effectively reduce the size of the release package.

### Automatic Import

via plugin
[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) and
[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
Implement components to automatically import on demand, This is our most recommended way.

#### Install Plugin

```shell
# playground-ignore
# npm
npm i unplugin-vue-components unplugin-auto-import -D

# yarn
yarn add unplugin-vue-components unplugin-auto-import -D

# pnpm
pnpm add unplugin-vue-components unplugin-auto-import -D
````

#### Vite

````js
// playground-ignore
// vite.config.js
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    components({
      resolvers: [VarletUIResolver()]
    }),
    autoImport({
      resolvers: [VarletUIResolver({ autoImport: true })]
    })
  ]
})
````

#### Vue CLI
````js
// playground-ignore
// vue.config.js
const Components = require('unplugin-vue-components/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const { VarletUIResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [VarletUIResolver()]
      }),
      AutoImport({
        resolvers: [VarletUIResolver({ autoImport: true })]
      })
    ]
  }
}
````

#### Typescript configuration note

In order to get good IDE syntax highlighting, 
please make sure that the type declaration files generated by the above two plugins are include by `typescript`,
which can be configured as follows in `tsconfig.json`:

````json
// playground-ignore
{
  "include": ["auto-imports.d.ts", "components.d.ts"]
}
````

### Manual import

Each component is a `Vue plugin` and consists of `component logic` and `style files`, which are manually imported and used as follows.

````js
// playground-ignore
import { createApp } from 'vue'
import { Button } from '@varlet/ui'
import '@varlet/ui/es/button/style/index'

createApp().use(Button)
````

OR

```html
// playground-ignore
<script setup>
import { Button as VarButton } from '@varlet/ui'
import '@varlet/ui/es/button/style/index'
</script>

<template>
  <var-button>Say Hello</var-button>
</template>
````

### Manual import and automatic import comparison

Manual import

```html
// playground-ignore
<script setup>
import { Button as VarButton, Snackbar } from '@varlet/ui'
import '@varlet/ui/es/button/style/index'
import '@varlet/ui/es/snackbar/style/index'

function handleClick() {
  Snackbar('Hello!')
}
</script>

<template>
  <var-button @click="handleClick">Say Hello</var-button>
</template>
````

Automatic import

```html
// playground-ignore
<script setup>
function handleClick() {
  Snackbar('Hello!')
}
</script>

<template>
  <var-button @click="handleClick">Say Hello</var-button>
</template>
````

### File path note

In `@varlet/ui@2.7.0` and later versions, we recommend using the following file import method with omitting the suffix to be compatible with `js` and `mjs`

```js
// playground-ignore
import '@varlet/ui/es/style'
```