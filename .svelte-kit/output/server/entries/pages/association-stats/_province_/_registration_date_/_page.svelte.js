import { c as create_ssr_component, f as subscribe, v as validate_component, g as escape } from "../../../../../chunks/index2.js";
import { B as Button } from "../../../../../chunks/Button.js";
import { C as Card, a as CardTitle, F as FormGroup } from "../../../../../chunks/FormGroup.js";
import { C as Container } from "../../../../../chunks/Container.js";
import { F as Form, L as Label, I as Input } from "../../../../../chunks/Label.js";
import "../../../../../chunks/Offcanvas.svelte_svelte_type_style_lang.js";
import { p as page } from "../../../../../chunks/stores.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-1fzkxrc{margin-left:1%;margin-top:0.5%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let province = $page.params.province;
  let registration_date = $page.params.registration_date;
  let updated_name = "";
  let updated_goal = "";
  let updated_registration_date = registration_date;
  let updated_creation_date = "";
  let updated_zip_code = "";
  let updated_province = province;
  let updated_township_code = "";
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h2 class="svelte-1fzkxrc">Detalles de la asociación ${validate_component(Button, "Button").$$render(
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
    )}</h2>

${validate_component(Container, "Container").$$render($$result, {}, {}, {
      default: () => {
        return `${``}
    ${`${validate_component(Card, "Card").$$render($$result, { class: "w-50 p-3 mb-3 mx-auto" }, {}, {
          default: () => {
            return `${validate_component(CardTitle, "CardTitle").$$render($$result, {}, {}, {
              default: () => {
                return `Actualiza la asociación de ${escape(province)} en el año ${escape(registration_date)}`;
              }
            })}
        ${validate_component(Form, "Form").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(FormGroup, "FormGroup").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
                      default: () => {
                        return `Nombre de la asociación`;
                      }
                    })}
                ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        required: true,
                        id: "name",
                        placeholder: "Nombre",
                        value: updated_name
                      },
                      {
                        value: ($$value) => {
                          updated_name = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

                ${validate_component(Label, "Label").$$render($$result, { for: "goal" }, {}, {
                      default: () => {
                        return `Objetivo de la asociación`;
                      }
                    })}
                ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        required: true,
                        id: "goal",
                        placeholder: "Objetivo",
                        value: updated_goal
                      },
                      {
                        value: ($$value) => {
                          updated_goal = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

                ${validate_component(Label, "Label").$$render($$result, { for: "province" }, {}, {
                      default: () => {
                        return `Provincia`;
                      }
                    })}
                ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        required: true,
                        id: "province",
                        placeholder: "Provincia",
                        value: updated_province
                      },
                      {
                        value: ($$value) => {
                          updated_province = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

                ${validate_component(Label, "Label").$$render($$result, { for: "registration-date" }, {}, {
                      default: () => {
                        return `Año de registro`;
                      }
                    })}
                ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "number",
                        required: true,
                        id: "registration-date",
                        placeholder: "0000",
                        value: updated_registration_date
                      },
                      {
                        value: ($$value) => {
                          updated_registration_date = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

                ${validate_component(Label, "Label").$$render($$result, { for: "creation-date" }, {}, {
                      default: () => {
                        return `Año de creación`;
                      }
                    })}
                ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "number",
                        required: true,
                        id: "creation-date",
                        placeholder: "0000",
                        value: updated_creation_date
                      },
                      {
                        value: ($$value) => {
                          updated_creation_date = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

                ${validate_component(Label, "Label").$$render($$result, { for: "zip-code" }, {}, {
                      default: () => {
                        return `Código postal`;
                      }
                    })}
                ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "number",
                        required: true,
                        id: "zip-code",
                        placeholder: "00000",
                        value: updated_zip_code
                      },
                      {
                        value: ($$value) => {
                          updated_zip_code = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

                ${validate_component(Label, "Label").$$render($$result, { for: "township-code" }, {}, {
                      default: () => {
                        return `Código municipal`;
                      }
                    })}
                ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "number",
                        required: true,
                        id: "township-code",
                        placeholder: "000",
                        class: "mb-3",
                        value: updated_township_code
                      },
                      {
                        value: ($$value) => {
                          updated_township_code = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}

                ${validate_component(Button, "Button").$$render($$result, { color: "primary", type: "submit" }, {}, {
                      default: () => {
                        return `Actualizar`;
                      }
                    })}`;
                  }
                })}`;
              }
            })}`;
          }
        })}`}`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
