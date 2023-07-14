import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { CAMPAIGN_ROUTES, constructCampaignSheetPath } from "../../routes";
import { useCreateCampaignMutation } from "api/campaign/createCampaign";

export interface CreateCampaignDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function CreateCampaignDialog(props: CreateCampaignDialogProps) {
  const { open, handleClose } = props;
  const navigate = useNavigate();

  const { createCampaign, loading } = useCreateCampaignMutation();

  const [label, setLabel] = useState<string>("");

  const handleCreate = () => {
    createCampaign(label)
      .then((campaignId) => {
        navigate(constructCampaignSheetPath(campaignId, CAMPAIGN_ROUTES.SHEET));
      })
      .catch(() => {
        handleClose();
      });
  };

  return (
    <Dialog open={open} onClose={() => handleClose}>
      <DialogTitle
        sx={(theme) => ({
          color: theme.palette.primary.contrastText,
        })
        }>Create a Campaign</DialogTitle>
      <DialogContent>
        <TextField
          label={"Campaign Name"}
          value={label}
          onChange={(evt) => setLabel(evt.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} sx={(theme) => ({
          color: theme.palette.primary.contrastText,
        })
        }onClick={() => handleClose()}>
          Cancel
        </Button>
        <LoadingButton
          endIcon={<SaveIcon />}
          sx={{ color : "#d8d4cf" }}
          loading={loading}
          loadingPosition={"end"}
          variant={"contained"}
          onClick={() => handleCreate()}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
