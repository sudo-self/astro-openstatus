globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate } from './astro_PwN0r0dF.mjs';
import './kleur_DHimoS-P.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$ThemeScript = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<script>\n"use strict";(()=>{(()=>{let t="theme-toggle";function o(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function l(){let e=localStorage.getItem(t);return e==="dark"||e==="light"?e:null}function n(){return l()||o()}function c(e){e===o()?localStorage.removeItem(t):localStorage.setItem(t,e)}function s(e){let m=document.documentElement;m.classList.toggle("dark",e==="dark"),m.style.colorScheme=e}function r(e){c(e),s(e)}r(n()),window.astroThemeToggle={setTheme:r,getTheme:n}})();})();\n<\/script>'])));
}, "/Users/jessejesse/Downloads/astro-status-page-main-2/node_modules/astro-theme-toggle/lib/theme-script.astro", void 0);

export { $$ThemeScript as $ };
