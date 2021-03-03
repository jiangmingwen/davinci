/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const CracoAntDesignPlugin = require('craco-antd')
const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [{
      plugin: CracoAntDesignPlugin,

      options: {
        customizeTheme: {
          '@primary-color': '#0567b3',
          '@success-color': '#52c41a',
          '@error-color': '#ff4d4f',
          '@warn-color': '#faad14'
        }
      }
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.extend.json'
      }
    }
  ]
}
