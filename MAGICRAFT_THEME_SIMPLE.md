# MagicCraft Theme - Simplified Implementation

## 🧙‍♂️ **MagicCraft Browser Wallet Theme**

### **1. Tailwind Configuration (`tailwind.config.js`)**

```javascript
const theme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.{html,js,mjs}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // MagicCraft Theme Colors
          darkaccent: "#1A1B2F", // Deep midnight blue
          darkbg: "#1A1B2F", // Deep midnight blue background
          dark: "#1A1B2F", // Deep midnight blue
          darkblue: "#1A1B2F", // Deep midnight blue
          darklight: "#2A2B4F", // Lighter midnight blue
          main: "#6E4B9E", // Arcane purple
          font: "#E8E8F0", // Light text on dark background
          darkgray: "#2A2B4F", // Lighter midnight blue
          // Primary accent colors
          redone: "#F1C40F", // Shimmering gold accent
          redtwo: "#F1C40F", // Shimmering gold accent
          // Additional MagicCraft colors
          magicpurple: "#6E4B9E", // Arcane purple
          magicgold: "#F1C40F", // Shimmering gold
          magicblue: "#1A1B2F", // Deep midnight blue
          magicblueLight: "#2A2B4F", // Lighter midnight blue
          magicblueDark: "#0F1020", // Darker midnight blue
        },
      },
      boxShadow: {
        buttonaccent: "0px 5px 25px rgba(241, 196, 15, 0.25)", // MagicCraft gold glow
        buttonsecondary: "0px 4px 15px rgba(110, 75, 158, 0.15)", // MagicCraft purple glow
        addaccountmodal:
          "inset 0px 0px 7px rgba(241, 196, 15, 0.1), inset 0px 1px 1px rgba(110, 75, 158, 0.2)",
        receiveqrcode:
          "inset 0px 0px 7px rgba(241, 196, 15, 0.1), inset 0px 1px 1px rgba(241, 196, 15, 0.2)",
        approvestack: "0px -1px 1px #6E4B9E",
        "popup-bg": "0px -10px 24px 0px rgba(26, 27, 47, 0.4)",
        "popup-nav": "0px -10px 24px 0px rgba(26, 27, 47, 0.6)",
      },
      backgroundImage: {
        buttonaccent:
          "linear-gradient(259.09deg, rgba(241, 196, 15, var(--tw-bg-opacity)) -1.03%, rgba(241, 196, 15, var(--tw-bg-opacity)) 198.87%)",
        radio: "linear-gradient(275.43deg, #F1C40F 13.81%, #F1C40F 111.89%)",
        activity: "linear-gradient(220deg, #6E4B9E 0.11%, #6E4B9E 90.88%)",
        magiccraftbg:
          "linear-gradient(135deg, #1A1B2F 0%, #2A2B4F 50%, #6E4B9E 100%)",
        magiccraftcard: "linear-gradient(145deg, #2A2B4F 0%, #1A1B2F 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

### **2. Main CSS Theme (`src/app/styles/index.css`)**

```css
@import "inter-ui/inter-variable.css";

/* MagicCraft Theme - Main Background */
.brandbg-main,
.brandbg-popup {
  background: radial-gradient(
      30.26% 62.3% at 93.12% 25.55%,
      rgba(110, 75, 158, 0.15) 0%,
      rgba(26, 27, 47, 0) 100%
    ),
    radial-gradient(
      43.61% 135.15% at 0% 77.51%,
      rgba(241, 196, 15, 0.08) 0%,
      rgba(26, 27, 47, 0) 100%
    ),
    #1a1b2f;
}

.brandbg-main-fallback,
.brandbg-popup-fallback {
  background-color: #1a1b2f;
}

/* MagicCraft Theme - Secondary Modal */
.brandbg-secondary-modal {
  background: radial-gradient(
      33.62% 91.96% at 64.57% 13.41%,
      #6e4b9e 0%,
      rgba(26, 27, 47, 0) 78.62%
    ),
    linear-gradient(115.9deg, #2a2b4f 7.71%, #1a1b2f 44.05%, #0f1020 66.44%);
  border: 1px solid rgba(241, 196, 15, 0.2);
}

/* TailwindCSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  /* MagicCraft Styled Icons */
  svg.styled-icon * {
    transition-property: all;
    transition-duration: 200ms;
    transition-timing-function: ease-in;
  }

  .styled-icon {
    --color-1: #6e4b9e;
    --color-2: #2a2b4f;
    --color-3: #1a1b2f;
    --color-4: #2a2b4f;
  }

  .styled-icon--hover {
    --color-1: #f1c40f;
    --color-2: #6e4b9e;
    --color-3: #1a1b2f;
    --color-4: #6e4b9e;
  }

  .styled-icon--active {
    --color-1: #f1c40f;
    --color-2: #6e4b9e;
    --color-3: #6e4b9e;
    --color-4: #f1c40f;
  }

  .styled-icon--pending {
    --color-1: #f1c40f;
    --color-2: #6e4b9e;
    --color-3: #6e4b9e;
    --color-4: #f1c40f;
  }

  .styled-icon--pending path[class$="active-element"] {
    animation: styled-icon--pending-pulse 2.5s infinite;
  }

  .styled-icon--pending path[class$="active-element--fill"] {
    animation: styled-icon-fill--pending-pulse 2.5s infinite;
  }

  /* MagicCraft Animations */
  @keyframes styled-icon--pending-pulse {
    0% {
      stroke: var(--color-1);
    }
    50% {
      stroke: #f1c40f;
    }
    100% {
      stroke: var(--color-1);
    }
  }

  @keyframes styled-icon-fill--pending-pulse {
    0% {
      fill: var(--color-1);
    }
    50% {
      fill: #f1c40f;
    }
    100% {
      fill: var(--color-1);
    }
  }

  .styled-label--pending {
    animation: styled-label--pending-pulse 2.5s infinite;
  }

  @keyframes styled-label--pending-pulse {
    0% {
      color: inherit;
    }
    50% {
      color: #f1c40f;
    }
    100% {
      color: inherit;
    }
  }

  /* MagicCraft Shadow Pulse */
  .shadow-pulse {
    animation: brand-shadow-pulse 2.5s infinite;
  }
  .shadow-pulse:hover {
    animation: none;
  }

  @keyframes brand-shadow-pulse {
    0% {
      box-shadow: 0 5px 25px rgba(241, 196, 15, 0);
    }
    50% {
      box-shadow: 0 5px 25px rgba(241, 196, 15, 0.5);
    }
    100% {
      box-shadow: 0 5px 25px rgba(241, 196, 15, 0);
    }
  }

  /* MagicCraft Spinner */
  .atom-spinner {
    transform: rotateZ(45deg);
    perspective: 1000px;
    border-radius: 50%;
    color: #f1c40f;
  }
  .atom-spinner:before,
  .atom-spinner:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s atom-spin linear infinite;
  }
  .atom-spinner:before {
    animation-delay: -0.4s;
  }
  .atom-spinner:after {
    color: #6e4b9e;
    transform: rotateY(70deg);
  }

  @keyframes atom-spin {
    0%,
    100% {
      box-shadow: 0.2em 0px 0 0px currentcolor;
    }
    12% {
      box-shadow: 0.2em 0.2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 0.2em 0 0px currentcolor;
    }
    37% {
      box-shadow: -0.2em 0.2em 0 0 currentcolor;
    }
    50% {
      box-shadow: -0.2em 0 0 0 currentcolor;
    }
    62% {
      box-shadow: -0.2em -0.2em 0 0 currentcolor;
    }
    75% {
      box-shadow: 0px -0.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: 0.2em -0.2em 0 0 currentcolor;
    }
  }
}
```

### **3. Material-UI Theme Configuration (`packages/lifi-widget/config/theme.ts`)**

```typescript
import {
  createTheme as createMuiTheme,
  lighten,
  darken,
} from "@mui/material/styles";

const palette = {
  primary: {
    main: "#F1C40F", // MagicCraft shimmering gold
    light: lighten("#F1C40F", 0.3),
    dark: darken("#F1C40F", 0.2),
  },
  secondary: {
    main: "#6E4B9E", // MagicCraft arcane purple
    light: lighten("#6E4B9E", 0.3),
    dark: darken("#6E4B9E", 0.2),
  },
  success: {
    main: "#0AA65B",
  },
  warning: {
    main: "#F1C40F", // MagicCraft gold for warnings
  },
  error: {
    main: "#E5452F",
  },
  info: {
    main: "#6E4B9E", // MagicCraft purple for info
  },
};

const paletteDark = {
  background: {
    paper: "#1A1B2F", // MagicCraft deep midnight blue
  },
};

const shape = {
  borderRadius: 12,
  borderRadiusSecondary: 8,
};

export const createTheme = (mode: PaletteMode, theme: ThemeConfig = {}) => {
  return createMuiTheme({
    typography: {
      fontFamily: "Inter var, Inter, sans-serif",
      ...theme.typography,
    },
    palette: {
      mode,
      ...palette,
      ...(mode === "dark" ? paletteDark : {}),
      ...theme.palette,
    },
    shape: {
      ...shape,
      ...theme.shape,
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: shape.borderRadiusSecondary,
            textTransform: "none",
            fontSize: "1rem",
          },
        },
      },
    },
  });
};
```

### **4. Component Override CSS (`packages/lifi-widget/override.css`)**

```css
/* MagicCraft Hover States */
.MuiBox-root.withHover:hover {
  background: #2a2b4f !important;
}

.withHover:hover {
  background: #2a2b4f !important;
}

.MuiBox-root.withHoverGray:hover {
  background: #1a1b2f !important;
}

/* MagicCraft Scrollbar */
::-webkit-scrollbar {
  background: #1a1b2f;
  width: 5px;
  position: absolute;
  right: 0;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

::-webkit-scrollbar-track-piece {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background: rgb(241 196 15 / 0.2);
  border-radius: 3px;
  border: 1px solid rgb(110, 75, 158);
}

/* MagicCraft Switcher */
.switcher {
  width: 48px;
  height: 28px;
  border-radius: 20px;
  background: #2a2b4f;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.switcher.active {
  background: #f1c40f;
  justify-content: flex-end;
}

.switcher .point {
  width: 20px;
  height: 20px;
  background: #6e4b9e;
  border-radius: 100%;
  margin: 0 5px;
}

.switcher.active .point {
  background: #1a1b2f;
}

/* MagicCraft Route Indicators */
.routeEllips {
  width: 24px;
  height: 24px;
  background: #6e4b9e;
  border-radius: 100%;
  margin-right: 12px;
  position: relative;
  top: 2px;
}

.routeEllips.selected {
  background: #f1c40f;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* MagicCraft Transaction Status */
.txStatus {
  color: #000;
  text-align: center;
  font-size: 10px;
  font-weight: 510;
  line-height: 14.068px;
  padding: 8px;
  border-radius: 6px;
}

.txStatus.complete {
  background: #f1c40f;
}

.txStatus.progress {
  background: #6e4b9e;
}
```

### **5. Color Palette Reference**

```css
/* MagicCraft Color Variables */
:root {
  --magiccraft-midnight-blue: #1a1b2f;
  --magiccraft-midnight-blue-light: #2a2b4f;
  --magiccraft-midnight-blue-dark: #0f1020;
  --magiccraft-arcane-purple: #6e4b9e;
  --magiccraft-shimmering-gold: #f1c40f;
  --magiccraft-text-light: #e8e8f0;
}
```

### **6. Usage Examples**

```jsx
// Button with MagicCraft theme
<button className="bg-brand-redone text-brand-darkaccent shadow-buttonaccent hover:shadow-buttonaccent">
  Send Transaction
</button>

// Card with MagicCraft background
<div className="bg-brand-darkbg border border-brand-main rounded-lg p-4">
  <h3 className="text-brand-font">Wallet Balance</h3>
</div>

// Loading spinner
<div className="atom-spinner w-8 h-8"></div>

// MagicCraft gradient background
<div className="bg-gradient-to-br from-brand-darkbg via-brand-darklight to-brand-main">
  Content here
</div>
```

---

## 🎯 **Implementation Steps for Your Fork:**

1. **Copy the Tailwind config** to your `tailwind.config.js`
2. **Copy the main CSS** to your `src/app/styles/index.css`
3. **Copy the Material-UI theme** to your theme configuration
4. **Copy the override CSS** to your component styles
5. **Update your components** to use the new color classes

## 🌟 **MagicCraft Theme Features:**

- ✨ **Deep Midnight Blue** backgrounds (#1A1B2F)
- 🌟 **Arcane Purple** accents (#6E4B9E)
- ⚡ **Shimmering Gold** highlights (#F1C40F)
- 🎭 **Magical gradients** and glows
- 🔮 **Wizard's spellbook** aesthetic
- 📱 **Responsive** and accessible design

This simplified version contains all the essential MagicCraft theme code you need to implement in your fork project!
