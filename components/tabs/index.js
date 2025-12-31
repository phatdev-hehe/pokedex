import { kebabCase } from "change-case";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import removeAccents from "remove-accents";

import { noContent } from "@/components";
import { PrerenderInView } from "@/components/in-view";
import { titleCase } from "@/utils/title-case";

import "./index.css";

export const tabs = (tabs = {}) => {
  if (Object.keys(tabs).length)
    return (
      <PrerenderInView>
        <Tabs
          items={Object.keys(tabs).map(titleCase)}
          style={{
            backgroundColor: "unset",
            border: "unset",
          }}
          updateAnchor
        >
          {Object.entries(tabs).map((tab) => {
            const id = kebabCase(removeAccents(tab[0]));

            return (
              <Tab
                id={id}
                key={id}
                style={{
                  backgroundColor: "unset",
                  overflow: "auto",
                  paddingInline: "unset",
                }}
                value={titleCase(tab[0])}
              >
                <PrerenderInView>{tab[1] ?? noContent()}</PrerenderInView>
              </Tab>
            );
          })}
        </Tabs>
      </PrerenderInView>
    );
};
