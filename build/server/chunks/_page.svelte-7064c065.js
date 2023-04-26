import { c as create_ssr_component, v as validate_component } from './index2-6c38473e.js';
import { B as Button } from './Button-274a3e09.js';
import { C as Container } from './Container-dd545302.js';
import 'highcharts';
import './Offcanvas.svelte_svelte_type_style_lang-3f285cee.js';

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

export { Page as default };
//# sourceMappingURL=_page.svelte-7064c065.js.map
