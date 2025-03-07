import { MakerDeb } from '@electron-forge/maker-deb'
import { MakerRpm } from '@electron-forge/maker-rpm'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { MakerZIP } from '@electron-forge/maker-zip'
import { FusesPlugin } from '@electron-forge/plugin-fuses'
import { VitePlugin } from '@electron-forge/plugin-vite'
import type { ForgeConfig } from '@electron-forge/shared-types'
import { FuseOptions, FuseVersion } from '@electron/fuses'

const config: ForgeConfig = {
  packagerConfig: {
    asar: true
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({})
  ],
  plugins: [
    new VitePlugin({
      build: [
        {
          config: 'vite.main.config.ts',
          entry: 'src/main.ts',
          target: 'main'
        },
        {
          config: 'vite.preload.config.ts',
          entry: 'src/preload.ts',
          target: 'preload'
        }
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts'
        }
      ]
    }),

    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseOptions.RunAsNode]: false,
      [FuseOptions.EnableCookieEncryption]: true,
      [FuseOptions.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseOptions.EnableNodeCliInspectArguments]: false,
      [FuseOptions.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseOptions.OnlyLoadAppFromAsar]: true
    })
  ]
}

export default config

