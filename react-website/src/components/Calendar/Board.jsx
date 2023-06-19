import React, { useState } from 'react';
import './Board.css';
import { th } from 'date-fns/locale';

function Board(props) {

    function handleCourseChoice(event) {
        console.log(event);
        () => props.handleCourseClick(event)
    }

    // console.log(props.events);
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
                    if (props.weekEvenIndicator !== event.type) {
                        return null;
                    }
                    let eventElement = (
                        <div
                            key={key}
                        // className='event-hover'
                        // style={{
                        //     backgroundColor: "red",
                        //     top: `${(event.timeStart - 7) * 6.666}%`,
                        //     left: `${(event.day - 1) * 20}%`,
                        //     width: '20%',
                        //     height: `${(event.timeEnd - event.timeStart) * 6.666}%`
                        // }}
                        >
                            <div
                                className='event'
                                // onClick={props.handleCourseClick(event)}
                                style={{
                                    backgroundColor: "#2F589D",
                                    top: `${(event.timeStart - 7) * 6.666}%`,
                                    left: `${(event.day - 1) * 20}%`,
                                    width: '20%',
                                    height: `${(event.timeEnd - event.timeStart) * 6.666}%`
                                }}

                            >
                                <button
                                    // onClick={isLoaded ? props.handleCourseClick(event) : null}
                                    onClick={() => handleCourseChoice(event)}
                                >
                                    dupa
                                </button>
                                <div className='event-content' >
                                    <div>{event.name}</div>
                                    <div>{event.timeDisplay}</div>
                                    <div>{event.location}</div>
                                </div>
                            </div>
                        </div>


                    );
                    return eventElement;
                })
            }

        </div >
    );
}

export default Board;