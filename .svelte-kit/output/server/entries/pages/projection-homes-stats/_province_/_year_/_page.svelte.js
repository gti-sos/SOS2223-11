import { c as create_ssr_component, f as subscribe, v as validate_component } from "../../../../../chunks/index2.js";
import { B as Button } from "../../../../../chunks/Button.js";
import { C as Card, a as CardTitle, F as FormGroup } from "../../../../../chunks/FormGroup.js";
import { C as Container } from "../../../../../chunks/Container.js";
import { F as Form, L as Label, I as Input } from "../../../../../chunks/Label.js";
import "../../../../../chunks/Offcanvas.svelte_svelte_type_style_lang.js";
import { p as page } from "../../../../../chunks/stores.js";
const style = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let province = $page.params.province;
  let year = $page.params.year;
  let provinceUpdate = province;
  let yearUpdate = year;
  let coupleChildrenUpdate = "";
  let coupleNoChildrenUpdate = "";
  let singleParentUpdate = "";
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Container, "Container").$$render($$result, {}, {}, {
      default: () => {
        return `${``}

    ${validate_component(Card, "Card").$$render($$result, { class: "w-50 p-3 mb-3 mx-auto" }, {}, {
          default: () => {
            return `${validate_component(CardTitle, "CardTitle").$$render($$result, {}, {}, {
              default: () => {
                return `<center>Descripción de la proyección</center>`;
              }
            })}

        ${validate_component(Form, "Form").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(FormGroup, "FormGroup").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Label, "Label").$$render($$result, { for: "province" }, {}, {
                      default: () => {
                        return `Provincia`;
                      }
                    })}
        ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        id: "province",
                        placeholder: "Provincia",
                        value: provinceUpdate
                      },
                      {
                        value: ($$value) => {
                          provinceUpdate = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

        ${validate_component(Label, "Label").$$render($$result, { for: "year" }, {}, {
                      default: () => {
                        return `Año`;
                      }
                    })}
        ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        id: "year",
                        placeholder: "Año",
                        value: yearUpdate
                      },
                      {
                        value: ($$value) => {
                          yearUpdate = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

        ${validate_component(Label, "Label").$$render($$result, { for: "couple_children" }, {}, {
                      default: () => {
                        return `Parejas con hijos`;
                      }
                    })}
        ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        id: "couple_children",
                        placeholder: "Número de parejas con hijos",
                        value: coupleChildrenUpdate
                      },
                      {
                        value: ($$value) => {
                          coupleChildrenUpdate = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

        ${validate_component(Label, "Label").$$render($$result, { for: "couple_nochildren" }, {}, {
                      default: () => {
                        return `Parejas sin hijos`;
                      }
                    })}
        ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        id: "couple_nochildren",
                        placeholder: "Número de parejas sin hijos",
                        value: coupleNoChildrenUpdate
                      },
                      {
                        value: ($$value) => {
                          coupleNoChildrenUpdate = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

        ${validate_component(Label, "Label").$$render($$result, { for: "single_parent" }, {}, {
                      default: () => {
                        return `Personas solteras`;
                      }
                    })}
        ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        id: "single_parent",
                        placeholder: "Número de personas solteras",
                        value: singleParentUpdate
                      },
                      {
                        value: ($$value) => {
                          singleParentUpdate = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

        <center><div class="buttons" style="text-align: center">${validate_component(Button, "Button").$$render($$result, { color: "success" }, {}, {
                      default: () => {
                        return `Actualizar`;
                      }
                    })}

        ${validate_component(Button, "Button").$$render($$result, { color: "info" }, {}, {
                      default: () => {
                        return `Atrás`;
                      }
                    })}</div></center>`;
                  }
                })}`;
              }
            })}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
