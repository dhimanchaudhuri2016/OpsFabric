# Ops Fabric — three immersive experiences

## 1. Network atlas

Twelve city-level exchange locations are transcribed from BT's public peering request page, checked 3 November 2026: London, Paris, Frankfurt, Amsterdam, Helsinki, Stockholm, New York, Hong Kong, Singapore, Sydney, Tokyo and Johannesburg. Coordinates are city centres, not facility addresses. Animated links are illustrative and can be toggled off. This is not live telemetry.

The customer-context layer cites BT's public 31 March 2022 DHL announcement, which describes a transformation spanning 27 European countries. The 16 branch points and all connections shown in that layer are explicitly fictional. No private customer endpoints, circuit paths or vulnerability data have been collected or inferred.

Sources:
- https://www.bt.net/cgi-bin/peering-request
- https://newsroom.bt.com/bt-chosen-by-deutsche-post-dhl-group-in-drive-to-digitalise-global-logistics/

## 2. Resilience arena

Original Three.js browser game, loaded on demand. A fragmented network erodes simulated service integrity; the player then equips the Ops Fabric resilience emitter. Earlier threat visibility, assisted targeting, interception, repair interpolation and a recovery screen tell the resilience story. Mouse/keyboard, touch controls, pause, full screen, replay and guided mode are supported.

The gun and threat destruction are metaphors. They do not demonstrate automatic elimination of actual vulnerabilities or guarantee product security performance. All threat labels, scores and integrity readings are simulated. This is not a native console title and no headset/WebXR build or headset validation is claimed.

## 3. Incident command

A scripted four-stage case: observe, diagnose, assist and validate. It shows technical evidence alongside an AI-assisted customer-language update with an explicit draft/review state. It does not inspect a network, invoke a live model, execute a change or send a message.

## Reference implementation research

map.kmcd.dev exposes layer controls, historical data and source attribution, using Leaflet/globe UI patterns. Its public sources include TeleGeography and PeeringDB. We used the layer-and-provenance approach, not its datasets as BT customer evidence.

Immersive Garden's public HeroBlock and HomePage scripts expose timelines, eased animation and scroll/cursor interpolation. These informed transitions and cinematic pacing. Its proprietary media, models, shaders, project assets and source code are not bundled here. The arena geometry, effects, gameplay and UI are original.

## PDF content coverage

The PDF's public-facing narrative is retained in a shorter hierarchy: digital resilience and platform strategy; four capability perspectives; five outcome themes; foundation/adoption/prove/expand; capability expansion; benefit measurement; security evolution; underlay/overlay context; tool consolidation; evidence-led Gen AI and governed autonomy. The ten-theme catalogue and published web KPIs remain accessible.

Customer-by-customer adoption tables, named account rollout plans, internal efficiencies and commercial penalty information are not reproduced on the public site. The original internal PDF remains the source reference. Its roadmap dates are planning data; the public page retains uncommitted roadmap directions pending approved customer-facing dates. This is theme-preserving editorial adaptation, not verbatim publication of every internal datum.

## Build

Run npm ci, then npm run build. Deploy the entire dist directory, including chunks and arena.js. The game is dynamically imported; Three.js code is shared between entry points. Keep those relative paths intact for GitHub Pages.
