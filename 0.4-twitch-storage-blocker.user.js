// ==UserScript==
// @name         Twitch Storage Blocker (Strong Version + Cache Block)
// @version      0.4
// @namespace   https://github.com/coolmohawkdood
// @homepageURL https://github.com/coolmohawkdood/twitch.tv-storage-blocker
// @downloadURL https://github.com/coolmohawkdood/twitch.tv-storage-blocker/raw/main/Twitch-Storage-blocker.user.js
// @updateURL   https://github.com/coolmohawkdood/twitch.tv-storage-blocker/raw/main/Twitch-Storage-blocker.user.js
// @match       *://*.twitch.tv/*
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';

    // Wipe existing LocalStorage immediately
    try { window.localStorage.clear(); } catch(e) {}

    // Override Storage prototype to block all writes
    const noop = () => {};
    const fakeGet = () => null;

    const blockProps = {
        getItem: { value: fakeGet },
        setItem: { value: noop },
        removeItem: { value: noop },
        clear: { value: noop },
        key: { value: () => null },
        length: { value: 0 }
    };

    Object.defineProperties(Storage.prototype, blockProps);

    // Block IndexedDB
    window.indexedDB = new Proxy(window.indexedDB, {
        get(target, prop) {
            if (prop === 'open' || prop === 'deleteDatabase') {
                return () => {
                    console.warn('IndexedDB blocked:', prop);
                    return { onerror: null, onsuccess: null };
                };
            }
            return target[prop];
        }
    });

    // ⭐ Block Cache API
    Object.defineProperty(window, 'caches', {
        value: {
            open: () => Promise.resolve({
                match: () => Promise.resolve(undefined),
                put: () => Promise.resolve(undefined),
                delete: () => Promise.resolve(false),
                keys: () => Promise.resolve([]),
            }),
            match: () => Promise.resolve(undefined),
            has: () => Promise.resolve(false),
            delete: () => Promise.resolve(false),
            keys: () => Promise.resolve([]),
        },
        writable: false,
        configurable: false
    });

})();
