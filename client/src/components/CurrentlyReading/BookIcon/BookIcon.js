import React from 'react';

function BookIcon({title}) {
    return (
        <div className='side-table__book-container' >
            <div className='side-table__book' style={{background: 'var(--danger)'}}>
                <div className='side-table__book__spine' style={ {background: 'var(--danger-darkened)' }} />
                <div className='side-table__book__paper' style={{ borderTop: '3px solid var(--danger-darkened)', borderLeft: '3px solid var(--danger-darkened)', borderBottom: '3px solid var(--danger-darkened)' }}>
                    <div className='side-table__book__paper__line' />
                    <div className='side-table__book__paper__line' />
                    <div className='side-table__book__paper__line' />
                    <div className='side-table__book__paper__line' />
                </div>
                <div className='side-table__book__title-container'>
                    <p className='side-table__book__title'>{title}</p>
                </div>
            </div>
        </div>
    );
}

export default BookIcon;
