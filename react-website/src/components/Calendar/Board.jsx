import React from 'react';
import './Board.css';

function Board(props) {

    function addRecord(event) {
        let divTop = 6.59 * (event.timeStart - 7);
        let divLeft = 0;
        let height = 6.59 * (event.timeEnd - event.timeStart);

        let newDiv = document.createElement('div');
        newDiv.style.position = 'absolute';
        newDiv.style.top = `${divTop}%`;
        newDiv.style.left = `${divLeft}px`;
        newDiv.style.width = '20%';
        newDiv.style.height = `${height}%`;
        newDiv.style.backgroundColor = "#2F589D";
        newDiv.style.borderRadius = '15px';

        let targetDiv = document.querySelector('#grid-container');
        targetDiv.appendChild(newDiv);
    }

    return (
        <div className="grid-container" id="grid-container">
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
            {
                props.events.map((event) => (
                    // console.log(event)
                    addRecord(event)
                ))
            }

        </div>
    );
}

export default Board;