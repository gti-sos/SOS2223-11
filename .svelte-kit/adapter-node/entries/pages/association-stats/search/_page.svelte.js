import { c as create_ssr_component, v as validate_component, g as escape, i as each } from "../../../../chunks/index2.js";
import { B as Button } from "../../../../chunks/Button.js";
import { C as Container } from "../../../../chunks/Container.js";
import { F as Form, L as Label, I as Input } from "../../../../chunks/Label.js";
import "../../../../chunks/Offcanvas.svelte_svelte_type_style_lang.js";
import { T as Table } from "../../../../chunks/Table.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-1x3qx94{margin-left:2%;margin-top:0.5%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let associations = [];
  let limit = 10;
  let updatedLimit = limit;
  let searchName;
  let searchGoal;
  let searchRegistrationDate;
  let searchCreationDate;
  let searchZipCode;
  let searchProvince;
  let searchTownshipCode;
  let totalPages = 1;
  let currentPage = 1;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h2 class="svelte-1x3qx94">Asociaciones de andalucía

    ${validate_component(Button, "Button").$$render(
      $$result,
      {
        color: "primary",
        href: "/association-stats"
      },
      {},
      {
        default: () => {
          return `Volver a asociaciones`;
        }
      }
    )}
    ${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
      default: () => {
        return `Recargar asociaciones`;
      }
    })}

    </h2>
${validate_component(Container, "Container").$$render($$result, {}, {}, {
      default: () => {
        return `${``}

    <div class="d-flex justify-content-between align-items-center mt-3">${validate_component(Form, "Form").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="d-flex align-items-center">${validate_component(Label, "Label").$$render($$result, { class: "mr-2", for: "name" }, {}, {
              default: () => {
                return `Nombre:`;
              }
            })}
                ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "text",
                id: "name",
                value: searchName
              },
              {
                value: ($$value) => {
                  searchName = $$value;
                  $$settled = false;
                }
              },
              {}
            )}
                ${validate_component(Label, "Label").$$render($$result, { class: "mr-2", for: "goal" }, {}, {
              default: () => {
                return `Objetivo:`;
              }
            })}
                ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "text",
                id: "goal",
                value: searchGoal
              },
              {
                value: ($$value) => {
                  searchGoal = $$value;
                  $$settled = false;
                }
              },
              {}
            )}
                ${validate_component(Label, "Label").$$render($$result, { class: "mr-2", for: "registration_date" }, {}, {
              default: () => {
                return `Año de registro:`;
              }
            })}
                ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "number",
                id: "registration_date",
                value: searchRegistrationDate
              },
              {
                value: ($$value) => {
                  searchRegistrationDate = $$value;
                  $$settled = false;
                }
              },
              {}
            )}
                ${validate_component(Label, "Label").$$render($$result, { class: "mr-2", for: "creation_date" }, {}, {
              default: () => {
                return `Año de creación:`;
              }
            })}
                ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "number",
                id: "creation_date",
                value: searchCreationDate
              },
              {
                value: ($$value) => {
                  searchCreationDate = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div>
            <div class="d-flex align-items-center">${validate_component(Label, "Label").$$render($$result, { class: "mr-2", for: "zip_code" }, {}, {
              default: () => {
                return `Código postal:`;
              }
            })}
                ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "number",
                id: "zip_code",
                value: searchZipCode
              },
              {
                value: ($$value) => {
                  searchZipCode = $$value;
                  $$settled = false;
                }
              },
              {}
            )}
                ${validate_component(Label, "Label").$$render($$result, { class: "mr-2", for: "province" }, {}, {
              default: () => {
                return `Provincia:`;
              }
            })}
                ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "text",
                id: "province",
                value: searchProvince
              },
              {
                value: ($$value) => {
                  searchProvince = $$value;
                  $$settled = false;
                }
              },
              {}
            )}
                ${validate_component(Label, "Label").$$render($$result, { class: "mr-2", for: "township_code" }, {}, {
              default: () => {
                return `Código municipal:`;
              }
            })}
                ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "number",
                id: "township_code",
                value: searchTownshipCode
              },
              {
                value: ($$value) => {
                  searchTownshipCode = $$value;
                  $$settled = false;
                }
              },
              {}
            )}
                ${validate_component(Label, "Label").$$render($$result, { class: "mr-2", for: "limit" }, {}, {
              default: () => {
                return `Límite:`;
              }
            })}
                ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "number",
                id: "limit",
                min: "1",
                max: "100",
                step: "1",
                value: updatedLimit
              },
              {
                value: ($$value) => {
                  updatedLimit = $$value;
                  $$settled = false;
                }
              },
              {}
            )}

                </div>
            <div>${validate_component(Button, "Button").$$render($$result, { color: "primary", type: "submit" }, {}, {
              default: () => {
                return `Filtrar`;
              }
            })}</div>

            <br>
            
                <div>${validate_component(Button, "Button").$$render(
              $$result,
              {
                color: "primary",
                disabled: currentPage === 1
              },
              {},
              {
                default: () => {
                  return `Anterior
            `;
                }
              }
            )}
            ${validate_component(Label, "Label").$$render($$result, { class: "mx-3" }, {}, {
              default: () => {
                return `${escape(currentPage)} de ${escape(totalPages)}`;
              }
            })}
            ${validate_component(Button, "Button").$$render(
              $$result,
              {
                color: "primary",
                disabled: currentPage === totalPages
              },
              {},
              {
                default: () => {
                  return `Siguiente
            `;
                }
              }
            )}</div>
            `;
          }
        })}</div>
    

    ${validate_component(Table, "Table").$$render($$result, { striped: true }, {}, {
          default: () => {
            return `<thead><tr><th>Nombre</th>
                <th>Objetivo</th>
                <th>Año de registro</th>
                <th>Año de creacion</th>
                <th>Código postal</th>
                <th>Provincia</th>
                <th>Código municipal</th>
                </tr></thead>
        <tbody>${each(associations, (association) => {
              return `<tr><td>${escape(association.name)}</td>
                    <td>${escape(association.goal)}</td>
                    <td>${escape(association.registration_date)}</td>
                    <td>${escape(association.creation_date)}</td>
                    <td>${escape(association.zip_code)}</td>
                    <td>${escape(association.province)}</td>
                    <td>${escape(association.township_code)}</td>
                    
                </tr>`;
            })}</tbody>`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
