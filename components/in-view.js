"use client";

import { useProgress } from "@bprogress/next";
import { useIntersectionObserver, useIsClient } from "@uidotdev/usehooks";
import { Activity, useEffect, useEffectEvent } from "react";

const useProgressWhen = (isLoading) => {
  const progress = useProgress();

  const effectEvent = useEffectEvent(() => {
    progress[isLoading ? "start" : "stop"]();
  });

  useEffect(effectEvent);
};

const ClientOnly =
  // https://chakra-ui.com/docs/components/client-only
  ({ children, fallback }) => {
    const isClient = useIsClient();

    useProgressWhen(!isClient);

    return isClient ? <Activity>{children}</Activity> : fallback;
  };

export const InView = ({
  children,
  persist,
  triggerOnce,
  unwrap = true,
  wrapper: Wrapper = "div",
}) => {
  children = <Activity>{children}</Activity>;

  const [ref, entry] = useIntersectionObserver();

  const WrapperProps = {
    "data-inview": entry?.isIntersecting,
  };

  if (WrapperProps["data-inview"] && triggerOnce)
    return unwrap ? children : <Wrapper {...WrapperProps}>{children}</Wrapper>;

  return (
    <Wrapper ref={ref} {...WrapperProps}>
      {persist ? (
        <Activity mode={WrapperProps["data-inview"] ? "visible" : "hidden"}>
          {children}
        </Activity>
      ) : (
        WrapperProps["data-inview"] && children
      )}
    </Wrapper>
  );
};

export const PrerenderInView = ({
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
