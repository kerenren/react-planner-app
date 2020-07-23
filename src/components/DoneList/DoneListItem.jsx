import React from "react";
import { List } from "antd";


function DoneListItem(props) { 

  return (
    <div>
      <List bordered>{props.listItem}</List>
    </div>
  );
}

export default DoneListItem;
