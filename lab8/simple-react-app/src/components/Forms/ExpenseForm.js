import { useState } from 'react';
import '../../../src/ExpenseForm.css';
import ExpensesList from './ExpensesList';
import { collection, addDoc } from "firebase/firestore";
import db from '../firebase/firebase'

function ExpenseForm(props) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    //const [item, setItem] = useState({title:'', amount:0, date: new Date()})

    function addExpenseHandler(expenseData) {
        try {
            const expensesCollection = collection(db, "expenses");
            const docRef = addDoc(expensesCollection, expenseData);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error: ", e);
          }

    }
    function titleChangeHandler(event) {
        setEnteredTitle(event.target.value);
    }

    function amountChangeHandler(event) {
        setEnteredAmount(event.target.value);
    }

    function dateChangeHandler(event) {
        setEnteredDate(event.target.value);
    }

    function submitHandler(event) {
        event.preventDefault();
        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate).toISOString(),
        };

        addExpenseHandler(expenseData);
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
        setIsEditing(false);
    }

    function startEditingHandler() {
        setIsEditing(true);
    }

    function cancelEditingHandler() {
        setIsEditing(false);
    }

    if (!isEditing) {
        return (
            <div className="add-expense">
                <button className="add-expense__button button" onClick={startEditingHandler}>Add New Expense</button>
            </div>
        );
    }

    return (
        <form className="form" onSubmit={submitHandler}>
            <div className="form__control">
                <label className="form__label">Title</label>
                <input
                    className="form__input"
                    type="text"
                    value={enteredTitle}
                    onChange={titleChangeHandler}
                />
            </div>
            <div className="form__control">
                <label className="form__label">Amount</label>
                <input
                    className="form__input"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={enteredAmount}
                    onChange={amountChangeHandler}
                />
            </div>
            <div className="form__control">
                <label className="form__label">Date</label>
                <input
                    className="form__input"
                    type="date"
                    min="2019-01-01"
                    max={Date.now()}
                    value={enteredDate}
                    onChange={dateChangeHandler}
                />
            </div>
            <button className="form__button button" type="button" onClick={cancelEditingHandler}>
                Cancel
            </button>
            <button className="form__button button" type="submit">Add Expense</button>
        </form>
    );
}
export default ExpenseForm;