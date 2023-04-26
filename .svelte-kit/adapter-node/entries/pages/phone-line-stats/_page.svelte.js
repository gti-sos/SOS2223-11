import { c as create_ssr_component, a as compute_rest_props, v as validate_component, h as add_attribute, i as each, g as escape } from "../../../chunks/index2.js";
import { B as Button } from "../../../chunks/Button.js";
import { D as Dropdown, a as DropdownToggle, b as DropdownMenu, c as DropdownItem } from "../../../chunks/DropdownToggle.js";
import "../../../chunks/Offcanvas.svelte_svelte_type_style_lang.js";
import { T as Table } from "../../../chunks/Table.js";
const ButtonDropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(Dropdown, "Dropdown").$$render($$result, Object.assign({}, $$restProps, { group: true }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let phones = [];
  let newPhoneProvince = "";
  let newPhoneYear = "";
  let newPhoneLandline = "";
  let newPhonePostPaymentPhoneLine = "";
  let newPhoneWideLandline = "";
  let searchProvince = "";
  let searchYear = "";
  let searchLandline = "";
  let searchPostPaymentPhoneLine = "";
  let searchWideLandline = "";
  return `<h1>Lineas de teléfono</h1>
${``}
${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `Siguiente`;
    }
  })}
${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `Anterior`;
    }
  })}
${validate_component(Table, "Table").$$render($$result, {}, {}, {
    default: () => {
      return `
    <thead><tr><th>Province</th>
            <th>Year</th>
            <th>Landline</th>
            <th>Post_Payment</th>
            <th>Wide_Landline</th>
            <th>Action</th></tr></thead>
    <tbody><tr><td><input${add_attribute("value", searchProvince, 0)}></td>
            <td><input${add_attribute("value", searchYear, 0)}></td>
            <td><input${add_attribute("value", searchLandline, 0)}></td>
            <td><input${add_attribute("value", searchPostPaymentPhoneLine, 0)}></td>
            <td><input${add_attribute("value", searchWideLandline, 0)}></td>
            <td>${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `Buscar`;
        }
      })}</td></tr>
        <tr><td><input${add_attribute("value", newPhoneProvince, 0)}></td>
            <td><input${add_attribute("value", newPhoneYear, 0)}></td>
            <td><input${add_attribute("value", newPhoneLandline, 0)}></td>
            <td><input${add_attribute("value", newPhonePostPaymentPhoneLine, 0)}></td>
            <td><input${add_attribute("value", newPhoneWideLandline, 0)}></td>
            <td>${validate_component(ButtonDropdown, "ButtonDropdown").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(DropdownToggle, "DropdownToggle").$$render($$result, { color: "primary", caret: true }, {}, {
            default: () => {
              return `Acciones`;
            }
          })}
                    ${validate_component(DropdownMenu, "DropdownMenu").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, { header: true }, {}, {
                default: () => {
                  return `Header`;
                }
              })}
                        ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                default: () => {
                  return `Crear recurso`;
                }
              })}
                        ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                default: () => {
                  return `Cargar telefonos`;
                }
              })}
                        ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                default: () => {
                  return `Buscar telefonos`;
                }
              })}
                        
                        ${validate_component(DropdownItem, "DropdownItem").$$render($$result, { divider: true }, {}, {})}
                        ${validate_component(DropdownItem, "DropdownItem").$$render($$result, { header: true }, {}, {
                default: () => {
                  return `Eliminar`;
                }
              })}
                        ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                default: () => {
                  return `Borrar datos`;
                }
              })}`;
            }
          })}`;
        }
      })}</td></tr>
        
        ${each(phones, (phone) => {
        return `<tr><td><a href="${"/phone-line-stats/" + escape(phone.province, true) + "/" + escape(phone.year, true)}">${escape(phone.province)}</a></td>
                <td>${escape(phone.year)}</td>
                <td>${escape(phone.landline)}</td>
                <td>${escape(phone.post_payment_phone_line)}</td>
                <td>${escape(phone.wide_landline)}</td>
                
                <td>${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
          default: () => {
            return `Eliminar`;
          }
        })}</td>
            </tr>`;
      })}</tbody>`;
    }
  })}
`;
});
export {
  Page as default
};
