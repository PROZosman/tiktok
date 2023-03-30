import React from "react";
import "./style.css";
import Button from "@mui/material/Button";
import "../../index.css";

const Grouplist = () => {
  return (
    <div className="grouplist">
      <div className="grouplist_header">
        <h4>Group List</h4>
      </div>

      <div className="scroll">
        <div className="group_item_wrapper">
          <div className="group_images"></div>
          <div className="groups_name">
            <h5>Mernian</h5>
          </div>
          <div className="grouplist_btn">
            <Button variant="contained">Join</Button>
          </div>
        </div>
        <div className="group_item_wrapper">
          <div className="group_images"></div>
          <div className="groups_name">
            <h5>Mernian</h5>
          </div>
          <div className="grouplist_btn">
            <Button variant="contained">Join</Button>
          </div>
        </div>
        <div className="group_item_wrapper">
          <div className="group_images"></div>
          <div className="groups_name">
            <h5>Mernian</h5>
          </div>
          <div className="grouplist_btn">
            <Button variant="contained">Join</Button>
          </div>
        </div>
        <div className="group_item_wrapper">
          <div className="group_images"></div>
          <div className="groups_name">
            <h5>Mernian</h5>
          </div>
          <div className="grouplist_btn">
            <Button variant="contained">Join</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grouplist;
