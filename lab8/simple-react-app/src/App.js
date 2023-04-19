import './App.css';
import { useState } from 'react';
import Expenses from './components/card/Expenses.js';
import ExpenseForm from './components/Forms/ExpenseForm';
import ExpensesChart from './components/Filters/ExpensesChart';

function App() {
  const [expenses, setExpenses] = useState([
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: 'e2',
      title: 'New TV',
      amount: 1212121,
      date: new Date(2021, 1, 2),
    },
    {
      id: 'e3',
      title: 'Car Insurance',
      amount: 3131321,
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 4532320,
      date: new Date(2021, 5, 12),
    },
    {
      id: 'e5',
      title: 'New Desk (Wooden)',
      amount: 4532320,
      date: new Date(2021, 8, 12),
    },
    {
      id: 'e6',
      title: 'New Desk (Wooden)',
      amount: 45101,
      date: new Date(2021, 7, 12),
    },
  ]);

  const [filteredYear, setFilteredYear] = useState('2021');

  function addExpenseHandler(expense) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, expense];
    });
  }

  function filterChangeHandler(selectedYear) {
    setFilteredYear(selectedYear);
  }

  const filteredExpenses = expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  return (
    <div className="App">
      <ExpenseForm onSaveExpenseData={addExpenseHandler} />
      <ExpensesChart expenses={expenses} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
