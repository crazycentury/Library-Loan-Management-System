import './App.css';
import BookList from './view/BookList';
import ReturnForm from './view/ReturnForm';
import BorrowForm from './view/BorrowForm';
import LoanList from './view/LoanList';
import { useState } from 'react';

function App() {
  const [refreshKey, setRefreshKey] = useState(0); // untuk refresh data pada table setelah proses submit selesai

  return (
     <div style={{ display: 'flex', flexDirection:'column', padding: 20,alignItems:'center' }}>
      <h1>📚 Library Loan System</h1>
      <BookList refreshKey={refreshKey} />
      <BorrowForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
      <ReturnForm onSuccess={() => setRefreshKey(prev => prev + 1)}/>
      <LoanList refreshKey={refreshKey}/>
    </div>
  );
}

export default App;
