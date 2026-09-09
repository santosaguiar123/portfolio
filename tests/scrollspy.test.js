import assert from 'node:assert/strict';
import { test } from 'node:test';
import { initScrollspy } from '../src/scripts/scrollspy.js';

for (const height of [900, 812]) {
  test(`scrollspy: viewport height ${height}`, () => {
    const ids = ['home', 'sobre', 'skills', 'projetos', 'contato'];
    const listeners = {};
    const frames = [];
    let observerCallback;
    const win = {
      innerHeight: height, scrollY: 0,
      addEventListener(type, callback) { listeners[type] = callback; },
      requestAnimationFrame(callback) { frames.push(callback); },
    };
    const sections = ids.map((id, index) => ({
      id, getBoundingClientRect: () => ({ top: index * 1000 - win.scrollY }),
    }));
    const links = ids.map(id => {
      const attributes = new Map([['href', `#${id}`]]);
      return {
        active: false,
        classList: { toggle(_, value) { links[ids.indexOf(id)].active = value; } },
        getAttribute: name => attributes.get(name),
        setAttribute: (name, value) => attributes.set(name, value),
        removeAttribute: name => attributes.delete(name),
      };
    });
    const original = { window: globalThis.window, document: globalThis.document, IntersectionObserver: globalThis.IntersectionObserver };
    try {
      globalThis.window = win;
      globalThis.document = {
        documentElement: { scrollHeight: 5200 },
        querySelectorAll: selector => selector === 'header[id], section[id]' ? sections : links,
      };
      const observed = [];
      globalThis.IntersectionObserver = class {
        constructor(callback, options) {
          observerCallback = callback;
          assert.equal(options.rootMargin, '-40% 0px -55% 0px');
        }
        observe(section) { observed.push(section); }
      };
      const check = id => {
        assert.deepEqual(links.filter(link => link.active), [links[ids.indexOf(id)]]);
        links.forEach(link => assert.equal(link.getAttribute('aria-current'), link.active ? 'true' : undefined));
      };
      const flush = () => { while (frames.length) frames.shift()(); };
      initScrollspy(); check('home');
      assert.deepEqual(observed, sections);
      for (const y of [1000, 2000, 3000, 4000, 3000, 2000, 1000, 0]) {
        win.scrollY = y;
        listeners.scroll(); listeners.scroll();
        assert.equal(frames.length, 1, 'scroll events share one animation frame');
        flush(); check(ids[y / 1000]);
      }
      win.scrollY = 5200 - height - 2;
      listeners.scroll(); flush(); check('contato');
      observerCallback([{ target: sections[2], isIntersecting: true }]);
      check('contato');
      win.scrollY = 0; observerCallback([]); check('home');
      for (const id of ['skills', 'projetos']) {
        win.scrollY = ids.indexOf(id) * 1000 - 72;
        initScrollspy(); check(id);
      }
      win.scrollY = 0;
      for (const event of ['hashchange', 'resize', 'load', 'pageshow']) {
        listeners[event](); flush(); check('home');
      }
    } finally {
      for (const [key, value] of Object.entries(original)) {
        if (value === undefined) delete globalThis[key]; else globalThis[key] = value;
      }
    }
  });
}
