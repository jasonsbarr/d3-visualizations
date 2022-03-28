import * as d3 from "d3";

const dateParser = d3.timeParse("%Y-%m-%d");
const yAccessor = (d) => d.temperatureMax;
const xAccessor = (d) => dateParser(d.date);
