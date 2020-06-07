// import original module declarations
import "styled-components";
// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    mode: string;
    styles: {
      main: {
        bg: string;
        color: string;
      };

      nav: {
        navBgNoSticky: string;
        navBgSticky: string;
        navColor: string;
        navToggllerBtn: string;
      };

      aboutPageUpperSect: {
        InfoCard: {
          bg: string;
          headerColor: string;
          subHeader: string;
          textColor: string;
          twitterColor: string;
          githubColor: string;
          linkedin: string;
        };
        TextOnLeft: {
          textColor: string;
          headerColor: string;
          buttonBg: string;
        };
      };
    };
  }
}
