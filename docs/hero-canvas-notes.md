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

**Fix:** Shrink and lower the Garash model only for mobile, keeping the camera pointed at its new center. The current values live in `heroSlides[0].modelSettings.responsive.mobile` (see `src/pages/Home.jsx`).

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

**Symptom:** The plate looks cramped or overlaps the slider controls.

**Fix:** Expand or shrink the `HeroModel` wrapper via its responsive clamp sizes (see `HeroModel` usage inside `Home.jsx`). The current generous setup:

```jsx
className="... h-[clamp(310px,80vw,460px)] w-[clamp(310px,80vw,460px)]
sm:h-[clamp(340px,72vw,500px)] sm:w-[clamp(340px,72vw,500px)]
md:h-[460px] md:w-[460px] lg:h-[560px] lg:w-[560px] xl:h-[640px] xl:w-[640px]
2xl:h-[740px] 2xl:w-[740px] 3xl:h-[780px] 3xl:w-[780px] 4xl:h-[840px] 4xl:w-[840px]"
```

Dial the clamps down to the previous values (`clamp(220px,55vw,340px)` etc.) if the slider navigation needs more vertical room.

## 4. Slider navigation hidden again

**Symptom:** Enlarging the wrapper pushes the dot navigation off-screen on phones.

**Fix:** Either revert the wrapper clamps (see §3) or trim the bottom padding on the hero layout shell (`py-12 pb-[18rem]` → a smaller value). In practice it was faster to shrink the wrapper when that happened.

---

Use these snippets as a checklist when the Garash hero needs another round of visual polish.
