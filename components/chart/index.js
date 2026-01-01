"use client";

import {
  Chart as Chart1,
  Series,
  Subtitle,
  Title,
  XAxis,
  YAxis,
} from "@highcharts/react";
import { Accessibility } from "@highcharts/react/options/Accessibility";
import { Exporting } from "@highcharts/react/options/Exporting";

import { ClientInView } from "@/components/in-view";
import { titleCase } from "@/utils/title-case";

import "./index.css";
import themeOptions from "./theme-options";

export const Chart = ({
  series,
  subtitle,
  title = "",
  XAxisProps,
  YAxisProps,
  ...props
}) => (
  <ClientInView>
    <Chart1 options={{ ...themeOptions, ...props }}>
      <Title>{titleCase(title)}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {series.map(({ data, ...props }) => (
        <Series
          data={data.map(({ name, ...rest }) => ({
            name: titleCase(name),
            ...rest,
          }))}
          {...props}
        />
      ))}
      <XAxis {...XAxisProps} />
      <YAxis {...YAxisProps} />
      <Accessibility />
      <Exporting />
    </Chart1>
  </ClientInView>
);
