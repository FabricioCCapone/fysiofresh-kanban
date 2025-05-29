import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
  },
  defaults: {
    VBtn: {
      color: 'black',
      variant: 'outlined',
      class: 'mb-1'
    }
  }
})

createApp(App).use(vuetify).mount('#app')
