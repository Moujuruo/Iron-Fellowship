import {
  Dialog,
  Checkbox,
  DialogContent,
  Stack,
  TextField,
  Button,
  DialogActions,
  Box,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Autocomplete,
  Alert,
} from "@mui/material";
import { DialogTitleWithCloseButton } from "components/DialogTitleWithCloseButton";
import { useCustomOracles } from "components/OracleSection/useCustomOracles";
import { oracleMap } from "data/oracles";
import { Formik } from "formik";
import { generateCustomDataswornId } from "functions/dataswornIdEncoder";
import { useState } from "react";
import { StoredMove } from "types/Moves.type";
import { MoveStatKeys, PlayerConditionMeter, Stat } from "types/stats.enum";
import type { OracleTable } from "dataforged";

type EnabledStats = {
  [stat in MoveStatKeys]: boolean;
};

interface FormValues {
  name: string;
  description: string;
  enabledStats: EnabledStats;
  oracleIds: string[];
}

export interface CustomMoveDialogProps {
  open: boolean;
  onClose: () => void;

  createCustomMove: (move: StoredMove) => Promise<boolean>;
  updateCustomMove: (moveId: string, move: StoredMove) => Promise<boolean>;
  move?: StoredMove;
}

export function CustomMoveDialog(props: CustomMoveDialogProps) {
  const { open, onClose, move, createCustomMove, updateCustomMove } = props;

  const { allCustomOracleMap } = useCustomOracles();
  const combinedOracles = { ...oracleMap, ...allCustomOracleMap };

  const [loading, setLoading] = useState<boolean>(false);
  const [oracleMissingError, setOracleMissingError] = useState<boolean>(false);

  const initialValues: FormValues = {
    name: move?.name ?? "",
    description: move?.text ?? "",
    enabledStats: {
      [Stat.Edge]: false,
      [Stat.Heart]: false,
      [Stat.Iron]: false,
      [Stat.Shadow]: false,
      [Stat.Wits]: false,
      [PlayerConditionMeter.Health]: false,
      [PlayerConditionMeter.Spirit]: false,
      [PlayerConditionMeter.Supply]: false,
      ["companion health"]: false,
    },
    oracleIds: move?.oracleIds ?? [],
  };

  move?.stats?.forEach((stat) => {
    initialValues.enabledStats[stat] = true;
  });

  const handleCancel = () => {
    onClose();
  };
  const handleValidate = (values: FormValues) => {
    const errors: { [key in keyof FormValues]?: string } = {};
    if (!values.name) {
      errors.name = "Move name is required";
    }
    if (!values.description) {
      errors.description = "Move description is required";
    }
    return errors;
  };
  const handleSubmit = (values: FormValues) => {
    const stats: MoveStatKeys[] = (
      Object.keys(values.enabledStats) as MoveStatKeys[]
    ).filter((key) => values.enabledStats[key]);
    const customMoveDocument: StoredMove = {
      $id: generateCustomDataswornId("ironsworn/moves", values.name),
      name: values.name,
      text: values.description,
      stats,
      oracleIds: values.oracleIds,
    };

    if (!move) {
      setLoading(true);
      createCustomMove(customMoveDocument)
        .then(() => {
          setLoading(false);
          onClose();
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      updateCustomMove(move.$id, customMoveDocument)
        .then(() => {
          setLoading(false);
          onClose();
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  };

  const getOraclesFromIds = (oracleIds: string[]) => {
    const oracles: OracleTable[] = [];
    oracleIds.forEach((id) => {
      const oracle = combinedOracles[id];
      if (oracle) {
        oracles.push(oracle);
      }
    });

    return oracles;
  };

  const isMissingOracle = (oracleIds: string[]) => {
    let isMissingOracle: boolean = false;
    oracleIds.forEach((id) => {
      if (!combinedOracles[id]) {
        isMissingOracle = true;
      }
    });

    return isMissingOracle;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        {move ? `Edit ${move.name}` : "Add Custom Move"}
      </DialogTitleWithCloseButton>
      <Formik
        initialValues={initialValues}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <DialogContent>
              <Stack spacing={2}>
                <TextField
                  label={"Move Name"}
                  name={"name"}
                  value={form.values.name}
                  onChange={form.handleChange}
                  error={form.touched.name && !!form.errors.name}
                  helperText={form.touched.name && form.errors.name}
                />
                <TextField
                  label={"Move Description"}
                  name={"description"}
                  value={form.values.description}
                  onChange={form.handleChange}
                  error={form.touched.description && !!form.errors.description}
                  helperText={
                    form.touched.description && !!form.errors.description
                      ? form.errors.description
                      : "You can use markdown to add rich text to your description "
                  }
                  multiline
                  minRows={3}
                />
                <Box>
                  <FormControl
                    component="fieldset"
                    variant="standard"
                    fullWidth
                  >
                    <FormLabel component="legend">Character Stats</FormLabel>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.values.enabledStats[Stat.Edge]}
                              onChange={(evt, checked) =>
                                form.setFieldValue(
                                  `enabledStats.${Stat.Edge}`,
                                  checked
                                )
                              }
                              name={`enabledStats.${Stat.Edge}`}
                            />
                          }
                          label="Edge"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.values.enabledStats[Stat.Heart]}
                              onChange={(evt, checked) =>
                                form.setFieldValue(
                                  `enabledStats.${Stat.Heart}`,
                                  checked
                                )
                              }
                              name={`enabledStats.${Stat.Heart}`}
                            />
                          }
                          label="Heart"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.values.enabledStats[Stat.Iron]}
                              onChange={(evt, checked) =>
                                form.setFieldValue(
                                  `enabledStats.${Stat.Iron}`,
                                  checked
                                )
                              }
                              name={`enabledStats.${Stat.Iron}`}
                            />
                          }
                          label="Iron"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.values.enabledStats[Stat.Shadow]}
                              onChange={(evt, checked) =>
                                form.setFieldValue(
                                  `enabledStats.${Stat.Shadow}`,
                                  checked
                                )
                              }
                              name={`enabledStats.${Stat.Shadow}`}
                            />
                          }
                          label="Shadow"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.values.enabledStats[Stat.Wits]}
                              onChange={(evt, checked) =>
                                form.setFieldValue(
                                  `enabledStats.${Stat.Wits}`,
                                  checked
                                )
                              }
                              name={`enabledStats.${Stat.Wits}`}
                            />
                          }
                          label="Wits"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                form.values.enabledStats[
                                  PlayerConditionMeter.Health
                                ]
                              }
                              onChange={(evt, checked) =>
                                form.setFieldValue(
                                  `enabledStats.${PlayerConditionMeter.Health}`,
                                  checked
                                )
                              }
                              name={`enabledStats.${PlayerConditionMeter.Health}`}
                            />
                          }
                          label="Health"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                form.values.enabledStats[
                                  PlayerConditionMeter.Spirit
                                ]
                              }
                              onChange={(evt, checked) =>
                                form.setFieldValue(
                                  `enabledStats.${PlayerConditionMeter.Spirit}`,
                                  checked
                                )
                              }
                              name={`enabledStats.${PlayerConditionMeter.Spirit}`}
                            />
                          }
                          label="Spirit"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                form.values.enabledStats[
                                  PlayerConditionMeter.Supply
                                ]
                              }
                              onChange={(evt, checked) =>
                                form.setFieldValue(
                                  `enabledStats.${PlayerConditionMeter.Supply}`,
                                  checked
                                )
                              }
                              name={`enabledStats.${PlayerConditionMeter.Supply}`}
                            />
                          }
                          label="Supply"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                form.values.enabledStats["companion health"]
                              }
                              onChange={(evt, checked) =>
                                form.setFieldValue(
                                  `enabledStats.companion health`,
                                  checked
                                )
                              }
                              name={`enabledStats.companion health`}
                            />
                          }
                          label="Companion Health"
                        />
                      </FormGroup>
                    </Box>
                  </FormControl>
                </Box>
                <Autocomplete
                  multiple
                  limitTags={2}
                  options={Object.values(combinedOracles)}
                  getOptionLabel={(oracle) => oracle.Title.Standard}
                  renderInput={(params) => (
                    <TextField {...params} label={"Oracles"} />
                  )}
                  value={getOraclesFromIds(form.values.oracleIds)}
                  onChange={(evt, value) => {
                    const ids = Array.isArray(value)
                      ? value.map((oracle) => oracle.$id)
                      : [];
                    form.setFieldValue("oracleIds", ids);
                  }}
                />
                {isMissingOracle(form.values.oracleIds) && (
                  <Alert severity={"warning"}>
                    This move had an attached oracle that is no longer
                    available.
                  </Alert>
                )}{" "}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                type={"button"}
                onClick={() => {
                  form.resetForm();
                  handleCancel();
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type={"submit"} variant={"contained"} disabled={loading}>
                {move ? "Save Changes" : "Create Move"}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}
