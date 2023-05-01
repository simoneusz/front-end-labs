import './App.css';
import { useState, useEffect } from 'react';
import Expenses from './components/card/Expenses';
import ExpenseForm from './components/Forms/ExpenseForm';
import ExpensesChart from './components/Filters/ExpensesChart';
import Spinner from './components/Spinner';

import { collection, addDoc, getDocs } from 'firebase/firestore';
import db from './components/firebase/firebase';

function App() {
  const defaultExpenses = [{
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  {
    id: 'e2',
    title: 'New TV',
    amount: 131,
    date: new Date(2021, 1, 2),
  },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 454,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 124,
    date: new Date(2021, 5, 12),
  },
  {
    id: 'e5',
    title: 'New Desk (Wooden)',
    amount: 356,
    date: new Date(2021, 8, 12),
  },
  {
    id: 'e6',
    title: 'New Desk (Wooden)',
    amount: 238.33,
    date: new Date(2021, 7, 12),
  },
  {
    id: 'e7',
    title: 'New Desk (Wooden)',
    amount: 238.33,
    date: new Date(2023, 7, 12),
  },
  {
    id: 'e8',
    title: 'New Desk (Wooden)',
    amount: 422.33,
    date: new Date(2023, 1, 12),
  },
  ];

  const [expenses, setExpenses] = useState([]);
  const canLoad = true;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (canLoad) {
      setLoading(true);
      const fetchData = async () => {
        const expensesSnapshot = await getDocs(collection(db, "expenses"));
        const expensesData = expensesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: new Date(doc.data().date)
        }));
        setExpenses(expensesData);
        setLoading(false);
      };
      fetchData();
    }
  }, [db, setExpenses]);

  function addExpenseHandler(expense) {
    setLoading(true);
    if (canLoad) {
      const docRef = addDoc(collection(db, 'expenses'), expense);
      const newExpense = { id: docRef.id, ...expense };
      setExpenses((prevExpenses) => {
        return [...prevExpenses, newExpense];
      });

    }
    else console.log("cannot load data")
    setLoading(false);
  }

  return (
    <div className="App">
      <ExpenseForm onSaveExpenseData={addExpenseHandler} />
      <ExpensesChart expenses={expenses} />
      {loading ? <Spinner /> : expenses.length > 0 ? <Expenses items={expenses} /> : <h1>No data avalible</h1>}
    </div>
  );
}

export default App;