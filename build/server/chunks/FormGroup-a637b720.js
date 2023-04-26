import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_object, d as escape_attribute_value, g as escape, p as compute_slots } from './index2-6c38473e.js';
import { c as classnames } from './Offcanvas.svelte_svelte_type_style_lang-3f285cee.js';

const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "body", "color", "inverse", "outline", "style"]);
  let { class: className = "" } = $$props;
  let { body = false } = $$props;
  let { color = "" } = $$props;
  let { inverse = false } = $$props;
  let { outline = false } = $$props;
  let { style = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.body === void 0 && $$bindings.body && body !== void 0)
    $$bindings.body(body);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.inverse === void 0 && $$bindings.inverse && inverse !== void 0)
    $$bindings.inverse(inverse);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  classes = classnames(className, "card", inverse ? "text-white" : false, body ? "card-body" : false, color ? `${outline ? "border" : "bg"}-${color}` : false);
  return `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(classes) },
      { style: escape_attribute_value(style) }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const CardTitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  classes = classnames(className, "card-title");
  return `<h5${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${slots.default ? slots.default({}) : ``}</h5>`;
});
const FormGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "check", "disabled", "floating", "inline", "label", "row", "tag"]);
  let $$slots = compute_slots(slots);
  let { class: className = "" } = $$props;
  let { check = false } = $$props;
  let { disabled = false } = $$props;
  let { floating = false } = $$props;
  let { inline = false } = $$props;
  let { label = "" } = $$props;
  let { row = false } = $$props;
  let { tag = null } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.check === void 0 && $$bindings.check && check !== void 0)
    $$bindings.check(check);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.floating === void 0 && $$bindings.floating && floating !== void 0)
    $$bindings.floating(floating);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.row === void 0 && $$bindings.row && row !== void 0)
    $$bindings.row(row);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  classes = classnames(className, "mb-3", {
    row,
    "form-check": check,
    "form-check-inline": check && inline,
    "form-floating": floating,
    disabled: check && disabled
  });
  return `${tag === "fieldset" ? `<fieldset${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${slots.default ? slots.default({}) : ``}
    ${label || $$slots.label ? `
      <label>${escape(label)}
        ${slots.label ? slots.label({}) : ``}</label>` : ``}</fieldset>` : `<div${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${slots.default ? slots.default({}) : ``}
    ${label || $$slots.label ? `
      <label>${escape(label)}
        ${slots.label ? slots.label({}) : ``}</label>` : ``}</div>`}`;
});

export { Card as C, FormGroup as F, CardTitle as a };
//# sourceMappingURL=FormGroup-a637b720.js.map
