// https://www.highcharts.com/samples/highcharts/css/palette-helper
// https://github.com/highcharts/highcharts/blob/ad4f5d9c525f6b0de1ce8f2a05ff3339bbe05f89/ts/Extensions/Themes/Adaptive.ts

export default {
  accessibility: {
    keyboardNavigation: {
      focusBorder: {
        style: {
          color: "var(--highcharts-highlight-color-80)",
        },
      },
    },
  },
  annotations: {
    controlPointOptions: {
      style: {
        fill: "var(--highcharts-background-color)",
        stroke: "var(--highcharts-neutral-color-100)",
      },
    },
    labelOptions: {
      backgroundColor:
        "color-mix(in srgb, " +
        "var(--highcharts-neutral-color-100) 75%, transparent)",
      borderColor: "var(--highcharts-neutral-color-100)",
    },
    shapeOptions: {
      fill:
        "color-mix(in srgb, " +
        "var(--highcharts-neutral-color-100) 75%, transparent)",
      stroke:
        "color-mix(in srgb, " +
        "var(--highcharts-neutral-color-100) 75%, transparent)",
    },
    types: {
      elliottWave: {
        labelOptions: {
          style: {
            color: "var(--highcharts-neutral-color-60)",
          },
        },
      },
      fibonacci: {
        labelOptions: {
          style: {
            color: "var(--highcharts-neutral-color-60)",
          },
        },
        typeOptions: {
          lineColor: "var(--highcharts-neutral-color-40)",
        },
      },
      fibonacciTimeZones: {
        typeOptions: {
          line: {
            stroke: "var(--highcharts-neutral-color-80)",
          },
        },
      },
      measure: {
        typeOptions: {
          label: {
            style: {
              color: "var(--highcharts-neutral-color-60)",
            },
          },
        },
      },
      verticalLine: {
        labelOptions: {
          style: {
            color: "var(--highcharts-neutral-color-60)",
          },
        },
      },
    },
  },
  caption: {
    style: {
      color: "var(--highcharts-neutral-color-60)",
    },
  },
  chart: {
    backgroundColor: "var(--highcharts-background-color)",
    borderColor: "var(--highcharts-highlight-color-80)",
    plotBorderColor: "var(--highcharts-neutral-color-20)",
  },
  colorAxis: {
    gridLineColor: "var(--highcharts-background-color)",
    labels: {
      style: {
        color: "var(--highcharts-neutral-color-80)",
      },
    },
    lineColor: "var(--highcharts-neutral-color-80)",
    marker: {
      color: "var(--highcharts-neutral-color-40)",
    },
    maxColor: "var(--highcharts-highlight-color-100)",
    minColor: "var(--highcharts-highlight-color-10)",
    minorGridLineColor: "var(--highcharts-neutral-color-5)",
    minorTickColor: "var(--highcharts-neutral-color-40)",
    tickColor: "var(--highcharts-neutral-color-80)",
    title: {
      style: {
        color: "var(--highcharts-neutral-color-60)",
      },
    },
  },
  colors: [
    "var(--highcharts-color-0)",
    "var(--highcharts-color-1)",
    "var(--highcharts-color-2)",
    "var(--highcharts-color-3)",
    "var(--highcharts-color-4)",
    "var(--highcharts-color-5)",
    "var(--highcharts-color-6)",
    "var(--highcharts-color-7)",
    "var(--highcharts-color-8)",
    "var(--highcharts-color-9)",
  ],
  credits: {
    style: {
      color: "var(--highcharts-neutral-color-40)",
    },
  },
  drilldown: {
    activeAxisLabelStyle: {
      color: "var(--highcharts-highlight-color-100)",
    },
    activeDataLabelStyle: {
      color: "var(--highcharts-highlight-color-100)",
    },
  },
  global: {
    buttonTheme: {
      fill: "var(--highcharts-neutral-color-3)",
      states: {
        disabled: {
          style: {
            color: "var(--highcharts-neutral-color-20)",
          },
        },
        hover: {
          fill: "var(--highcharts-neutral-color-10)",
        },
        select: {
          fill: "var(--highcharts-highlight-color-10)",
          style: {
            color: "var(--highcharts-neutral-color-100)",
          },
        },
      },
      stroke: "var(--highcharts-neutral-color-20)",
      style: {
        color: "var(--highcharts-neutral-color-80)",
      },
    },
  },
  legend: {
    borderColor: "var(--highcharts-neutral-color-40)",
    bubbleLegend: {
      labels: {
        style: {
          color: "var(--highcharts-neutral-color-100)",
        },
      },
    },
    itemHiddenStyle: {
      color: "var(--highcharts-neutral-color-60)",
    },
    itemHoverStyle: {
      color: "var(--highcharts-neutral-color-100)",
    },
    itemStyle: {
      color: "var(--highcharts-neutral-color-80)",
    },
    navigation: {
      activeColor: "var(--highcharts-highlight-color-100)",
      inactiveColor: "var(--highcharts-neutral-color-20)",
    },
    title: {
      style: {
        color: "var(--highcharts-neutral-color-80)",
      },
    },
  },
  loading: {
    style: {
      backgroundColor: "var(--highcharts-background-color)",
    },
  },
  mapNavigation: {
    buttonOptions: {
      style: {
        color: "var(--highcharts-neutral-color-60)",
      },
      theme: {
        fill: "var(--highcharts-background-color)",
        stroke: "var(--highcharts-neutral-color-10)",
      },
    },
  },
  navigation: {
    buttonOptions: {
      symbolFill: "var(--highcharts-neutral-color-60)",
      symbolStroke: "var(--highcharts-neutral-color-60)",
      theme: {
        fill: "var(--highcharts-background-color)",
      },
    },
    menuItemHoverStyle: {
      background: "var(--highcharts-neutral-color-5)",
    },
    menuItemStyle: {
      color: "var(--highcharts-neutral-color-80)",
    },
    menuStyle: {
      background: "var(--highcharts-background-color)",
    },
  },
  navigator: {
    handles: {
      backgroundColor: "var(--highcharts-neutral-color-5)",
      borderColor: "var(--highcharts-neutral-color-40)",
    },
    outlineColor: "var(--highcharts-neutral-color-40)",
    xAxis: {
      gridLineColor: "var(--highcharts-neutral-color-10)",
      labels: {
        style: {
          color: "var(--highcharts-neutral-color-100)",
        },
      },
    },
  },
  pane: {
    background: {
      backgroundColor: {
        stops: [
          [0, "var(--highcharts-background-color)"],
          [1, "var(--highcharts-neutral-color-10)"],
        ],
      },
      borderColor: "var(--highcharts-neutral-color-20)",
    },
  },
  plotOptions: {
    area: {
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    arearange: {
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    areaspline: {
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    areasplinerange: {
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    bar: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    bellcurve: {
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    boxplot: {
      borderColor: "var(--highcharts-background-color)",
      fillColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    bubble: {
      marker: {
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    candlestick: {
      borderColor: "var(--highcharts-background-color)",
      lineColor: "var(--highcharts-neutral-color-100)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
      upColor: "var(--highcharts-background-color)",
    },
    column: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    columnpyramid: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    columnrange: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    dependencywheel: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    errorbar: {
      borderColor: "var(--highcharts-background-color)",
      color: "var(--highcharts-neutral-color-100)",
      fillColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    flags: {
      borderColor: "var(--highcharts-background-color)",
      fillColor: "var(--highcharts-background-color)",
      states: {
        hover: {
          fillColor: "var(--highcharts-highlight-color-20)",
          lineColor: "var(--highcharts-neutral-color-100)",
        },
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
      style: {
        color: "var(--highcharts-neutral-color-100)",
      },
    },
    funnel: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    gantt: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    gauge: {
      dataLabels: {
        borderColor: "var(--highcharts-neutral-color-20)",
      },
      dial: {
        backgroundColor: "var(--highcharts-neutral-color-100)",
        borderColor: "var(--highcharts-neutral-color-20)",
      },
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
      pivot: {
        backgroundColor: "var(--highcharts-neutral-color-100)",
        borderColor: "var(--highcharts-neutral-color-20)",
      },
    },
    heatmap: {
      marker: {
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
      nullColor: "var(--highcharts-neutral-color-3)",
    },
    histogram: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    hlc: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    item: {
      borderColor: "var(--highcharts-background-color)",
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    line: {
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    map: {
      borderColor: "var(--highcharts-neutral-color-10)",
      nullColor: "var(--highcharts-neutral-color-3)",
      states: {
        hover: {
          borderColor: "var(--highcharts-neutral-color-60)",
        },
        select: {
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    mapbubble: {
      marker: {
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    mapline: {
      borderColor: "var(--highcharts-neutral-color-10)",
      nullColor: "var(--highcharts-neutral-color-3)",
      states: {
        hover: {
          borderColor: "var(--highcharts-neutral-color-60)",
        },
        select: {
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    mappoint: {
      dataLabels: {
        style: {
          color: "var(--highcharts-neutral-color-100)",
        },
      },
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    ohlc: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    organization: {
      borderColor: "var(--highcharts-neutral-color-60)",
      link: {
        color: "var(--highcharts-neutral-color-60)",
      },
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    packedbubble: {
      marker: {
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    pie: {
      borderColor: "var(--highcharts-background-color)",
    },
    polygon: {
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    pyramid: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    sankey: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    scatter: {
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    scatter3d: {
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    solidgauge: {
      dataLabels: {
        borderColor: "var(--highcharts-neutral-color-20)",
      },
      dial: {
        backgroundColor: "var(--highcharts-neutral-color-100)",
        borderColor: "var(--highcharts-neutral-color-20)",
      },
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
      pivot: {
        backgroundColor: "var(--highcharts-neutral-color-100)",
        borderColor: "var(--highcharts-neutral-color-20)",
      },
    },
    spline: {
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    sunburst: {
      borderColor: "var(--highcharts-neutral-color-10)",
      states: {
        hover: {
          borderColor: "var(--highcharts-neutral-color-40)",
        },
      },
    },
    timeline: {
      dataLabels: {
        backgroundColor: "var(--highcharts-background-color)",
        borderColor: "var(--highcharts-neutral-color-40)",
        color: "var(--highcharts-neutral-color-80)",
      },
      marker: {
        lineColor: "var(--highcharts-background-color)",
        states: {
          select: {
            fillColor: "var(--highcharts-neutral-color-20)",
            lineColor: "var(--highcharts-neutral-color-100)",
          },
        },
      },
    },
    treegraph: {
      borderColor: "var(--highcharts-neutral-color-10)",
      link: {
        color: "var(--highcharts-neutral-color-60)",
      },
      states: {
        hover: {
          borderColor: "var(--highcharts-neutral-color-40)",
        },
      },
    },
    treemap: {
      borderColor: "var(--highcharts-neutral-color-10)",
      states: {
        hover: {
          borderColor: "var(--highcharts-neutral-color-40)",
        },
      },
    },
    waterfall: {
      borderColor: "var(--highcharts-neutral-color-80)",
      lineColor: "var(--highcharts-neutral-color-80)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
    xrange: {
      borderColor: "var(--highcharts-background-color)",
      states: {
        select: {
          borderColor: "var(--highcharts-neutral-color-100)",
          color: "var(--highcharts-neutral-color-20)",
        },
      },
    },
  },
  rangeSelector: {
    inputStyle: {
      color: "var(--highcharts-highlight-color-80)",
    },
    labelStyle: {
      color: "var(--highcharts-neutral-color-60)",
    },
  },
  scrollbar: {
    barBackgroundColor: "var(--highcharts-neutral-color-20)",
    barBorderColor: "var(--highcharts-neutral-color-20)",
    buttonArrowColor: "var(--highcharts-neutral-color-80)",
    buttonBackgroundColor: "var(--highcharts-neutral-color-10)",
    buttonBorderColor: "var(--highcharts-neutral-color-20)",
    trackBorderColor: "var(--highcharts-neutral-color-20)",
  },
  subtitle: {
    style: {
      color: "var(--highcharts-neutral-color-60)",
    },
  },
  title: {
    style: {
      color: "var(--highcharts-neutral-color-80)",
    },
  },
  tooltip: {
    backgroundColor: "var(--highcharts-background-color)",
    style: {
      color: "var(--highcharts-neutral-color-80)",
    },
  },
  xAxis: {
    grid: {
      borderColor: "var(--highcharts-neutral-color-20)",
    },
    gridLineColor: "var(--highcharts-neutral-color-10)",
    labels: {
      style: {
        color: "var(--highcharts-neutral-color-80)",
      },
    },
    lineColor: "var(--highcharts-neutral-color-80)",
    minorGridLineColor: "var(--highcharts-neutral-color-5)",
    minorTickColor: "var(--highcharts-neutral-color-40)",
    tickColor: "var(--highcharts-neutral-color-80)",
    title: {
      style: {
        color: "var(--highcharts-neutral-color-60)",
      },
    },
  },
  yAxis: {
    grid: {
      borderColor: "var(--highcharts-neutral-color-20)",
    },
    gridLineColor: "var(--highcharts-neutral-color-10)",
    labels: {
      style: {
        color: "var(--highcharts-neutral-color-80)",
      },
    },
    lineColor: "var(--highcharts-neutral-color-80)",
    minorGridLineColor: "var(--highcharts-neutral-color-5)",
    minorTickColor: "var(--highcharts-neutral-color-40)",
    stackLabels: {
      style: {
        color: "var(--highcharts-neutral-color-100)",
      },
    },
    tickColor: "var(--highcharts-neutral-color-80)",
    title: {
      style: {
        color: "var(--highcharts-neutral-color-60)",
      },
    },
  },
  zAxis: {
    gridLineColor: "var(--highcharts-neutral-color-10)",
    labels: {
      style: {
        color: "var(--highcharts-neutral-color-80)",
      },
    },
    lineColor: "var(--highcharts-neutral-color-80)",
    minorGridLineColor: "var(--highcharts-neutral-color-5)",
    minorTickColor: "var(--highcharts-neutral-color-40)",
    tickColor: "var(--highcharts-neutral-color-80)",
    title: {
      style: {
        color: "var(--highcharts-neutral-color-60)",
      },
    },
  },
};
