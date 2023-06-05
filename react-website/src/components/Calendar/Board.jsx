import React from 'react';
import './Board.css';

function Board() {
    return (
        <div className="grid-container">
            {Array(15)
                .fill(0)
                .map((row, rowIndex) => (
                    <div key={rowIndex} className="grid-row">
                        {Array(5)
                            .fill(0)
                            .map((col, colIndex) => (
                                <div key={colIndex} className="grid-item"></div>
                            ))}
                    </div>
                ))}
        </div>
    );
}

export default Board;