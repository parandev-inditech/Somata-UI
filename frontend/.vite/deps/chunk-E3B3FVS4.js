import {
  IconButton_default
} from "./chunk-5T4LRVQB.js";
import {
  Paper_default
} from "./chunk-76MUKL2C.js";
import {
  createSvgIcon
} from "./chunk-RTLEF3EH.js";
import {
  createSimplePaletteValueFilter
} from "./chunk-G4FQZWC4.js";
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
  darken,
  generateUtilityClass,
  generateUtilityClasses,
  lighten,
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

// node_modules/@mui/material/esm/Alert/Alert.js
var React6 = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/material/esm/Alert/alertClasses.js
function getAlertUtilityClass(slot) {
  return generateUtilityClass("MuiAlert", slot);
}
var alertClasses = generateUtilityClasses("MuiAlert", ["root", "action", "icon", "message", "filled", "colorSuccess", "colorInfo", "colorWarning", "colorError", "filledSuccess", "filledInfo", "filledWarning", "filledError", "outlined", "outlinedSuccess", "outlinedInfo", "outlinedWarning", "outlinedError", "standard", "standardSuccess", "standardInfo", "standardWarning", "standardError"]);
var alertClasses_default = alertClasses;

// node_modules/@mui/material/esm/internal/svg-icons/SuccessOutlined.js
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var SuccessOutlined_default = createSvgIcon((0, import_jsx_runtime.jsx)("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}), "SuccessOutlined");

// node_modules/@mui/material/esm/internal/svg-icons/ReportProblemOutlined.js
var React2 = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var ReportProblemOutlined_default = createSvgIcon((0, import_jsx_runtime2.jsx)("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
}), "ReportProblemOutlined");

// node_modules/@mui/material/esm/internal/svg-icons/ErrorOutline.js
var React3 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var ErrorOutline_default = createSvgIcon((0, import_jsx_runtime3.jsx)("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "ErrorOutline");

// node_modules/@mui/material/esm/internal/svg-icons/InfoOutlined.js
var React4 = __toESM(require_react(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var InfoOutlined_default = createSvgIcon((0, import_jsx_runtime4.jsx)("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
}), "InfoOutlined");

// node_modules/@mui/material/esm/internal/svg-icons/Close.js
var React5 = __toESM(require_react(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var Close_default = createSvgIcon((0, import_jsx_runtime5.jsx)("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close");

// node_modules/@mui/material/esm/Alert/Alert.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    variant,
    color,
    severity,
    classes
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize_default(color || severity)}`, `${variant}${capitalize_default(color || severity)}`, `${variant}`],
    icon: ["icon"],
    message: ["message"],
    action: ["action"]
  };
  return composeClasses(slots, getAlertUtilityClass, classes);
};
var AlertRoot = styled_default(Paper_default, {
  name: "MuiAlert",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`${ownerState.variant}${capitalize_default(ownerState.color || ownerState.severity)}`]];
  }
})(memoTheme_default(({
  theme
}) => {
  const getColor = theme.palette.mode === "light" ? darken : lighten;
  const getBackgroundColor = theme.palette.mode === "light" ? lighten : darken;
  return {
    ...theme.typography.body2,
    backgroundColor: "transparent",
    display: "flex",
    padding: "6px 16px",
    variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: "standard"
      },
      style: {
        color: theme.vars ? theme.vars.palette.Alert[`${color}Color`] : getColor(theme.palette[color].light, 0.6),
        backgroundColor: theme.vars ? theme.vars.palette.Alert[`${color}StandardBg`] : getBackgroundColor(theme.palette[color].light, 0.9),
        [`& .${alertClasses_default.icon}`]: theme.vars ? {
          color: theme.vars.palette.Alert[`${color}IconColor`]
        } : {
          color: theme.palette[color].main
        }
      }
    })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: "outlined"
      },
      style: {
        color: theme.vars ? theme.vars.palette.Alert[`${color}Color`] : getColor(theme.palette[color].light, 0.6),
        border: `1px solid ${(theme.vars || theme).palette[color].light}`,
        [`& .${alertClasses_default.icon}`]: theme.vars ? {
          color: theme.vars.palette.Alert[`${color}IconColor`]
        } : {
          color: theme.palette[color].main
        }
      }
    })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: "filled"
      },
      style: {
        fontWeight: theme.typography.fontWeightMedium,
        ...theme.vars ? {
          color: theme.vars.palette.Alert[`${color}FilledColor`],
          backgroundColor: theme.vars.palette.Alert[`${color}FilledBg`]
        } : {
          backgroundColor: theme.palette.mode === "dark" ? theme.palette[color].dark : theme.palette[color].main,
          color: theme.palette.getContrastText(theme.palette[color].main)
        }
      }
    }))]
  };
}));
var AlertIcon = styled_default("div", {
  name: "MuiAlert",
  slot: "Icon",
  overridesResolver: (props, styles) => styles.icon
})({
  marginRight: 12,
  padding: "7px 0",
  display: "flex",
  fontSize: 22,
  opacity: 0.9
});
var AlertMessage = styled_default("div", {
  name: "MuiAlert",
  slot: "Message",
  overridesResolver: (props, styles) => styles.message
})({
  padding: "8px 0",
  minWidth: 0,
  overflow: "auto"
});
var AlertAction = styled_default("div", {
  name: "MuiAlert",
  slot: "Action",
  overridesResolver: (props, styles) => styles.action
})({
  display: "flex",
  alignItems: "flex-start",
  padding: "4px 0 0 16px",
  marginLeft: "auto",
  marginRight: -8
});
var defaultIconMapping = {
  success: (0, import_jsx_runtime6.jsx)(SuccessOutlined_default, {
    fontSize: "inherit"
  }),
  warning: (0, import_jsx_runtime6.jsx)(ReportProblemOutlined_default, {
    fontSize: "inherit"
  }),
  error: (0, import_jsx_runtime6.jsx)(ErrorOutline_default, {
    fontSize: "inherit"
  }),
  info: (0, import_jsx_runtime6.jsx)(InfoOutlined_default, {
    fontSize: "inherit"
  })
};
var Alert = React6.forwardRef(function Alert2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiAlert"
  });
  const {
    action,
    children,
    className,
    closeText = "Close",
    color,
    components = {},
    componentsProps = {},
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = "alert",
    severity = "success",
    slotProps = {},
    slots = {},
    variant = "standard",
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    severity,
    variant,
    colorSeverity: color || severity
  };
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots: {
      closeButton: components.CloseButton,
      closeIcon: components.CloseIcon,
      ...slots
    },
    slotProps: {
      ...componentsProps,
      ...slotProps
    }
  };
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref,
    shouldForwardComponentProp: true,
    className: clsx_default(classes.root, className),
    elementType: AlertRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    additionalProps: {
      role,
      elevation: 0
    }
  });
  const [IconSlot, iconSlotProps] = useSlot("icon", {
    className: classes.icon,
    elementType: AlertIcon,
    externalForwardedProps,
    ownerState
  });
  const [MessageSlot, messageSlotProps] = useSlot("message", {
    className: classes.message,
    elementType: AlertMessage,
    externalForwardedProps,
    ownerState
  });
  const [ActionSlot, actionSlotProps] = useSlot("action", {
    className: classes.action,
    elementType: AlertAction,
    externalForwardedProps,
    ownerState
  });
  const [CloseButtonSlot, closeButtonProps] = useSlot("closeButton", {
    elementType: IconButton_default,
    externalForwardedProps,
    ownerState
  });
  const [CloseIconSlot, closeIconProps] = useSlot("closeIcon", {
    elementType: Close_default,
    externalForwardedProps,
    ownerState
  });
  return (0, import_jsx_runtime6.jsxs)(RootSlot, {
    ...rootSlotProps,
    children: [icon !== false ? (0, import_jsx_runtime6.jsx)(IconSlot, {
      ...iconSlotProps,
      children: icon || iconMapping[severity] || defaultIconMapping[severity]
    }) : null, (0, import_jsx_runtime6.jsx)(MessageSlot, {
      ...messageSlotProps,
      children
    }), action != null ? (0, import_jsx_runtime6.jsx)(ActionSlot, {
      ...actionSlotProps,
      children: action
    }) : null, action == null && onClose ? (0, import_jsx_runtime6.jsx)(ActionSlot, {
      ...actionSlotProps,
      children: (0, import_jsx_runtime6.jsx)(CloseButtonSlot, {
        size: "small",
        "aria-label": closeText,
        title: closeText,
        color: "inherit",
        onClick: onClose,
        ...closeButtonProps,
        children: (0, import_jsx_runtime6.jsx)(CloseIconSlot, {
          fontSize: "small",
          ...closeIconProps
        })
      })
    }) : null]
  });
});
true ? Alert.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: import_prop_types.default.node,
  /**
   * The content of the component.
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
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: import_prop_types.default.string,
  /**
   * The color of the component. Unless provided, the value is taken from the `severity` prop.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["error", "info", "success", "warning"]), import_prop_types.default.string]),
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components: import_prop_types.default.shape({
    CloseButton: import_prop_types.default.elementType,
    CloseIcon: import_prop_types.default.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps: import_prop_types.default.shape({
    closeButton: import_prop_types.default.object,
    closeIcon: import_prop_types.default.object
  }),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   * Set to `false` to remove the `icon`.
   */
  icon: import_prop_types.default.node,
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: import_prop_types.default.shape({
    error: import_prop_types.default.node,
    info: import_prop_types.default.node,
    success: import_prop_types.default.node,
    warning: import_prop_types.default.node
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: import_prop_types.default.func,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: import_prop_types.default.string,
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["error", "info", "success", "warning"]), import_prop_types.default.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    action: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    closeButton: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    closeIcon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    icon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    message: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    action: import_prop_types.default.elementType,
    closeButton: import_prop_types.default.elementType,
    closeIcon: import_prop_types.default.elementType,
    icon: import_prop_types.default.elementType,
    message: import_prop_types.default.elementType,
    root: import_prop_types.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["filled", "outlined", "standard"]), import_prop_types.default.string])
} : void 0;
var Alert_default = Alert;

export {
  getAlertUtilityClass,
  alertClasses_default,
  Close_default,
  Alert_default
};
//# sourceMappingURL=chunk-E3B3FVS4.js.map
