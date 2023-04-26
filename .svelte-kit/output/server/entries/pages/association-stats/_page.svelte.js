import { c as create_ssr_component, v as validate_component, i as each, g as escape } from "../../../chunks/index2.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Container } from "../../../chunks/Container.js";
import { M as Modal, a as ModalHeader, b as ModalBody, c as ModalFooter } from "../../../chunks/ModalFooter.js";
import "../../../chunks/Offcanvas.svelte_svelte_type_style_lang.js";
import { T as Table } from "../../../chunks/Table.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-1fnzxl4{margin-left:2%;margin-top:0.5%}.linkStyleless.svelte-1fnzxl4{text-decoration:none;color:white}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let open = false;
  let openOne = false;
  const toggle = () => open = !open;
  const toggleOne = () => openOne = !openOne;
  let associations = [];
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h2 class="svelte-1fnzxl4">Asociaciones de andalucía
    ${validate_component(Button, "Button").$$render(
      $$result,
      {
        id: "createAssociation",
        color: "success"
      },
      {},
      {
        default: () => {
          return `Crear asociación`;
        }
      }
    )}
    ${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
      default: () => {
        return `Cargar asociaciones`;
      }
    })}
    ${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
      default: () => {
        return `Recargar asociaciones`;
      }
    })}
    ${validate_component(Button, "Button").$$render(
      $$result,
      {
        color: "primary",
        href: "/association-stats/search"
      },
      {},
      {
        default: () => {
          return `Filtrar asociaciones`;
        }
      }
    )}
    ${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
      default: () => {
        return `Borrar asociaciones`;
      }
    })}
    ${validate_component(Modal, "Modal").$$render($$result, { isOpen: open, toggle }, {}, {
      default: () => {
        return `${validate_component(ModalHeader, "ModalHeader").$$render($$result, { toggle }, {}, {
          default: () => {
            return `Vas a borrar todos los recursos de la base de datos`;
          }
        })}
        ${validate_component(ModalBody, "ModalBody").$$render($$result, {}, {}, {
          default: () => {
            return `¿Estás seguro?`;
          }
        })}
        ${validate_component(ModalFooter, "ModalFooter").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
              default: () => {
                return `Proceder`;
              }
            })}
            ${validate_component(Button, "Button").$$render($$result, { color: "secondary" }, {}, {
              default: () => {
                return `Cancelar`;
              }
            })}`;
          }
        })}`;
      }
    })}
    ${validate_component(Modal, "Modal").$$render($$result, { isOpen: openOne, toggleOne }, {}, {
      default: () => {
        return `${validate_component(ModalHeader, "ModalHeader").$$render($$result, { toggleOne }, {}, {
          default: () => {
            return `Vas a borrar el recurso seleccionado de la base de datos`;
          }
        })}
        ${validate_component(ModalBody, "ModalBody").$$render($$result, {}, {}, {
          default: () => {
            return `¿Estás seguro?`;
          }
        })}
        ${validate_component(ModalFooter, "ModalFooter").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
              default: () => {
                return `Proceder`;
              }
            })}
            ${validate_component(Button, "Button").$$render($$result, { color: "secondary" }, {}, {
              default: () => {
                return `Cancelar`;
              }
            })}`;
          }
        })}`;
      }
    })}</h2>
${validate_component(Container, "Container").$$render($$result, {}, {}, {
      default: () => {
        return `${``}
    ${``}
    ${`${validate_component(Table, "Table").$$render($$result, { striped: true }, {}, {
          default: () => {
            return `<thead><tr><th>Nombre</th>
                    <th>Objetivo</th>
                    <th>Año de registro</th>
                    <th>Año de creacion</th>
                    <th>Código postal</th>
                    <th>Provincia</th>
                    <th>Código municipal</th>
                    <th>Acciones</th></tr></thead>
            <tbody>${each(associations, (association) => {
              return `<tr><td>${escape(association.name)}</td>
                        <td>${escape(association.goal)}</td>
                        <td>${escape(association.registration_date)}</td>
                        <td>${escape(association.creation_date)}</td>
                        <td>${escape(association.zip_code)}</td>
                        <td>${escape(association.province)}</td>
                        <td>${escape(association.township_code)}</td>
                        <td><div>${validate_component(Button, "Button").$$render($$result, {}, {}, {
                default: () => {
                  return `<a class="linkStyleless svelte-1fnzxl4" href="${"/association-stats/" + escape(association.province, true) + "/" + escape(association.registration_date, true)}">Editar</a>`;
                }
              })}
                                <br>
                                <br>

                                ${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
                default: () => {
                  return `Borrar`;
                }
              })}
                            </div></td>
                    </tr>`;
            })}</tbody>`;
          }
        })}`}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
