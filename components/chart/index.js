"use client";

import { titleCase } from "@/utils/title-case";
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
import "./index.css";

// https://www.highcharts.com/samples/highcharts/css/palette-helper
// https://github.com/highcharts/highcharts/blob/ad4f5d9c525f6b0de1ce8f2a05ff3339bbe05f89/ts/Extensions/Themes/Adaptive.ts
import themeOptions from "./theme-options";

export const Chart = ({
  title = "",
  subtitle,
  series,
  XAxisProps,
  YAxisProps,
  ...props
}) => (
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
);
