"use client";

import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

const ClientOnly =
  // https://chakra-ui.com/docs/components/client-only
  ({ children, fallback }) => {
    const [state, setState] = useState();

    useEffect(() => {
      setState(true);
    }, []);

    return state ? children : fallback;
  };

export const InView = ({
  children,
  persist, // https://react.dev/reference/react/Activity
  triggerOnce,
  unwrap = true,
  wrapper: Wrapper = "div",
}) => {
  const [ref, entry] = useIntersectionObserver();

  const WrapperProps = {
    "data-inview": entry?.isIntersecting,
  };

  if (WrapperProps["data-inview"] && triggerOnce)
    return unwrap ? children : <Wrapper {...WrapperProps}>{children}</Wrapper>;

  return (
    <Wrapper ref={ref} {...WrapperProps}>
      {WrapperProps["data-inview"] && children}
    </Wrapper>
  );
};

export const InViewClientOnly = ({
  children,
  fallback = children,
  triggerOnce = true,
  ...props
}) => (
  <ClientOnly fallback={fallback}>
    <InView triggerOnce={triggerOnce} {...props}>
      {children}
    </InView>
  </ClientOnly>
);
