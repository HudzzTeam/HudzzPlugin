import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper } from "@mui/material";
import { WP_SECONDARY_COLOR_AND_BACKGROUND_COLOR, WP_STEPPER_SX } from "../themes/wordpressTheme";

export type StepperProps = {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
  isFinalStep: boolean;
  length: number;
  pageValid: { [key: number]: boolean };
};

export default function Stepper({
  activeStep,
  handleBack,
  handleNext,
  isFinalStep,
  pageValid,
  length,
}: StepperProps) {
  return (
    <MobileStepper
      activeStep={activeStep}
      position="static"
      steps={length}
      variant="progress"
      backButton={
        <Button
          disabled={activeStep === 0}
          size="small"
          sx={{
            paddingLeft: 5,
            paddingRight: 5,
            ...WP_SECONDARY_COLOR_AND_BACKGROUND_COLOR,
          }}
          onClick={handleBack}
        >
          {<KeyboardArrowLeft />}
          Back
        </Button>
      }
      nextButton={
        <Button
          disabled={isFinalStep || !pageValid[activeStep]}
          size="small"
          sx={{
            paddingLeft: 5,
            paddingRight: 5,
            ...WP_SECONDARY_COLOR_AND_BACKGROUND_COLOR,
          }}
          onClick={handleNext}
        >
          Next
          {<KeyboardArrowRight />}
        </Button>
      }
      sx={{
        ...WP_STEPPER_SX,
        justifyContent: "center",
      }}
    />
  );
}
