import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { SearchField } from "./SearchField";
import { Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core";
import OverlayContext, {
  CollapseFromOverLay,
} from "../overlayContext/OverlayContext";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  LinkName: {
    "@media(max-width: 500px)": {
      display: "none",
    },
  },
  iconOnMob: {
    fontSize: "1.5rem",
    "@media(min-width: 500px)": {
      display: "none",
    },
  },
});
const MyNav = styled.nav<{ scrolled: string; clickedFromOverlay: string }>`
  z-index: 1003;
  background-color: ${(props) =>
    props.scrolled === "true"
      ? props.theme.styles.nav.navBgSticky
      : props.theme.styles.nav.navBgNoSticky};
  box-shadow: ${(props) =>
    props.clickedFromOverlay === "true"
      ? "none"
      : props.scrolled === "true"
      ? "1px 2px 18px rgba(0,0,0,.1)"
      : "none"};
  padding: ${(props) =>
    props.clickedFromOverlay === "true"
      ? "4rem 1rem"
      : props.scrolled === "true"
      ? "1rem"
      : "4rem 1rem"};
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  transition: padding 0.2s ease-in;
  @media (max-width: 500px) {
    padding: ${(props) =>
      props.scrolled === "true" ? "1rem 0 1rem 0" : "2rem 0 2rem 0"};
    flex-direction: column;
  }
`;
const MyItems = styled.ul<{ scrolled: string }>`
  margin: 0;
  display: flex;
  align-items: center;
  @media (max-width: 760px) {
    margin: 0.8rem 0 0 0;
    padding: 0;
  }
`;
const GoTo = styled(Button)<{ scrolled?: string }>`
  &:focus {
    outline: none;
  }

  & * :focus {
    outline: none;
  }

  margin: ${(props) => (props.scrolled === "true" ? "1rem" : "0 1rem 0 1rem")};
  @media (max-width: 500px) {
    margin-left: 0;
    margin-right: 0;
  }
  & * {
    color: ${(props) => props.theme.styles.nav.navColor};
    text-decoration: none;
  }
  & *:hover {
    text-decoration: none;
  }
`;

export const HeaderNavbar = () => {
  // context to track if slide was collapsed by clicking on overlay
  const [clickedFromOverlay] = useContext(CollapseFromOverLay);
  // track overlay state if to appear on screen or not
  const [overlayContext, setOverlayContext] = useContext(OverlayContext);
  const styles = useStyles();
  // track if navbar is shrinking on scroll or not
  const [isScrolled, setIsScroled] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 760 ? true : false
  );

  // when collapse slide from clicking on overlay upated navbar appearance state
  // when on y <= 0 keep the navbar shrunk (less padding).. do the opposite on y > 0
  useEffect(() => {
    if (window.scrollY <= 0) {
      if (clickedFromOverlay) setIsScroled(false);
    }
    if (window.scrollY > 0) {
      if (clickedFromOverlay) setIsScroled(true);
    }
  }, [isScrolled, clickedFromOverlay]);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      e.preventDefault();
      if (window.innerWidth < 760 && !isMobile) {
        setIsMobile(true);
      }
      if (window.innerWidth > 760 && isMobile) {
        setIsMobile(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 760 ? true : false);
  }, [isMobile]);

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      e.preventDefault();
      setIsScroled((s) => {
        if (s !== true && window.pageYOffset > 0 && !overlayContext) {
          return true;
        } else {
          if (window.pageYOffset === 0) {
            return false;
          } else {
            return true;
          }
        }
      });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <MyNav
      scrolled={isScrolled ? "true" : "false"}
      clickedFromOverlay={
        clickedFromOverlay && window.scrollY <= 0 ? "true" : "false"
      }
    >
      <SearchField />
      <MyItems scrolled={isScrolled ? "true" : "false"}>
        <GoTo scrolled={isScrolled ? "true" : "false"}>
          <Link to="/">
            <Typography variant="button" display="block">
              <FontAwesomeIcon icon="home" className={styles.iconOnMob} />
              <span className={styles.LinkName}>Home</span>
            </Typography>
          </Link>
        </GoTo>

        <GoTo
          onClick={(e: any) => {
            e.preventDefault();
            if (window.scrollY > 0) {
              setIsScroled(true);
              setOverlayContext(!overlayContext);
            }

            if (window.scrollY <= 0) {
              setOverlayContext(!overlayContext);
              setIsScroled(!isScrolled);
            }
          }}
        >
          <Typography variant="button" display="block">
            <FontAwesomeIcon icon="search" className={styles.iconOnMob} />
            <span className={styles.LinkName}>Search</span>
          </Typography>
        </GoTo>

        <GoTo scrolled={isScrolled ? "true" : "false"}>
          <Link to="/contribute">
            <Typography variant="button" display="block">
              <FontAwesomeIcon
                icon={["fab", "github"]}
                className={styles.iconOnMob}
              />{" "}
              <span className={styles.LinkName}>Contribute</span>
            </Typography>
          </Link>
        </GoTo>
        <GoTo scrolled={isScrolled ? "true" : "false"}>
          <Link to="/about/creator">
            <Typography variant="button" display="block">
              <FontAwesomeIcon icon="user" className={styles.iconOnMob} />
              <span className={styles.LinkName}>About</span>
            </Typography>
          </Link>
        </GoTo>
      </MyItems>
      {/* <NavLine scrolled={isScrolled ? "true" : "false"} /> */}
    </MyNav>
  );
};
