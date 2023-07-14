import {
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
  makeStyles,
  
} from "@mui/material";
import { useWorldCreateStore } from "../worldCreate.store";
import { StepButtons } from "./StepButtons";


export function WorldBasicsStep() {
  const worldName = useWorldCreateStore((store) => store.name);
  const stepState = useWorldCreateStore((store) => store.stepState[0]);

  const setWorldName = useWorldCreateStore((store) => store.setName);

  const setCurrentStep = useWorldCreateStore((store) => store.setCurrentStep);
  
  const theme = useTheme();

  return (
    <>
      <StepButton
        onClick={() => setCurrentStep(0)}
        optional={
          stepState.touched &&
          stepState.errorMessage && (
            <Typography variant={"caption"} color={"error"}>
              {stepState.errorMessage}
            </Typography>
          )
        }
      >
        <StepLabel 
          error={stepState.touched && !!stepState.errorMessage}
        >
          <Typography 
            sx={ (theme) => ({
              color: theme.palette.primary.contrastText,
              })
            }
          >
          World Basics
          </Typography>
        </StepLabel>
        
      </StepButton>
      <StepContent>
        <TextField
          label={"World Name"}
          value={worldName}
          sx={{ 
            input: { color: theme.palette.primary.contrastText } ,
            label: {color: theme.palette.primary.contrastText},
            fieldset: { borderColor: theme.palette.border.main },
          }}  
          onChange={(evt) => setWorldName(evt.currentTarget.value)}
        />
        <StepButtons />
      </StepContent>
    </>
  );
}
