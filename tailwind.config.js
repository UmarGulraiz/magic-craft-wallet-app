const theme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.{html,js,mjs}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // MagicCraft Theme Colors
          darkaccent: "#1A1B2F", // Deep midnight blue
          darkbg: "#1A1B2F", // Deep midnight blue background
          lightgray: "#E4E4E4",
          redone: "#F1C40F", // Shimmering gold accent
          redtwo: "#F1C40F", // Shimmering gold accent
          dark: "#1A1B2F", // Deep midnight blue
          darkblue: "#1A1B2F", // Deep midnight blue
          darklight: "#2A2B4F", // Lighter midnight blue
          light: "#F8FCFD",
          main: "#6E4B9E", // Arcane purple
          inactivelight: "#BFC8CA",
          font: "#E8E8F0", // Light text on dark background
          inactivedark: "#8D9C9E",
          gray: "#AAB0B1",
          darkgray: "#2A2B4F", // Lighter midnight blue
          placeholder: "#717A7B",
          disabledbackground: "#343434",
          disabledcolor: "#606668",
          inactivedark2: "#91999B",
          redobject: "#B82D41",
          redtext: "#EA556A",
          greenobject: "#4F9A5E",
          // Additional MagicCraft colors
          magicpurple: "#6E4B9E", // Arcane purple
          magicgold: "#F1C40F", // Shimmering gold
          magicblue: "#1A1B2F", // Deep midnight blue
          magicblueLight: "#2A2B4F", // Lighter midnight blue
          magicblueDark: "#0F1020", // Darker midnight blue
        },
      },
      fontFamily: {
        sans: ["InterVariable", ...theme.fontFamily.sans],
      },
      animation: {
        bootfadein: "fadein 0.15s ease-in",
        bootfadeinslow: "fadein 0.3s ease-in",
        bootfadeinfast: "fadein 0.1s ease-in",
        dialogcontent:
          "dialogfadein 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "waving-hand": "wave 2s linear infinite",
        modalcontent: "modalfadein 0.2s ease-out",
        modalcontentOut: "modalfadeout 0.35s ease-out",
        modalcontentinnerOut: "modalinnerfadeout 0.35s ease-out",
        activitybar:
          "barclimb 0.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
        stripeloading:
          "stripeloading 3s cubic-bezier(0.16, 1, 0.3, 1) 0.2s infinite",
      },
      keyframes: {
        fadein: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        dialogfadein: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(.96)",
          },
          to: {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
        barclimb: {
          from: {
            transform: "translate(-50%, 150%)",
          },
          to: {
            transform: "translate(-50%, 0)",
          },
        },
        modalfadein: {
          from: {
            opacity: "0",
            transform: "scale(1.04)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        modalfadeout: {
          "40%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        modalinnerfadeout: {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "60%": {
            transform: "scale(.9)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(.9)",
            opacity: "0",
          },
        },
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        stripeloading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(300%)" },
        },
      },
      boxShadow: {
        buttonaccent: "0px 5px 25px rgba(241, 196, 15, 0.25)", // MagicCraft gold glow
        buttondanger: "0px 5px 25px rgba(254, 0, 0, 0.05)",
        buttonsecondary: "0px 4px 15px rgba(110, 75, 158, 0.15)", // MagicCraft purple glow
        addaccountmodal:
          "inset 0px 0px 7px rgba(241, 196, 15, 0.1), inset 0px 1px 1px rgba(110, 75, 158, 0.2)",
        receiveqrcode:
          "inset 0px 0px 7px rgba(241, 196, 15, 0.1), inset 0px 1px 1px rgba(241, 196, 15, 0.2)",
        approvestack: "0px -1px 1px #6E4B9E",
        "popup-bg": "0px -10px 24px 0px rgba(26, 27, 47, 0.4)",
        "popup-nav": "0px -10px 24px 0px rgba(26, 27, 47, 0.6)",
      },
      dropShadow: {
        profileinitial: "0px 2px 5px rgba(112, 113, 129, 0.37)",
      },
      backgroundImage: {
        buttonaccent:
          "linear-gradient(259.09deg, rgba(241, 196, 15, var(--tw-bg-opacity)) -1.03%, rgba(241, 196, 15, var(--tw-bg-opacity)) 198.87%)",
        radio: "linear-gradient(275.43deg, #F1C40F 13.81%, #F1C40F 111.89%)",
        activity: "linear-gradient(220deg, #6E4B9E 0.11%, #6E4B9E 90.88%)",
        addaccountcontinue:
          "linear-gradient(90.44deg, rgba(26, 27, 47, 0.95) 2.88%, rgba(42, 43, 79, 0.95) 21.54%, rgba(26, 27, 47, 0.95) 41.08%, rgba(110, 75, 158, 0.95) 81.76%, rgba(26, 27, 47, 0.95) 97.51%)",
        magiccraftbg:
          "linear-gradient(135deg, #1A1B2F 0%, #2A2B4F 50%, #6E4B9E 100%)",
        magiccraftcard: "linear-gradient(145deg, #2A2B4F 0%, #1A1B2F 100%)",
      },
      screens: {
        mmd: { max: "767px" },
        mxs: { max: "420px" },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addVariant, e, postcss }) => {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`,
          )}`;
        });
      });
    }),
  ],
};
