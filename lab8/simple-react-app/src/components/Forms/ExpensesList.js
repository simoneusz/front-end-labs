import { useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase/firebase'

function ExpenseList() {
    useEffect(() => {
        const fetchData = async () => {
            const expensesCollection = collection(db, 'expenses');
            const snapshot = await getDocs(expensesCollection);
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        };
        fetchData();
    }, []);

    return null;
}

export default ExpenseList;
