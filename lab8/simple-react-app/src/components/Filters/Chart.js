import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = (props) => {
  const { data } = props;
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Получить максимальное значение в массиве данных
    const max = d3.max(data, d => d.value);

    // Создать объект оси Y
    const yScale = d3.scaleLinear()
      .domain([0, max])
      .range([300, 0]);

    // Создать объект оси X
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, 600])
      .padding(0.1);

    // Добавить ось Y
    svg.select('.y-axis')
      .call(d3.axisLeft(yScale));

    // Добавить ось X
    svg.select('.x-axis')
      .call(d3.axisBottom(xScale));

    // Добавить гистограмму
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.month))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => 300 - yScale(d.value))
      .attr('fill', 'steelblue');
  }, [data]);

  return (
    <svg ref={svgRef} width="600" height="300">
      <g className="y-axis" />
      <g className="x-axis" transform="translate(0,300)" />
    </svg>
  );
};

export default Chart;