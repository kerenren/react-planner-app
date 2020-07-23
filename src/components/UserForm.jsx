import React from "react";
import { List } from "antd";


function UserForm(props) { 

  return (
    <div>
      <List bordered>{props.listItem}</List>
    </div>
  );
}

export default UserForm;