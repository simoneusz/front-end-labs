import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(data.map((d) => d.month));
    y.domain([0, d3.max(data, (d) => d.value)]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.month))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value));
  }, [data]);

  return <svg ref={ref} />;
};
const ExpensesChart = (props) => {
  const { expenses } = props;
  const [selectedYear, setSelectedYear] = useState('2021');

  const handleYearChange = (event) => {
    document.querySelector('svg:first-of-type').innerHTML = "";
    setSelectedYear(event.target.value);
  };

  const filteredExpenses = expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === selectedYear;
  });

  const expensesByMonth = [
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 0 },
    { month: 'Mar', value: 0 },
    { month: 'Apr', value: 0 },
    { month: 'May', value: 0 },
    { month: 'Jun', value: 0 },
    { month: 'Jul', value: 0 },
    { month: 'Aug', value: 0 },
    { month: 'Sep', value: 0 },
    { month: 'Oct', value: 0 },
    { month: 'Nov', value: 0 },
    { month: 'Dec', value: 0 },
  ];

  filteredExpenses.forEach((expense) => {
    const month = expense.date.getMonth();
    expensesByMonth[month].value += expense.amount;
  });

  return (
    <div>
      <div>
        <label htmlFor="year">Choose year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
      <Chart data={expensesByMonth} />
    </div>
  );
};

export default ExpensesChart;
