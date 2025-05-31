import canvasState from "../states/canvasState.ts";
import { Snackbar } from "@mui/material";
import { observer } from "mobx-react-lite";

const Snack = observer(() => {
  return (
    <Snackbar
      open={canvasState.alertOpen}
      autoHideDuration={3000}
      onClose={() => canvasState.setAlertOpen(false)}
      message={canvasState.data?.username ? "User " + canvasState.data?.username + " connected" : "Connecting..."}
    />
  );
});

export default Snack;
