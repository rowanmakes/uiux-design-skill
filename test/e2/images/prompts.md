# E2 generated photographic assets

## Run record

- Generation tool: built-in `image_gen`; actual raster PNGs were written under `C:/Users/12296/.codex/generated_images/01a15f4b-be7a-78b1-9fea-5e91b442060f/`.
- Model: the built-in tool does not expose a model identifier. This is recorded rather than inferred.
- Start: 2026-10-21T09:30:26-07:00. Last raster: 2026-10-21T09:41:19-07:00. Generation duration: 10m 53s; export/visual QA followed.
- Export: each raw raster was 1672x941 PNG and was center-cropped to 1664x936 (16:9) WebP with FFmpeg `libwebp`, q=72. All web files are below 600000 bytes; `manifest.json` records bytes, hashes, and raw provenance filenames. No raw originals are committed.
- QA: viewed all 15 WebP exports. No text, logo, watermark, or identifiable face was observed. The faint shape in A/story/02’s lit window reads as roastery equipment, not a person.

## Candidate selection

| Scene | Candidate | Light source | Atmosphere | quiet title-safe third | clean-frame assessment | decision |
| --- | --- | --- | --- | --- | --- | --- |
| A | hero-01 | one amber window, unambiguous | layered fog and predawn ridges | excellent dark left | one window, no competing light | selected |
| A | hero-02 | one amber window | dense valley fog | good but lower-left foliage is busier | clean, though less spare | retained, not selected |
| B | hero-01 | internal drum fire | smoke and faint sparks | good dark left | fire and bean spill are more forceful | retained, not selected |
| B | hero-02 | internal drum fire | sparse smoke, restrained ember | excellent dark upper-left | single controlled aperture | selected |
| C | hero-01 | explicit low sun | amber mist through foliage | dark but leaf-heavy at left | good, but less title-safe | retained, not selected |
| C | hero-02 | explicit low sun at right | amber haze and wet green foliage | excellent continuous shadow left | simple ridge/sun hierarchy | selected |

## Exact generation prompts

### A/candidates/hero-01.webp

```text
Use case: photorealistic-natural
Asset type: 16:9 website hero candidate for the fictional Chengdu specialty coffee roastery 半山烘焙 (Banshan Roastery), subscription-only, light/medium roast.
Primary request: a cinematic, imaginative photographic scene of layered mountains near Chengdu at deep night immediately before dawn; fog resting between broad ridgelines; a single tiny distant warm roastery window embedded low on one ridge, visibly the only warm light source.
Scene/backdrop: remote Sichuan mountain ridges, no identifiable landmark, dense blue-black predawn sky and valley fog.
Subject: landscape and one pinprick roastery window only, no people.
Style/medium: exceptional analog cinematic landscape photograph, subtle film grain, natural optical depth.
Composition/framing: true 16:9 wide landscape; preserve the left third as calm near-black foggy negative space for a hero title; ridges grow toward the right; one small window far right/lower third.
Lighting/mood: identifiable single warm tungsten window against cool cobalt predawn ambient; low-key, hushed, breathable air.
Color palette: muted midnight indigo, charcoal blue, faint warm amber only at the window.
Constraints: no text, no logo, no watermark, no typography, no signs, no recognizable faces, no dramatic sun, no city lights, no extra buildings, no collage, no illustration.
```

### A/candidates/hero-02.webp

```text
Use case: photorealistic-natural
Asset type: 16:9 website hero candidate for the fictional Chengdu specialty coffee roastery 半山烘焙 (Banshan Roastery), subscription-only, light/medium roast.
Primary request: an alternate cinematic, imaginative photographic scene of layered mountains near Chengdu at deep night before dawn, thick fog flowing in a valley; a single small warm roastery window distant on a slope, with its glow caught weakly in the mist.
Scene/backdrop: remote Sichuan mountain terrain, no landmark, no road, no city.
Subject: quiet mountains and fog, no people.
Style/medium: refined analog cinema still, restrained natural film grain, believable photography.
Composition/framing: true wide 16:9 landscape; preserve a quiet dark upper-left third with only subtle mist for hero title, keep the tiny window isolated in the far lower-right quadrant.
Lighting/mood: one legible warm tungsten window as the dominant source against a cold nearly-black pre-dawn blue; gentle atmospheric haze, not fantasy.
Color palette: blue-black, smoky slate, desaturated forest green, one pinhead of amber.
Constraints: no text, logo, watermark, sign, typography, faces, vehicles, city lights, extra lit windows, moon, stars, visible sun, or graphic effects.
```

### B/candidates/hero-01.webp

```text
Use case: photorealistic-natural
Asset type: 16:9 website hero candidate for fictional Chengdu specialty coffee roastery 半山烘焙 (Banshan Roastery), subscription-only, light/medium roast.
Primary request: cinematic midnight inside a small coffee roastery: the round mouth of a drum roaster dominates the right half, a controlled orange fire glow from within, a few coffee beans tumbling at the lip, sparse sparks and blue-grey smoke rising.
Scene/backdrop: authentic dark roastery interior, minimal machinery visible, no branding.
Subject: drum mouth, fire, beans; no people.
Style/medium: high-end practical-light cinema still, analog film texture, photorealistic.
Composition/framing: true wide 16:9; substantial uncluttered charcoal-black negative field in the left third for hero title; drum mouth contained on the right, one strong circular form.
Lighting/mood: clearly identifiable fire inside the drum is the only key light, weak reflected copper on steel, smoke carries the glow.
Color palette: soot black, deep umber, burnt amber, muted steel blue.
Constraints: no text, logo, watermark, labels, signs, faces, hands, dramatic flames outside the drum, excessive sparks, neon, collage, illustration.
```

### B/candidates/hero-02.webp

```text
Use case: photorealistic-natural
Asset type: alternate 16:9 website hero candidate for fictional Chengdu specialty coffee roastery 半山烘焙 (Banshan Roastery), subscription-only, light/medium roast.
Primary request: a low, cinematic midnight close-wide photograph of a coffee roasting drum mouth and its restrained glowing fire, viewed slightly obliquely; a few dark beans caught in motion at the edge, faint smoke sheet and four or five tiny sparks.
Scene/backdrop: sparse industrial roastery darkness, no branding and no humans.
Subject: the recessed fire-lit drum opening, no other visual competitor.
Style/medium: tactile 35mm cinema photograph, realistic metal and roasted-bean texture, delicate grain.
Composition/framing: true 16:9; leave the upper-left third empty and nearly black for hero title; place the warm aperture in the lower-right third with generous dark surrounding space.
Lighting/mood: the internal roaster fire is the unmistakable source; warm light diffuses only through smoke and catches the nearest beans.
Color palette: black-brown, smoke grey, restrained ember orange, dull brass.
Constraints: no text, letters, logo, watermark, package, signage, face, person, hand, bright room lights, huge flames, dense sparks, CGI appearance, illustration.
```

### C/candidates/hero-01.webp

```text
Use case: photorealistic-natural
Asset type: 16:9 website hero candidate for fictional Chengdu specialty coffee roastery 半山烘焙 (Banshan Roastery), subscription-only, light/medium roast.
Primary request: a cinematic imaginative photograph of a coffee-origin hillside at sunset, looking across dark green coffee plants in the foreground toward an amber backlit ridge; one distant worker-free processing shelter only as a tiny unbranded silhouette.
Scene/backdrop: highland coffee origin, authentic agricultural hillside, no tourist cues.
Subject: coffee foliage and the slope, no people.
Style/medium: restrained 35mm cinema still, natural deep shadow and subtle grain, not travel advertising.
Composition/framing: true 16:9; keep the left third dark and visually quiet with layered leaves/shadow for hero title; sun flare is held near the far right horizon.
Lighting/mood: identifiable low setting sun behind the ridge, warm rim light through leaves and visible humid haze.
Color palette: very dark forest green, olive shadow, smoke-black, muted amber-orange.
Constraints: no text, logo, watermark, label, face, people, vehicles, product packaging, dramatic giant sun, excessive lens flare, postcard styling, collage, illustration.
```

### C/candidates/hero-02.webp

```text
Use case: photorealistic-natural
Asset type: alternate 16:9 website hero candidate for fictional Chengdu specialty coffee roastery 半山烘焙 (Banshan Roastery), subscription-only, light/medium roast.
Primary request: a dark green coffee-origin hillside late at sunset, cinematic and intimate: foreground coffee branches in silhouette, an amber low sun partly hidden by a far hill, broad valley humidity glowing softly; no people.
Scene/backdrop: quiet coffee farm at origin, no identifying place or branding.
Subject: coffee plants, sloping terrain, backlit air.
Style/medium: authentic editorial film photograph, subtle texture and grain, tonal restraint.
Composition/framing: true 16:9 landscape with the left third kept almost black and uncluttered for hero title; leaves sweep from lower right; horizon and small sun sit right of center.
Lighting/mood: one clearly recognizable setting sun creates warm edge light and amber mist, while shadows remain deep evergreen.
Color palette: charcoal green, moss, blackened brown, honeyed amber; no bright blue sky.
Constraints: no text, logo, watermark, signage, face, people, buildings prominent in frame, bags, cups, vehicles, overdone flare, fantasy, illustration.
```

### A/story/01.webp (reference: A/candidates/hero-01.webp)

```text
Use case: photorealistic-natural
Asset type: 16:9 story still 01 for a fictional Chengdu specialty coffee roastery website.
Input images: Image 1 is the selected mountain hero reference; preserve its cool blue-black predawn palette, right-side amber window logic, restrained film grain, and cinematic atmospheric depth.
Primary request: a wider distant establishing view of fog-filled mountain ridges before dawn, with the same tiny lone warm roastery window even farther away on the right hillside.
Composition/framing: true 16:9, quiet dark left third, broad layers of fog and ridges.
Lighting/mood: one tiny warm window only; cool pre-dawn ambient and gently moving fog.
Constraints: no text, no logo, no watermark, no people, no extra lit windows, no city, no vehicles, no signs, no identifiable landmarks.
```

### A/story/02.webp (reference: A/candidates/hero-01.webp)

```text
Use case: photorealistic-natural
Asset type: 16:9 story still 02 for a fictional Chengdu specialty coffee roastery website.
Input images: Image 1 is style reference; preserve its blue-black predawn, amber-window-only light direction, fog, and fine analog grain.
Primary request: medium exterior view of a small unbranded roastery perched among wet dark pines on a Sichuan mountain slope, its one modest rectangular window glowing warm through drifting fog.
Composition/framing: true 16:9, restrained modern cinematic composition, building modest and placed right of center, ample dark breathing room left.
Lighting/mood: the single interior tungsten window is the clear warm source; no other lights.
Constraints: no text, logo, watermark, people, faces, signs, vehicles, extra windows lit, cityscape, moon, stars, illustration.
```

### A/story/03.webp (reference: A/candidates/hero-01.webp)

```text
Use case: photorealistic-natural
Asset type: 16:9 story still 03 for a fictional Chengdu specialty coffee roastery website.
Input images: Image 1 is style reference; preserve cool blue-black predawn shadows, a single small warm source, fog-softened air, and understated analog grain.
Primary request: intimate still life inside the same mountain roastery: a plain unbranded kraft coffee bean bag beside a simple dark ceramic cup with a thread of steam, lit only by a distant warm window; the outside fog is barely visible beyond.
Composition/framing: true 16:9, low-key, simple arrangement, large quiet shadow field on left.
Lighting/mood: one warm window source on the right creates a subtle rim and steam glow; no bright room lighting.
Constraints: no text, no logo, no watermark, no labels, no people, no face, no hands, no signage, no typography, no fancy packaging, no illustration.
```

### B/story/01.webp (reference: B/candidates/hero-02.webp)

```text
Use case: photorealistic-natural
Asset type: 16:9 story still 01 for a fictional Chengdu specialty coffee roastery website.
Input images: Image 1 is style reference; preserve its midnight soot-black palette, restrained amber fire source from the right, sparse smoke, and analog grain.
Primary request: distant quiet exterior of a small unbranded roastery building at midnight, seen through a dark industrial courtyard; the only visible glow comes from one round roaster vent or tiny high window, a faint smoke plume enters the night.
Composition/framing: true 16:9, large empty near-black left field, building far right and modest.
Lighting/mood: one precise internal amber fire glow; no streetlights, no stars.
Constraints: no text, logo, watermark, people, faces, vehicles, signs, extra light sources, city, dramatic flames, illustration.
```

### B/story/02.webp (reference: B/candidates/hero-02.webp)

```text
Use case: photorealistic-natural
Asset type: 16:9 story still 02 for a fictional Chengdu specialty coffee roastery website.
Input images: Image 1 is style reference; preserve the fire-from-right lighting direction, black-brown shadows, sparse smoke, and 35mm texture.
Primary request: medium cinematic view of the front half of an authentic drum roaster at midnight, a restrained oval mouth and a few coffee beans moving through smoke, no people.
Composition/framing: true 16:9, clean dark space on left, roaster right of center, less spectacle than the hero.
Lighting/mood: one internal amber fire is visibly the only source and traces the machine's metal edge.
Constraints: no text, logo, watermark, labels, packaging, faces, hands, signs, extra room lights, huge flames, dense sparks, CGI, illustration.
```

### B/story/03.webp (reference: B/candidates/hero-02.webp)

```text
Use case: photorealistic-natural
Asset type: 16:9 story still 03 for a fictional Chengdu specialty coffee roastery website.
Input images: Image 1 is style reference; preserve the single ember source from the right, deep charcoal negative field, sparse smoky atmosphere, and subtle film grain.
Primary request: close, quiet detail of freshly roasted coffee beans resting beside a plain unlabeled kraft bean bag and a small dark cup, with a thin ribbon of steam crossing the frame; only the off-frame roaster fire warms their edges.
Composition/framing: true 16:9, sparse, object grouping in lower-right, abundant near-black left field.
Lighting/mood: one external amber fire glow from the right, gentle smoke/steam; no other light.
Constraints: no text, no logo, no watermark, no labels, no people, no faces, no hands, no signage, no bright flame in view, no product advertising styling, no illustration.
```

### C/story/01.webp (reference: C/candidates/hero-02.webp)

```text
Use case: photorealistic-natural
Asset type: 16:9 story still 01 for a fictional Chengdu specialty coffee roastery website.
Input images: Image 1 is style reference; preserve its dark evergreen and amber sunset palette, right-side low sun, misty backlight, and gentle analog grain.
Primary request: a wider distant coffee-origin landscape at sunset, terraced coffee hillside stepping into a humid valley, low amber sun near the far-right ridge, no people.
Composition/framing: true 16:9, quiet deeply shadowed left third for title, open layered valley on the right.
Lighting/mood: one visible setting sun backlights mist and leaf edges; slow, restrained cinematic air.
Constraints: no text, no logo, no watermark, no signs, no faces, no people, no vehicles, no buildings prominent, no bags, no cups, no postcard saturation, no illustration.
```

### C/story/02.webp (reference: C/candidates/hero-02.webp)

```text
Use case: photorealistic-natural
Asset type: 16:9 story still 02 for a fictional Chengdu specialty coffee roastery website.
Input images: Image 1 is style reference; preserve dark green/amber backlight, sun position to the right, mist, and cinematic film grain.
Primary request: medium view at a coffee origin processing patio on a hillside at dusk, unbranded raised drying beds and coffee cherries in soft silhouette, no people, backlit by the low right-side sunset.
Composition/framing: true 16:9, strong quiet shadow field on left, processing detail kept sparse and right of center.
Lighting/mood: the setting sun is one legible source, amber edge light through humid air.
Constraints: no text, no logo, no watermark, no bags, no labels, no people, faces, hands, vehicles, signs, buildings dominant, modern machinery, illustration.
```

### C/story/03.webp (reference: C/candidates/hero-02.webp)

```text
Use case: photorealistic-natural
Asset type: 16:9 story still 03 for a fictional Chengdu specialty coffee roastery website.
Input images: Image 1 is style reference; preserve low amber sunset backlight from the right, dark wet green shadows, atmospheric haze, and subtle analog film grain.
Primary request: close quiet detail at a coffee origin: ripe coffee cherries and beans near a plain unbranded kraft coffee bag with a small dark cup, all on a rough wooden drying table at dusk, no humans.
Composition/framing: true 16:9, minimal object grouping on lower-right, a dark uncluttered left field.
Lighting/mood: one low setting sun off-frame right puts thin amber edges on cherries and a trace of steam from the cup.
Constraints: no text, no logo, no watermark, no labels, no people, no face, no hands, no signs, no packaging graphics, no commercial product shot, no illustration.
```

## Continuity notes

- A holds a cool blue-black predawn world, one amber window on the right, and fog as the shared air medium from distant ridges through the interior still life.
- B retains a right-side ember source, soot-black negative field, sparse smoke, and muted copper edges from exterior to drum to bean-bag detail.
- C retains a right-side setting sun, dark evergreen foreground, amber humid haze, and modest film grain from hillside to drying beds to origin-table detail.
