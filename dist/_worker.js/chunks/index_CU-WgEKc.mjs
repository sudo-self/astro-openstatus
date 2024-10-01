globalThis.process ??= {}; globalThis.process.env ??= {};
import './@astrojs_IW2I2YRe.mjs';
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, e as renderComponent, f as createAstro, g as addAttribute, h as renderHead } from './astro_PwN0r0dF.mjs';
import './kleur_DHimoS-P.mjs';
import { z } from './zod_bXLWpUgz.mjs';
import { j as jsxRuntimeExports } from './react_BatLIxD_.mjs';
import { $ as $cef8881cdc69808e$export$be92b6f5f03c0fe9, a as $cef8881cdc69808e$export$41fb9f06171c75f4, b as $cef8881cdc69808e$export$602eac185826482c, c as $cef8881cdc69808e$export$7c6e2c02157bb7d2 } from './@radix-ui_C6DL7Zng.mjs';
/* empty css                         */
import { $ as $$ThemeScript } from './astro-theme-toggle_C4C1vMjY.mjs';

const monitorPeriodicity = [
  "30s",
  "1m",
  "5m",
  "10m",
  "30m",
  "1h",
  "other"
];
const periodicityEnum = z.enum(monitorPeriodicity);
const flyRegions = [
  "ams",
  "arn",
  "atl",
  "bog",
  "bom",
  "bos",
  "cdg",
  "den",
  "dfw",
  "ewr",
  "eze",
  "fra",
  "gdl",
  "gig",
  "gru",
  "hkg",
  "iad",
  "jnb",
  "lax",
  "lhr",
  "mad",
  "mia",
  "nrt",
  "ord",
  "otp",
  "phx",
  "qro",
  "scl",
  "sjc",
  "sea",
  "sin",
  "syd",
  "waw",
  "yul",
  "yyz"
];
const monitorMethods = ["GET", "POST", "HEAD"];
const monitorSchema = z.object({
  id: z.number(),
  periodicity: periodicityEnum,
  url: z.string().url(),
  regions: z.array(z.enum(flyRegions)),
  name: z.string().nullable(),
  description: z.string().nullable(),
  method: z.enum(monitorMethods),
  body: z.string(),
  headers: z.array(z.object({ key: z.string(), value: z.string() })).default([]),
  active: z.boolean()
});
const monitorsSchema = z.array(monitorSchema);
const dailyStatsSchema = z.object({
  ok: z.number().int(),
  count: z.number().int(),
  day: z.string()
});
const dailyStatsSchemaArray = z.array(dailyStatsSchema);
const summaryPayload = z.object({ data: dailyStatsSchemaArray });

const OPERATIONAL = 0.98;
const DEGRADED = 0.9;
function getConfigByRatio(value) {
  if (isNaN(value)) {
    return {
      color: "bg-gray-300/90 hover:bg-gray-300",
      label: "Missing"
    };
  }
  if (value > OPERATIONAL)
    return {
      color: "bg-green-500/90 hover:bg-green-500",
      label: "Operational"
    };
  if (value > DEGRADED)
    return {
      color: "bg-yellow-500/90 hover:bg-yellow-500",
      label: "Degraded"
    };
  return {
    color: "bg-red-500/90 hover:bg-red-500",
    label: "Downtime"
  };
}
function Bar(props) {
  const ratio = props.ok / props.count;
  const date = new Intl.DateTimeFormat("en-US").format(new Date(props.day));
  const config = getConfigByRatio(ratio);
  const total = props.count;
  const failed = Math.abs(props.count - props.ok);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs($cef8881cdc69808e$export$be92b6f5f03c0fe9, { openDelay: 100, closeDelay: 100, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx($cef8881cdc69808e$export$41fb9f06171c75f4, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${config.color} flex-1 h-10 rounded-md` }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx($cef8881cdc69808e$export$602eac185826482c, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      $cef8881cdc69808e$export$7c6e2c02157bb7d2,
      {
        side: "bottom",
        align: "center",
        sideOffset: 4,
        className: "border rounded-md shadow-sm bg-white p-3",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-900", children: config.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-light text-gray-900", children: date }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-1.5 h-px w-full bg-gray-100" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-green-500", children: total }),
              " total requests"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-red-500", children: failed }),
              " failed requests"
            ] })
          ] })
        ] })
      }
    ) })
  ] });
}

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const $$Astro$1 = createAstro();
const $$StatusBar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StatusBar;
  const { name, id, description } = Astro2.props;
  Object.assign(__vite_import_meta_env__, { API_KEY: "os_3ZKYrobb3fvCuEqHTdNRkdjG", _: process.env._ });
  const response = await fetch(`https://api.openstatus.dev/v1/monitor/${id}/summary`, {
    headers: {
      "x-openstatus-key": "os_3ZKYrobb3fvCuEqHTdNRkdjG"
    }
  });
  const data = await response.json();
  const result = summaryPayload.parse(data);
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-2 justify-between text-sm"> <div class="flex items-start gap-1 flex-col"> <div class="text-gray-900 line-clamp-1 font-semibold">${name}</div> ${description && renderTemplate`<div class="text-gray-600 shrink-0 font-light">${description}</div>`} </div> <div> <div class="flex flex-row gap-0.5"> ${result.data.reverse().map((stat) => {
    return renderTemplate`${renderComponent($$result, "Bar", Bar, { ...stat, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/jessejesse/Downloads/astro-status-page-main-2/src/components/bar", "client:component-export": "Bar" })}`;
  })} </div> <div class="flex items-center justify-between text-xs text-gray-600"> <p></p> <p>today</p> </div> </div> </div>`;
}, "/Users/jessejesse/Downloads/astro-status-page-main-2/src/components/status-bar.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  Astro2.env;
  let result = [];
  try {
    const response = await fetch("https://api.openstatus.dev/v1/monitor", {
      headers: {
        "x-openstatus-key": "os_3ZKYrobb3fvCuEqHTdNRkdjG"
      }
    });
    if (!response.ok) {
      console.error(`Error fetching monitors: ${response.statusText}`);
    } else {
      const data = await response.json();
      const r = monitorsSchema.parse(data);
      const monitorIds = [2026, 2027, 2028];
      result = r.filter((m) => monitorIds.includes(m.id));
    }
  } catch (error) {
    console.error("Failed to fetch monitor data:", error);
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description" content="status page"><title>Status Page</title>${renderComponent($$result, "ThemeScript", $$ThemeScript, {})}${renderHead()}</head> <body class="flex min-h-screen w-full flex-col p-4 md:p-8"> <main class="flex h-full w-full flex-1 flex-col gap-4 mx-auto max-w-sm"> <div class="mx-auto flex w-full flex-col gap-6"> <div class="col-span-full flex items-start justify-between"> <div class="flex w-full flex-col gap-4"> <div> <h1 class="font-cal text-3xl">Domains</h1> <p class="text-gray-600">status.JesseJesse.xyz</p> </div> <div class="grid gap-2"> ${result.length > 0 ? result.map((monitor) => renderTemplate`${renderComponent($$result, "StatusBar", $$StatusBar, { ...monitor })}`) : renderTemplate`<p class="text-red-500">No monitors found or failed to fetch data.</p>`} </div> </div> </div> </div> <footer> <p class="text-gray-600 text-center text-sm">
Astro web&nbsp;&#10085;
<a href="https://jesse.openstatus.dev" target="_blank" rel="noreferrer" class="text-gray-900 underline underline-offset-4 hover:no-underline">
Jesse.openstatus.dev
</a> </p> </footer> </main> <button id="theme-toggle" class="fixed top-4 left-1/2 transform -translate-x-1/2"> <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"> <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path> </svg> <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"> <circle cx="12" cy="12" r="4"></circle> <path d="M12 2v2"></path> <path d="M12 20v2"></path> <path d="m4.93 4.93 1.41 1.41"></path> <path d="m17.66 17.66 1.41 1.41"></path> <path d="M2 12h2"></path> <path d="M20 12h2"></path> <path d="m6.34 17.66-1.41 1.41"></path> <path d="m19.07 4.93-1.41 1.41"></path> </svg> </button>   </body> </html>`;
}, "/Users/jessejesse/Downloads/astro-status-page-main-2/src/pages/index.astro", void 0);
const $$file = "/Users/jessejesse/Downloads/astro-status-page-main-2/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
