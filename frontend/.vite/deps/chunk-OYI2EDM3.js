import {
  ClassNameGenerator_default,
  clsx_default,
  debounce,
  deprecatedPropType,
  ownerDocument,
  ownerWindow,
  setRef
} from "./chunk-XZ2KZWCD.js";

// node_modules/@mui/material/esm/utils/debounce.js
var debounce_default = debounce;

// node_modules/@mui/material/esm/utils/deprecatedPropType.js
var deprecatedPropType_default = deprecatedPropType;

// node_modules/@mui/material/esm/utils/ownerDocument.js
var ownerDocument_default = ownerDocument;

// node_modules/@mui/material/esm/utils/ownerWindow.js
var ownerWindow_default = ownerWindow;

// node_modules/@mui/material/esm/utils/setRef.js
var setRef_default = setRef;

// node_modules/@mui/material/esm/utils/mergeSlotProps.js
function isEventHandler(key, value) {
  const thirdCharCode = key.charCodeAt(2);
  return key[0] === "o" && key[1] === "n" && thirdCharCode >= 65 && thirdCharCode <= 90 && typeof value === "function";
}
function mergeSlotProps(externalSlotProps, defaultSlotProps) {
  if (!externalSlotProps) {
    return defaultSlotProps;
  }
  function extractHandlers(externalSlotPropsValue, defaultSlotPropsValue) {
    const handlers2 = {};
    Object.keys(defaultSlotPropsValue).forEach((key) => {
      if (isEventHandler(key, defaultSlotPropsValue[key]) && typeof externalSlotPropsValue[key] === "function") {
        handlers2[key] = (...args) => {
          externalSlotPropsValue[key](...args);
          defaultSlotPropsValue[key](...args);
        };
      }
    });
    return handlers2;
  }
  if (typeof externalSlotProps === "function" || typeof defaultSlotProps === "function") {
    return (ownerState) => {
      const defaultSlotPropsValue = typeof defaultSlotProps === "function" ? defaultSlotProps(ownerState) : defaultSlotProps;
      const externalSlotPropsValue = typeof externalSlotProps === "function" ? externalSlotProps({
        ...ownerState,
        ...defaultSlotPropsValue
      }) : externalSlotProps;
      const className2 = clsx_default(ownerState == null ? void 0 : ownerState.className, defaultSlotPropsValue == null ? void 0 : defaultSlotPropsValue.className, externalSlotPropsValue == null ? void 0 : externalSlotPropsValue.className);
      const handlers2 = extractHandlers(externalSlotPropsValue, defaultSlotPropsValue);
      return {
        ...defaultSlotPropsValue,
        ...externalSlotPropsValue,
        ...handlers2,
        ...!!className2 && {
          className: className2
        },
        ...(defaultSlotPropsValue == null ? void 0 : defaultSlotPropsValue.style) && (externalSlotPropsValue == null ? void 0 : externalSlotPropsValue.style) && {
          style: {
            ...defaultSlotPropsValue.style,
            ...externalSlotPropsValue.style
          }
        },
        ...(defaultSlotPropsValue == null ? void 0 : defaultSlotPropsValue.sx) && (externalSlotPropsValue == null ? void 0 : externalSlotPropsValue.sx) && {
          sx: [...Array.isArray(defaultSlotPropsValue.sx) ? defaultSlotPropsValue.sx : [defaultSlotPropsValue.sx], ...Array.isArray(externalSlotPropsValue.sx) ? externalSlotPropsValue.sx : [externalSlotPropsValue.sx]]
        }
      };
    };
  }
  const typedDefaultSlotProps = defaultSlotProps;
  const handlers = extractHandlers(externalSlotProps, typedDefaultSlotProps);
  const className = clsx_default(typedDefaultSlotProps == null ? void 0 : typedDefaultSlotProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  return {
    ...defaultSlotProps,
    ...externalSlotProps,
    ...handlers,
    ...!!className && {
      className
    },
    ...(typedDefaultSlotProps == null ? void 0 : typedDefaultSlotProps.style) && (externalSlotProps == null ? void 0 : externalSlotProps.style) && {
      style: {
        ...typedDefaultSlotProps.style,
        ...externalSlotProps.style
      }
    },
    ...(typedDefaultSlotProps == null ? void 0 : typedDefaultSlotProps.sx) && (externalSlotProps == null ? void 0 : externalSlotProps.sx) && {
      sx: [...Array.isArray(typedDefaultSlotProps.sx) ? typedDefaultSlotProps.sx : [typedDefaultSlotProps.sx], ...Array.isArray(externalSlotProps.sx) ? externalSlotProps.sx : [externalSlotProps.sx]]
    }
  };
}

// node_modules/@mui/material/esm/utils/index.js
var unstable_ClassNameGenerator = {
  configure: (generator) => {
    if (true) {
      console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join("\n"));
    }
    ClassNameGenerator_default.configure(generator);
  }
};

export {
  debounce_default,
  deprecatedPropType_default,
  ownerDocument_default,
  ownerWindow_default,
  setRef_default,
  mergeSlotProps,
  unstable_ClassNameGenerator
};
//# sourceMappingURL=chunk-OYI2EDM3.js.map
