# Hero Canvas & 3D Model Notes

Practical fixes that have already worked for the `HeroModel` canvas and the Garash (`garash.glb`) asset. Use these as a quick reference before tweaking values again.

## 1. Canvas too low on mobile

**Symptom:** The Garash plate is clipped at the bottom of small screens because the `<Canvas>` stays vertically centered.

**Fix:** Detect the current viewport with `useViewportCategory()` and apply a negative translate on the `<Canvas>` only for the mobile breakpoint.

```jsx
const isMobileViewport = viewport === 'mobile'

<Canvas
  className={`absolute inset-0 transform transition-transform duration-500 ${
    isMobileViewport ? '-translate-y-24' : ''
  }`}
  ...
/>
```

The transition keeps desktop ↔ mobile resizes smooth and prevents an abrupt jump.

## 2. Model clipped inside the frame

**Symptom:** Even after lifting the canvas, the dessert still leaves the viewport.

**Fix:** Shrink and lower the Garash model only for mobile, keeping the camera pointed at its new center. The current values live in `heroDesserts[0].modelSettings.responsive.mobile` (see `src/pages/Home.jsx`).

```js
mobile: {
  cameraPosition: [2.55, 2.65, 1.35],
  modelScale: 0.44,
  modelYOffset: -2.5,
  orbitTarget: [0, -2.5, 0],
  fov: 36,
},
```

Adjust `modelYOffset` and `orbitTarget` together so the OrbitControls look at the dessert’s center; otherwise tilting feels off.

## 3. Canvas wrapper needs more room

**Symptom:** The plate looks cramped or overlaps the (now removed) hero controls.

**Fix:** Expand or shrink the `HeroModel` wrapper via its responsive clamp sizes (see `HeroModel` usage inside `Home.jsx`). The current generous setup:

```jsx
className="... h-[clamp(310px,80vw,460px)] w-[clamp(310px,80vw,460px)]
sm:h-[clamp(340px,72vw,500px)] sm:w-[clamp(340px,72vw,500px)]
md:h-[460px] md:w-[460px] lg:h-[560px] lg:w-[560px] xl:h-[640px] xl:w-[640px]
2xl:h-[740px] 2xl:w-[740px] 3xl:h-[780px] 3xl:w-[780px] 4xl:h-[840px] 4xl:w-[840px]"
```

Dial the clamps down to the previous values (`clamp(220px,55vw,340px)` etc.) if the slider navigation needs more vertical room.

## 4. Slider navigation hidden again (legacy)

**Symptom:** (Legacy) Enlarging the wrapper pushes the dot navigation off-screen on phones. The hero now auto-swaps desserts on rotation, so manual controls are no longer rendered, but keep this note for context.

## 5. Aligning the dessert “front” across swaps

**Symptom:** Each GLB ships with a different forward axis, so the visible “front” jumps when the dessert changes at 180°.

**Fix:** Every hero dessert can now provide `modelOrientationDeg` inside `modelSettings`. The `HeroModel` converts that degree value to radians and pre-rotates the GLTF scene before the continuous rotation kicks in, so all cakes share the same zero-degree heading.

To capture the correct degree value for a dessert:

1. Run the site locally in dev mode.
2. When a cake is facing the camera the way you want, press **Shift + O** (dev-only shortcut added in `Home.jsx`). The console will print `normalizedDegrees`.
3. Use the negative of that number (`-normalizedDegrees`) as `modelOrientationDeg` for that dessert, optionally overriding it per viewport via `responsive`.

With this calibration, the dessert swap at every half rotation looks seamless and the animation never restarts.

Need a head-start before launching dev? Run the CLI helper to inspect any GLB and print the recommended value:

```bash
npm run measure:dessert -- public/models/garash.glb public/models/chococake.glb
```

It scans vertex positions, finds the longest radial vector (the “slice tip”), and suggests the `modelOrientationDeg` that aims that vector toward the camera.

## 6. Shared pivot for smooth rotation

**Symptom:** Even with matching headings, cakes with off-center origins wobble or “orbit” when rotating, creating a visible jump on swap.

**Fix:** `HeroModel` now recenters every GLB at runtime using a `Box3` bounding box. The dessert mesh is shifted by the negative center before being attached to the rotating group, so rotation always happens around the dessert’s centroid (roughly the plate center). This mirrors the Blender workflow of “Origin to Geometry + Apply Transforms”, but is handled automatically in code. No authoring changes are required—just export the slice, drop it in `/public/models`, set `modelOrientationDeg`, and the shared pivot keeps transitions clean.

---

Use these snippets as a checklist when the Garash hero needs another round of visual polish.


