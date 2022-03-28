import * as d3 from "d3";
import data from "../weather.json";

const dateParser = d3.timeParse("%Y-%m-%d");
const yAccessor = (d) => d.temperatureMax;
const xAccessor = (d) => dateParser(d.date);
let dimensions = {
  width: window.innerWidth * 0.9,
  height: 400,
  margin: {
    top: 15,
    right: 15,
    bottom: 40,
    left: 60,
  },
};

dimensions.boundedWidth =
  dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.boundedHeight =
  dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

const svg = d3
  .select("#wrapper")
  .append("svg")
  .attr("width", dimensions.width)
  .attr("height", dimensions.height);
const bounds = svg
  .append("g")
  .style(
    "transform",
    `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
  );
const yScale = d3
  .scaleLinear()
  .domain(d3.extent(data, yAccessor))
  .range([dimensions.boundedHeight, 0]);
