# Twitch Storage Blocker

Blocks all Twitch client-side storage (LocalStorage, IndexedDB, Cache API) to prevent tracking, caching, and persistent data.

## Installation

1. Install a userscript manager:
   - Tampermonkey (Chrome, Edge, Firefox)
   - Violentmonkey (Chrome, Firefox)
   - Greasemonkey (Firefox)

2. Click the “Raw” button on the `.user.js` file in this repository.

3. Your userscript manager will prompt you to install the script.

## What It Blocks

- LocalStorage (cleared and disabled)
- IndexedDB (blocked from opening or deleting databases)
- Cache API (replaced with a no-op implementation)
- Persistent Twitch data
- Tracking identifiers
- Client-side caching

## What Might Break

Because Twitch relies heavily on client-side storage, some features may behave unexpectedly:

- Login persistence
- Chat history
- Recommendations
- Video caching
- Experiments / A/B tests
- Some UI elements that expect stored state

## Why This Exists

Twitch stores large amounts of client-side data for tracking, caching, and user profiling.  
This script forces Twitch into a stateless mode for privacy, testing, or minimalism.

## License
This project is licensed under the MIT License.

This project is licensed under the MIT License.
