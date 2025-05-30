import { useState } from "react";
import canvasState from "../states/canvasState.ts";
import { Box, Button, Input, Modal, Typography } from "@mui/material";

const ModalWindow = () => {
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    if (username) canvasState.setUsername(username);
    setShow(false);
  };

  return (
    <Modal
      open={show}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4">
          Authorization
        </Typography>
        <div id="modal-modal-description">
          <Typography variant="body1">
            Please, enter your name to proceed:
          </Typography>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <Button onClick={handleClose} style={{ marginTop: 10 }}>
          Let's paint!
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
