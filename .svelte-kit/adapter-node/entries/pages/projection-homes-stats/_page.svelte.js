import { c as create_ssr_component, v as validate_component, g as escape, h as add_attribute, i as each } from "../../../chunks/index2.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Container } from "../../../chunks/Container.js";
import { M as Modal, a as ModalHeader, b as ModalBody, c as ModalFooter } from "../../../chunks/ModalFooter.js";
import "../../../chunks/Offcanvas.svelte_svelte_type_style_lang.js";
import { T as Table } from "../../../chunks/Table.js";
const projectionHomesStats = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let open = false;
  let openOne = false;
  const toggle = () => open = !open;
  const toggleOne = () => openOne = !openOne;
  let projection = [];
  let province = "";
  let year = "";
  let couple_children = "";
  let couple_nochildren = "";
  let single_parent = "";
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h2>

    ${validate_component(Modal, "Modal").$$render($$result, { isOpen: open, toggle }, {}, {
      default: () => {
        return `${validate_component(ModalHeader, "ModalHeader").$$render($$result, { toggle }, {}, {
          default: () => {
            return `Atención: Vas a borrar todos los recursos de la base de datos`;
          }
        })}
    ${validate_component(ModalBody, "ModalBody").$$render($$result, {}, {}, {
          default: () => {
            return `¿Estás seguro?`;
          }
        })}
    ${validate_component(ModalFooter, "ModalFooter").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
              default: () => {
                return `Eliminar
    `;
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
            return `Atención: Vas a borrar el recurso seleccionado de la base de datos`;
          }
        })}
    ${validate_component(ModalBody, "ModalBody").$$render($$result, {}, {}, {
          default: () => {
            return `¿Estás seguro?`;
          }
        })}
    ${validate_component(ModalFooter, "ModalFooter").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
              default: () => {
                return `Eliminar
    `;
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

    ${`<h2><center><p>Proyecciones de hogares: ${escape(projection.length)}</p></center></h2>

    

    <center>${validate_component(Button, "Button").$$render($$result, { id: "createProjection", color: "primary" }, {}, {
          default: () => {
            return `Crear Proyección`;
          }
        })}

    

    ${validate_component(Button, "Button").$$render($$result, { color: "success" }, {}, {
          default: () => {
            return `Cargar proyecciones`;
          }
        })}

    

    ${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
          default: () => {
            return `Eliminar proyecciones`;
          }
        })}

    

    ${validate_component(Button, "Button").$$render($$result, { color: "warning" }, {}, {
          default: () => {
            return `Filtrar`;
          }
        })}

    

    ${validate_component(Button, "Button").$$render($$result, { color: "dark" }, {}, {
          default: () => {
            return `Limpiar Filtros`;
          }
        })}</center>

    

    <div class="filtros"><label class="columna">Provincia:
    <input type="text"${add_attribute("value", province, 0)}></label>

    <label class="columna">Año:
    <input type="text"${add_attribute("value", year, 0)}></label>
    
    <label class="columna">Parejas con hijos:
    <input type="text"${add_attribute("value", couple_children, 0)}></label>

    <label class="columna">Parejas sin hijos:
    <input type="text"${add_attribute("value", couple_nochildren, 0)}></label>

    <label class="columna">Personas solteras:
    <input type="text"${add_attribute("value", single_parent, 0)}></label></div>
        
    

        ${validate_component(Table, "Table").$$render($$result, { bordered: true }, {}, {
          default: () => {
            return `<thead><tr><th>Provincia</th>
                    <th>Año</th>
                    <th>Parejas con hijos</th>
                    <th>Parejas sin hijos</th>
                    <th>Personas solteras</th></tr></thead>

            <tbody>${each(projection, (projections) => {
              return `<tr><td>${escape(projections.province)}</td>
                        <td>${escape(projections.year)}</td>
                        <td>${escape(projections.couple_children)}</td>
                        <td>${escape(projections.couple_nochildren)}</td>
                        <td>${escape(projections.single_parent)}</td>
                        <td><div>${validate_component(Button, "Button").$$render(
                $$result,
                {
                  color: "primary",
                  href: "/projection-homes-stats/" + projections.province + "/" + projections.year
                },
                {},
                {
                  default: () => {
                    return `Actualizar
                        `;
                  }
                }
              )}
                        <br>
                        <br>      
                                
                        ${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
                default: () => {
                  return `Eliminar`;
                }
              })}
                                
                        </div></td>
                        </tr>`;
            })}</tbody>`;
          }
        })}

        

        <center>${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
          default: () => {
            return `Anterior`;
          }
        })}
        ${validate_component(Button, "Button").$$render($$result, { color: "success" }, {}, {
          default: () => {
            return `Siguiente`;
          }
        })}</center>`}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
