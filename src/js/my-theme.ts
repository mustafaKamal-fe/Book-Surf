import { DefaultTheme } from "styled-components";

const lightTheme: DefaultTheme = {
  mode: "light",
  styles: {
    main: {
      bg: "#fafafa",
      color: "black",
    },
    nav: {
      navBgNoSticky: "transparent",
      navBgSticky: "#ffffff",
      navColor: "#826666",
      navToggllerBtn: "#fcff33",
    },
    aboutPageUpperSect: {
      InfoCard: {
        bg: "#fafafa",
        headerColor: "black",
        subHeader: "rgba(0,0,0,0.6)",
        textColor: "rgba(0,0,0,0.6)",
        twitterColor: "#1da1f2",
        githubColor: "black",
        linkedin: "#0077b5",
      },
      TextOnLeft: {
        textColor: "rgba(0,0,0,0.6)",
        headerColor: "black",
        buttonBg: "rgba(0,0,0,0.2)",
      },
    },
  },
};

export default lightTheme;
