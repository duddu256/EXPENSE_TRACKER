import React from 'react';

function ExpenseChart({ transactions }) {
  const expensesOnly = transactions.filter(t => t.amount < 0);
  const totalExpense = expensesOnly.reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const categories = ['Food', 'Investment', 'Fitness', 'Entertainment', 'Utilities', 'Other'];
  
  const breakdown = categories.map(cat => {
    const amount = expensesOnly
      .filter(t => t.category === cat)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);
    
    const percentage = totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(0) : 0;
    
    return { name: cat, amount, percentage };
  });

  return (
    <div style={{ background: '#fff', padding: '15px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
      <h4 style={{ margin: '0 0 15px 0' }}>Expense Breakdown by Category</h4>
      {totalExpense === 0 ? (
        <p style={{ color: '#777', fontSize: '14px' }}>No expenses logged yet to display charts.</p>
      ) : (
        breakdown.map(cat => cat.amount > 0 && (
          <div key={cat.name} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
              <span>{cat.name} (₹{cat.amount.toFixed(2)})</span>
              <span style={{ fontWeight: 'bold' }}>{cat.percentage}%</span>
            </div>
            <div style={{ width: '100%', background: '#e0e0e0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
              <div style={{ width: `${cat.percentage}%`, background: '#333', height: '100%' }}></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseChart;
