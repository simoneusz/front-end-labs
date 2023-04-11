import ExpenseDate from './Expense__date'
function ExpenseItem({ id, title, amount, date }) {
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const day = date.toLocaleString('en-US', { day: '2-digit' });

    return (
        <div className="expense-item">
             <ExpenseDate date={date} />
            <div className="expense-item__description">
                <h2>{title}</h2>
                <div className="expense-item__price">${amount}</div>
            </div>
        </div>
    );
}
export default ExpenseItem;