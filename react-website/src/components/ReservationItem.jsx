import React from "react";

import "../styles/ReservationItem.css";

function ReservationItem(props) {
    return (
        <div className="reservation-item">
          {Object.entries(props.listItems).map(([sectionName, sectionItems]) => {
            if (sectionName === "Rezerwacja") {
              return (
                <div>
                  {Object.entries(sectionItems).map(([itemName, itemValue]) => (
                    <div>
                      {itemName}: {itemValue}
                    </div>
                  ))}
                </div>
              );
            } else {
              return (
                <div>
                  {Object.entries(sectionItems).map(([itemName, itemValue]) => (
                    <div>
                      {itemValue}
                    </div>
                  ))}
                </div>
              );
            }
          })}
        </div>
      );
    }

export default ReservationItem;
