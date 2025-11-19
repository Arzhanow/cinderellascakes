const assetManifest = [
  { type: 'image', src: '/images/cakes/garash/20250128_150003.jpg' },
  { type: 'image', src: '/images/cakes/chococake/20250128_145732.jpg' },
  { type: 'model', src: '/models/garash.glb' },
  { type: 'model', src: '/models/chococake.glb' },
  { type: 'model', src: '/models/cinderella3D.glb' },
]

const preloadImage = (src) =>
  new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }
    const image = new Image()
    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = src
  })

const preloadBinary = (src) =>
  typeof window === 'undefined'
    ? Promise.resolve()
    : fetch(src, { cache: 'force-cache' }).then(
        () => {},
        () => {},
      )

export const preloadInitialAssets = () =>
  Promise.all(
    assetManifest.map((asset) =>
      asset.type === 'image' ? preloadImage(asset.src) : preloadBinary(asset.src),
    ),
  )

export const initialAssetManifest = assetManifest
