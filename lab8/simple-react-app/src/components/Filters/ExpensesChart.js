import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const ExpensesChart = ({ expenses }) => {
  const [selectedYear, setSelectedYear] = useState('2021');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.date.getFullYear().toString() === selectedYear
    );

    const expensesByMonth = Array.from({ length: 12 }, () => 0);
    filteredExpenses.forEach((expense) => {
      const month = expense.date.getMonth();
      expensesByMonth[month] += parseFloat(expense.amount);
    });

    const newData = {
      labels: labels,
      datasets: [
        {
          label: 'Expenses',
          data: expensesByMonth,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    const chartInstance = ChartJS.getChart('myChart');
    if (chartInstance) {
      chartInstance.data = newData;
      chartInstance.update();
    }
  }, [expenses, selectedYear]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Expenses for ${selectedYear}`,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        stacked: true,
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
        stacked: true,
      },
    },
  };

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
      <div style={{ maxWidth: '1000px', maxHeight:'1000px' }}>
        <Bar id="myChart" data={{ labels, datasets: [] }} options={options} />
      </div>
    </div>
  );
};

export default ExpensesChart;