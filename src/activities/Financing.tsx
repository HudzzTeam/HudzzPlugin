import SendIcon from "@mui/icons-material/Send";
import { Button, Slide, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StatementApi } from "../api/StatementApi";
import EndorsementsList from "../components/EndorsementsList";
import LoanCostSection from "../components/LoanCostSection";
import LoanFeeSection from "../components/LoanFeeSection.js";
import Stepper from "../components/Stepper.js";
import { COUNTY_ID, Option } from "../constants/DataModelConstants";
import AddressSection from "../forms/AddressSection";
import CashCostSection from "../forms/CashCostSection";
import CashThirdPartySection from "../forms/CashThirdPartySection.js";
import MiscCostsSection from "../forms/MiscCostsSection";
import UserInfoSection from "../forms/UserInfoSection";
import FormHeader from "../headers/FormHeader";
import { WP_THEMED_BUTTON } from "../themes/wordpressTheme";
import {
  FinancingStatement,
  FinancingStatementRequest,
  defaultFinancingStatement,
} from "../types/FinancingStatement";
import { StatementData } from "../types/Statements";
import { UserInfo, defaultUserInfo } from "../types/UserInfo";

export default function Financing() {
  const navigate = useNavigate();
  const location = useLocation();

  const [stepState, setActiveStepState] = useState({
    activeStep: 0,
    previousStep: 0,
  });

  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const { first_name, last_name, email, cell_phone } = userInfo;
  const [newStatement, setNewStatement] = useState<FinancingStatement>(defaultFinancingStatement);

  useEffect(() => {
    location.state &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      location.state.reset &&
      setActiveStepState({ activeStep: 0, previousStep: 0 });
    setNewStatement(defaultFinancingStatement);
  }, [location.state]);

  const {
    address1,
    address2,
    appraisal_fee,
    buyer_additional_fee,
    buyer_misc,
    buyer_name,
    city,
    closing_date,
    commission,
    endorsements, // TODO implement endorsements section
    escrow_deposit,
    first_payoff,
    has_hoa,
    hoa_insurance,
    hoa_monthly,
    lender_application_fee,
    lender_fee,
    lender_name,
    loan,
    loan_points,
    prepaid_interest,
    price,
    property_tax,
    second_payoff,
    seller_additional_fee,
    seller_concession,
    seller_misc,
    seller_name,
    state,
    company,
    underwriting_fee,
    who_pays,
    zip_code,
  } = newStatement;

  const [errors, setErrors] = useState({});
  const initialCountyObj: Option<string> = { label: "", value: "" };

  const [countyObj, setCountyObj] = useState<Option<string>>(initialCountyObj);

  const [pageValid, setPageValid] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
    3: true,
    4: false,
    5: true,
    6: true,
    7: false,
  });

  const onFieldChange = (data: StatementData) => {
    const dataKey = Object.keys(data)[0];
    if (Object.keys(errors).includes(dataKey)) {
      setErrors({
        ...errors,
        [dataKey]: false,
      });
    }
    setNewStatement({
      ...newStatement,
      ...data,
    });
  };

  const onCountyChange = (county: Option<string>) => {
    setCountyObj(county);
    onFieldChange({ [COUNTY_ID]: county.value });
  };

  const handleUserDataChange = (data: StatementData) => {
    setUserInfo({
      ...userInfo,
      ...data,
    });
  };

  const handleNext = () => {
    setActiveStepState({
      activeStep: stepState.activeStep + 1,
      previousStep: stepState.activeStep,
    });
  };

  const handleBack = () => {
    setActiveStepState({
      activeStep: stepState.activeStep - 1,
      previousStep: stepState.activeStep,
    });
  };

  const handleValidChange = (isValid: boolean) => {
    setPageValid({
      ...pageValid,
      [stepState.activeStep]: isValid,
    });
  };

  const handleSubmit = () => {
    navigate("/done");
    StatementApi.create({
      ...newStatement,
      ...userInfo,
    } as FinancingStatementRequest)
      .then(() => {
        navigate("/done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stepContent = [
    <Box key={0}>
      <AddressSection
        address1={address1}
        address2={address2}
        city={city}
        countyObj={countyObj}
        errors={errors}
        state={state}
        zip_code={zip_code}
        onCountyChange={onCountyChange}
        onDataChange={onFieldChange}
        onValidChange={handleValidChange}
      />
    </Box>,
    <Box key={1}>
      <CashCostSection
        escrow_deposit={escrow_deposit}
        has_hoa={has_hoa}
        hoa_monthly={hoa_monthly}
        price={price}
        property_tax={property_tax}
        seller_concession={seller_concession}
        onDataChange={onFieldChange}
        onValidChange={handleValidChange}
      />
    </Box>,
    <Box key={2}>
      <LoanCostSection
        hoa_insurance={hoa_insurance}
        lender_name={lender_name}
        loan={loan}
        loan_points={loan_points}
        prepaid_interest={prepaid_interest}
        onDataChange={onFieldChange}
        onValidChange={handleValidChange}
      />
    </Box>,
    <Box key={3}>
      <LoanFeeSection
        appraisal_fee={appraisal_fee}
        lender_application_fee={lender_application_fee}
        lender_fee={lender_fee}
        underwriting_fee={underwriting_fee}
        onDataChange={onFieldChange}
      />
    </Box>,
    <Box key={4}>
      <CashThirdPartySection
        buyer_name={buyer_name}
        closing_date={closing_date}
        company={company}
        first_payoff={first_payoff}
        second_payoff={second_payoff}
        seller_name={seller_name}
        who_pays={who_pays}
        onDataChange={onFieldChange}
        onValidChange={handleValidChange}
      />
    </Box>,
    <Box key={5}>
      <MiscCostsSection
        buyer_additional_fee={buyer_additional_fee}
        buyer_misc={buyer_misc}
        commission={commission}
        seller_additional_fee={seller_additional_fee}
        seller_misc={seller_misc}
        onDataChange={onFieldChange}
      />
    </Box>,
    <Box key={6}>
      <EndorsementsList selectedList={endorsements} onChange={onFieldChange} />
    </Box>,
    <Box key={7}>
      <UserInfoSection
        cell_phone={cell_phone}
        email={email}
        first_name={first_name}
        last_name={last_name}
        onDataChange={handleUserDataChange}
        onValidChange={handleValidChange}
      />
    </Box>,
  ];

  const isFinalStep = stepState.activeStep === stepContent.length - 1;

  return (
    <>
      <FormHeader title={"Financed Purchase"} />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(var(--hudzz-view-height) - 70px)",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            marginTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <Slide
            key={stepState.activeStep}
            appear={true}
            direction={stepState.activeStep < stepState.previousStep ? "right" : "left"}
            in={true}
          >
            {stepContent[stepState.activeStep]}
          </Slide>
        </Box>
        {isFinalStep && (
          <>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                color="text.secondary"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 2,
                  paddingLeft: 18,
                  paddingRight: 18,
                  textAlign: "center",
                }}
              >
                By clicking &quot;View your costs&quot; you agree to our{" "}
                <a href="https://www.hudzz.com/hudzz-terms-of-service/">
                  Terms of Service and Privacy Policy
                </a>
              </Typography>
            </Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                disabled={!pageValid[stepContent.length - 1]}
                size="large"
                variant="contained"
                sx={{
                  width: "35%",
                  ...WP_THEMED_BUTTON,
                }}
                onClick={handleSubmit}
              >
                <SendIcon sx={{ paddingRight: 1 }} />
                View your costs
              </Button>
            </Box>
          </>
        )}
        <Box style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <Stepper
            activeStep={stepState.activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            isFinalStep={isFinalStep}
            length={stepContent.length}
            pageValid={pageValid}
          />
        </Box>
      </Container>
    </>
  );
}
