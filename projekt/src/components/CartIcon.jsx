import React from 'react';

const CartIcon = ({ count }) => {
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <span role="img" aria-label="cart" style={{ fontSize: '24px' }}>🛒</span>
            {count > 0 && (
                <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-10px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {count}
                </span>
            )}
        </div>
    );
};

export default CartIcon;
