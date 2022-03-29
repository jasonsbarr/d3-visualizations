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
const xScale = d3
  .scaleTime()
  .domain(d3.extent(data, xAccessor))
  .range([0, dimensions.boundedWidth]);
const freezing = yScale(32);
const freezingTemperatures = bounds
  .append("rect")
  .attr("x", 0)
  .attr("width", dimensions.boundedWidth)
  .attr("y", freezing)
  .attr("height", dimensions.boundedHeight - freezing)
  .attr("fill", "#e0f3f3");
const line = d3
  .line()
  .x((d) => xScale(xAccessor(d)))
  .y((d) => yScale(yAccessor(d)));
const graphLine = bounds
  .append("path")
  .attr("d", line(data))
  .attr("fill", "none")
  .attr("stroke", "#af9358")
  .attr("stroke-width", 2);
const yAxis = bounds.append("g").call(d3.axisLeft().scale(yScale));
const xAxis = bounds
  .append("g")
  .call(d3.axisBottom().scale(xScale))
  .style("transform", `translateY(${dimensions.boundedHeight}px)`);
