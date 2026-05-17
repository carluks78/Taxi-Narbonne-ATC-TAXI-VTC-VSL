import type { Config } from '@react-router/dev/config'

export default {
  ssr: true,
  appDirectory: 'src/app',

  async prerender() {
    return [
      '/',
      '/services',
      '/contact',
      '/zones-desservies',
      '/avis-clients',
      '/taxi-narbonne',
      '/taxi-gare-narbonne',
      '/taxi-aeroport-montpellier',
      '/taxi-aeroport-toulouse',
      '/taxi-aeroport-carcassonne',
      '/taxi-aeroport-beziers',
      '/taxi-aeroport-barcelone',
      '/taxi-gruissan',
      '/taxi-leucate',
      '/taxi-sigean',
      '/taxi-port-la-nouvelle',
      '/taxi-narbonne-plage',
      '/taxi-peyriac-de-mer',
      '/taxi-bages',
      '/taxi-carcassonne',
      '/taxi-beziers-cap-dagde',
      '/taxi-narbonne-barcelone',
      '/taxi-coursan',
      '/taxi-vsl-narbonne',
      '/taxi-reserve-africaine-sigean',
      '/taxi-argeliers',
      '/taxi-ginestas',
      '/taxi-bize-minervois',
      '/taxi-cuxac-daude',
      '/taxi-vinassan',
      '/taxi-armissan',
      '/taxi-le-somail',
    ]
  },
} satisfies Config
