import {
  createSvgIcon
} from "./chunk-RTLEF3EH.js";
import {
  ButtonBase_default
} from "./chunk-B5IEUSUU.js";
import {
  useSlot
} from "./chunk-I6HT2AJJ.js";
import {
  capitalize_default
} from "./chunk-5F4L53VH.js";
import {
  memoTheme_default
} from "./chunk-QOLEUECV.js";
import {
  useDefaultProps
} from "./chunk-73KKVB4D.js";
import {
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_jsx_runtime,
  styled_default
} from "./chunk-XZ2KZWCD.js";
import {
  require_prop_types
} from "./chunk-FJ6XD5FS.js";
import {
  require_react
} from "./chunk-6GAV2S6I.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/material/esm/TableSortLabel/TableSortLabel.js
var import_prop_types = __toESM(require_prop_types(), 1);
var React2 = __toESM(require_react(), 1);

// node_modules/@mui/material/esm/internal/svg-icons/ArrowDownward.js
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var ArrowDownward_default = createSvgIcon((0, import_jsx_runtime.jsx)("path", {
  d: "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
}), "ArrowDownward");

// node_modules/@mui/material/esm/TableSortLabel/tableSortLabelClasses.js
function getTableSortLabelUtilityClass(slot) {
  return generateUtilityClass("MuiTableSortLabel", slot);
}
var tableSortLabelClasses = generateUtilityClasses("MuiTableSortLabel", ["root", "active", "icon", "iconDirectionDesc", "iconDirectionAsc", "directionDesc", "directionAsc"]);
var tableSortLabelClasses_default = tableSortLabelClasses;

// node_modules/@mui/material/esm/TableSortLabel/TableSortLabel.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    direction,
    active
  } = ownerState;
  const slots = {
    root: ["root", active && "active", `direction${capitalize_default(direction)}`],
    icon: ["icon", `iconDirection${capitalize_default(direction)}`]
  };
  return composeClasses(slots, getTableSortLabelUtilityClass, classes);
};
var TableSortLabelRoot = styled_default(ButtonBase_default, {
  name: "MuiTableSortLabel",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.active && styles.active];
  }
})(memoTheme_default(({
  theme
}) => ({
  cursor: "pointer",
  display: "inline-flex",
  justifyContent: "flex-start",
  flexDirection: "inherit",
  alignItems: "center",
  "&:focus": {
    color: (theme.vars || theme).palette.text.secondary
  },
  "&:hover": {
    color: (theme.vars || theme).palette.text.secondary,
    [`& .${tableSortLabelClasses_default.icon}`]: {
      opacity: 0.5
    }
  },
  [`&.${tableSortLabelClasses_default.active}`]: {
    color: (theme.vars || theme).palette.text.primary,
    [`& .${tableSortLabelClasses_default.icon}`]: {
      opacity: 1,
      color: (theme.vars || theme).palette.text.secondary
    }
  }
})));
var TableSortLabelIcon = styled_default("span", {
  name: "MuiTableSortLabel",
  slot: "Icon",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.icon, styles[`iconDirection${capitalize_default(ownerState.direction)}`]];
  }
})(memoTheme_default(({
  theme
}) => ({
  fontSize: 18,
  marginRight: 4,
  marginLeft: 4,
  opacity: 0,
  transition: theme.transitions.create(["opacity", "transform"], {
    duration: theme.transitions.duration.shorter
  }),
  userSelect: "none",
  variants: [{
    props: {
      direction: "desc"
    },
    style: {
      transform: "rotate(0deg)"
    }
  }, {
    props: {
      direction: "asc"
    },
    style: {
      transform: "rotate(180deg)"
    }
  }]
})));
var TableSortLabel = React2.forwardRef(function TableSortLabel2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiTableSortLabel"
  });
  const {
    active = false,
    children,
    className,
    direction = "asc",
    hideSortIcon = false,
    IconComponent = ArrowDownward_default,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const ownerState = {
    ...props,
    active,
    direction,
    hideSortIcon,
    IconComponent
  };
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootProps] = useSlot("root", {
    elementType: TableSortLabelRoot,
    externalForwardedProps,
    ownerState,
    className: clsx_default(classes.root, className),
    ref
  });
  const [IconSlot, iconProps] = useSlot("icon", {
    elementType: TableSortLabelIcon,
    externalForwardedProps,
    ownerState,
    className: classes.icon
  });
  return (0, import_jsx_runtime2.jsxs)(RootSlot, {
    disableRipple: true,
    component: "span",
    ...rootProps,
    ...other,
    children: [children, hideSortIcon && !active ? null : (0, import_jsx_runtime2.jsx)(IconSlot, {
      as: IconComponent,
      ...iconProps
    })]
  });
});
true ? TableSortLabel.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   * @default false
   */
  active: import_prop_types.default.bool,
  /**
   * Label contents, the arrow will be appended automatically.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The current sort direction.
   * @default 'asc'
   */
  direction: import_prop_types.default.oneOf(["asc", "desc"]),
  /**
   * Hide sort icon when active is false.
   * @default false
   */
  hideSortIcon: import_prop_types.default.bool,
  /**
   * Sort icon to use.
   * @default ArrowDownwardIcon
   */
  IconComponent: import_prop_types.default.elementType,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    icon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    icon: import_prop_types.default.elementType,
    root: import_prop_types.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var TableSortLabel_default = TableSortLabel;

export {
  getTableSortLabelUtilityClass,
  tableSortLabelClasses_default,
  TableSortLabel_default
};
//# sourceMappingURL=chunk-OJ7XSYFQ.js.map
