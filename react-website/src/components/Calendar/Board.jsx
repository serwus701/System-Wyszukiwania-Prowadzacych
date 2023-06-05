import React from 'react';
import './Board.css';

function Board(props) {


    // function editRecord(event, id) {
    //     let divTop = (event.timeStart - 7) * 100 / 14;
    //     let height = (event.timeEnd - event.timeStart) * 100 / 14;

    //     let editedDiv = document.getElementById(id);

    //     editedDiv.style.top = `${divTop}%`;
    //     editedDiv.style.left = "0px";
    //     editedDiv.style.width = '20%';
    //     editedDiv.style.height = `${height}%`;
    //     editedDiv.style.backgroundColor = "#2F589D";

    //     // let targetDiv = document.querySelector('#grid-container');
    //     // targetDiv.appendChild(editedDiv);
    // }


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
                props.events.map((event, key) => {
                    let eventElement = (
                        <div className='event'
                            style={{
                                backgroundColor: "#2F589D",
                                top: `${(event.timeStart - 7) * 6.666}%`,
                                left: `${(event.day - 1) * 20}%`,
                                width: '20%',
                                height: `${(event.timeEnd - event.timeStart) * 6.666}%`
                            }}
                        >
                            <div>{event.name}</div>
                            <div>{event.timeDisplay}</div>
                            <div>{event.location}</div>
                        </div>
                    );
                    return eventElement;
                })
            }

        </div >
    );
}

export default Board;