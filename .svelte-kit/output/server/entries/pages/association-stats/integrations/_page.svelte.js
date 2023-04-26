import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index2.js";
import { B as Button } from "../../../../chunks/Button.js";
import { C as Container } from "../../../../chunks/Container.js";
import "../../../../chunks/Offcanvas.svelte_svelte_type_style_lang.js";
import "highcharts";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="my-3">${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
        default: () => {
          return `Cargar gráfica`;
        }
      })}</div>
    <div id="chart-container"></div>`;
    }
  })}`;
});
export {
  Page as default
};
