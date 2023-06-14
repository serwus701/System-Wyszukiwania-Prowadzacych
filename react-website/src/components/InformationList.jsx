import React from "react";

import "./InformationList.css";

function InformationList(props) {
  return (
    <div className="information-list">
      {Object.entries(props.listItems).map(([sectionName, sectionItems]) => {
        if (sectionName === "Konsultacje") {
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

export default InformationList;
