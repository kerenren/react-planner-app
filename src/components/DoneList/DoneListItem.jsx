import React from "react";
import { List, Divider } from "antd";


function DoneListItem(props) { 

  return (
    <div>
      <Divider orientation="left">Done</Divider>
      <List bordered>{props.listItem}</List>
    </div>
  );
}

export default DoneListItem;
