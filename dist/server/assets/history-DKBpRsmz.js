import { W as jsxRuntimeExports } from "./server-UNqwmoql.js";
import { H as HistoryTable } from "./HistoryTable--mpS54kE.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-C1HWRFUk.js";
import "./trash-2-BWej_0mc.js";
function HistoryPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl uppercase tracking-widest", children: [
      "Dziennik ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber", children: "przejazdów" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryTable, {})
  ] });
}
export {
  HistoryPage as component
};
