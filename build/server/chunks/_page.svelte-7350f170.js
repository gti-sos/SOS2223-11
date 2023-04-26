import { c as create_ssr_component, v as validate_component, h as each, i as add_attribute, g as escape, a as compute_rest_props, b as spread, e as escape_object, d as escape_attribute_value } from './index2-6c38473e.js';
import { i as isObject, g as getColumnSizeClass, c as classnames } from './Offcanvas.svelte_svelte_type_style_lang-3f285cee.js';
import { C as Container } from './Container-dd545302.js';

const Col = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "xs", "sm", "md", "lg", "xl", "xxl"]);
  let { class: className = "" } = $$props;
  let { xs = void 0 } = $$props;
  let { sm = void 0 } = $$props;
  let { md = void 0 } = $$props;
  let { lg = void 0 } = $$props;
  let { xl = void 0 } = $$props;
  let { xxl = void 0 } = $$props;
  const colClasses = [];
  const lookup = { xs, sm, md, lg, xl, xxl };
  Object.keys(lookup).forEach((colWidth) => {
    const columnProp = lookup[colWidth];
    if (!columnProp && columnProp !== "") {
      return;
    }
    const isXs = colWidth === "xs";
    if (isObject(columnProp)) {
      const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
      const colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);
      if (columnProp.size || columnProp.size === "") {
        colClasses.push(colClass);
      }
      if (columnProp.push) {
        colClasses.push(`push${colSizeInterfix}${columnProp.push}`);
      }
      if (columnProp.pull) {
        colClasses.push(`pull${colSizeInterfix}${columnProp.pull}`);
      }
      if (columnProp.offset) {
        colClasses.push(`offset${colSizeInterfix}${columnProp.offset}`);
      }
      if (columnProp.order) {
        colClasses.push(`order${colSizeInterfix}${columnProp.order}`);
      }
    } else {
      colClasses.push(getColumnSizeClass(isXs, colWidth, columnProp));
    }
  });
  if (!colClasses.length) {
    colClasses.push("col");
  }
  if (className) {
    colClasses.push(className);
  }
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.xs === void 0 && $$bindings.xs && xs !== void 0)
    $$bindings.xs(xs);
  if ($$props.sm === void 0 && $$bindings.sm && sm !== void 0)
    $$bindings.sm(sm);
  if ($$props.md === void 0 && $$bindings.md && md !== void 0)
    $$bindings.md(md);
  if ($$props.lg === void 0 && $$bindings.lg && lg !== void 0)
    $$bindings.lg(lg);
  if ($$props.xl === void 0 && $$bindings.xl && xl !== void 0)
    $$bindings.xl(xl);
  if ($$props.xxl === void 0 && $$bindings.xxl && xxl !== void 0)
    $$bindings.xxl(xxl);
  return `<div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(colClasses.join(" "))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
function getCols(cols) {
  const colsValue = parseInt(cols);
  if (!isNaN(colsValue)) {
    if (colsValue > 0) {
      return [`row-cols-${colsValue}`];
    }
  } else if (typeof cols === "object") {
    return ["xs", "sm", "md", "lg", "xl"].map((colWidth) => {
      const isXs = colWidth === "xs";
      const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
      const value = cols[colWidth];
      if (typeof value === "number" && value > 0) {
        return `row-cols${colSizeInterfix}${value}`;
      }
      return null;
    }).filter((value) => !!value);
  }
  return [];
}
const Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "noGutters", "form", "cols", "inner"]);
  let { class: className = "" } = $$props;
  let { noGutters = false } = $$props;
  let { form = false } = $$props;
  let { cols = 0 } = $$props;
  let { inner = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.noGutters === void 0 && $$bindings.noGutters && noGutters !== void 0)
    $$bindings.noGutters(noGutters);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.cols === void 0 && $$bindings.cols && cols !== void 0)
    $$bindings.cols(cols);
  if ($$props.inner === void 0 && $$bindings.inner && inner !== void 0)
    $$bindings.inner(inner);
  classes = classnames(className, noGutters ? "gx-0" : null, form ? "form-row" : "row", ...getCols(cols));
  return `<div${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}${add_attribute("this", inner, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const css = {
  code: ".pageContainer.svelte-1s8440i{margin-bottom:8em}",
  map: null
};
let url = "https://sos2223-11.ew.r.appspot.com/";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const teamMembers = [
    {
      name: "Víctor Ruiz Jiménez",
      github: "https://github.com/vicruijim",
      dataname: "phone-line-stats"
    },
    {
      name: "Ignacio García Rodríguez",
      github: "https://github.com/ign13101",
      dataname: "association-stats"
    },
    {
      name: "Christian Asuero Carrellán",
      github: "https://github.com/chrasucar342",
      dataname: "projection-homes-stats"
    }
  ];
  $$result.css.add(css);
  return `${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="pageContainer svelte-1s8440i"><br>

        <h2 id="sos2223-11">SOS2223-11</h2>
        <hr>

        ${validate_component(Row, "Row").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Col, "Col").$$render($$result, {}, {}, {
            default: () => {
              return `<strong>Team</strong>
                <ul>${each(teamMembers, (member) => {
                return `<li><a${add_attribute("href", member.github, 0)}>${escape(member.name)}:</a> Fuente de
                            datos: <i>${escape(member.dataname)}</i>
                        </li>`;
              })}</ul>`;
            }
          })}`;
        }
      })}

        ${validate_component(Row, "Row").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Col, "Col").$$render($$result, {}, {}, {
            default: () => {
              return `<p><strong>Descripción del proyecto</strong>: Nuestro proyecto
                    tiene como objetivo analizar las correlaciones entre
                    asociaciones, líneas de teléfono y estructuras de hogares.
                </p>`;
            }
          })}`;
        }
      })}

        ${validate_component(Row, "Row").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Col, "Col").$$render($$result, {}, {}, {
            default: () => {
              return `<p><strong>Repositorio</strong>:
                    <a href="https://github.com/gti-sos/SOS2223-11">gti-sos/SOS2223-11</a></p>`;
            }
          })}`;
        }
      })}

        ${validate_component(Row, "Row").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Col, "Col").$$render($$result, {}, {}, {
            default: () => {
              return `<p><strong>URL del proyecto</strong>:
                    <a${add_attribute("href", url, 0)}>${escape(url)}</a></p>`;
            }
          })}`;
        }
      })}

        ${validate_component(Row, "Row").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Col, "Col").$$render($$result, {}, {}, {
            default: () => {
              return `<p><strong>Interfaces</strong></p>
                <ul>${each(teamMembers, (member) => {
                return `<li><a href="${escape(url, true) + escape(member.dataname, true)}">${escape(url)}${escape(member.dataname)}</a> (desarrollada por ${escape(member.name)})
                    </li>`;
              })}</ul>`;
            }
          })}`;
        }
      })}
        ${validate_component(Row, "Row").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Col, "Col").$$render($$result, {}, {}, {
            default: () => {
              return `<p><strong>APIs</strong></p>
                <ul><li>v1
                        <ul>${each(teamMembers, (member) => {
                return `<li><a href="${escape(url, true) + "api/v1/" + escape(member.dataname, true)}">${escape(url)}api/v1/${escape(member.dataname)}</a> (desarrollada por ${escape(member.name)})
                            </li>`;
              })}</ul></li>
                    <li>v2
                        <ul>${each(teamMembers, (member) => {
                return `<li><a href="${escape(url, true) + "api/v2/" + escape(member.dataname, true)}">${escape(url)}api/v2/${escape(member.dataname)}</a> (desarrollada por ${escape(member.name)})
                            </li>`;
              })}</ul></li></ul>`;
            }
          })}`;
        }
      })}
        ${validate_component(Row, "Row").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Col, "Col").$$render($$result, {}, {}, {
            default: () => {
              return `<p><strong>Documentación de Postman</strong></p>
                <ul><li>v1
                        <ul>${each(teamMembers, (member) => {
                return `<li><a href="${escape(url, true) + "api/v1/" + escape(member.dataname, true) + "/docs"}">${escape(url)}api/v1/${escape(member.dataname)}/docs</a>
                            </li>`;
              })}</ul></li>
                    <li>v2
                        <ul>${each(teamMembers, (member) => {
                return `<li><a href="${escape(url, true) + "api/v2/" + escape(member.dataname, true) + "/docs"}">${escape(url)}api/v2/${escape(member.dataname)}/docs</a>
                            </li>`;
              })}</ul></li></ul>`;
            }
          })}`;
        }
      })}

        <br></div>`;
    }
  })}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-7350f170.js.map
