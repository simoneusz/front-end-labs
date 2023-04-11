import ExpenseItem from './Expense__item.js'
import '../../Expenses.css';

function Expenses(props) {
    return (
        <div className="expenses">
            {props.items.map((expense) => (
                <ExpenseItem key={expense.id} {...expense} />
            ))}
        </div>
    );
}

export default Expenses;