import React from 'react';

function TransactionList({ transactions }) {
  return (
    <div>
      <h3 style={{ marginTop: '25px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>History</h3>
      {transactions.length === 0 ? (
        <p style={{ color: '#777' }}>No transactions recorded.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {transactions.map(t => (
            <li 
              key={t._id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '12px 15px', 
                background: '#f9f9f9', 
                borderRight: `5px solid ${t.amount < 0 ? '#ff4d4d' : '#2ecc71'}`, 
                marginBottom: '10px',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              <div>
                <strong style={{ display: 'block' }}>{t.text}</strong>
                <small style={{ color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>{t.category}</small>
              </div>
              <span style={{ fontWeight: 'bold', color: t.amount < 0 ? '#ff4d4d' : '#2ecc71' }}>
                {t.amount < 0 ? '-' : '+'}₹{Math.abs(t.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;