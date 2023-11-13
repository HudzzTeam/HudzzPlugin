import SendIcon from "@mui/icons-material/Send";
import { Button, Slide, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StatementApi } from "../api/StatementApi";
import Stepper from "../components/Stepper";
import { COUNTY_ID, Option } from "../constants/DataModelConstants";
import AddressSection from "../forms/AddressSection";
import CashCostSection from "../forms/CashCostSection";
import CashThirdPartySection from "../forms/CashThirdPartySection";
import MiscCostsSection from "../forms/MiscCostsSection";
import UserInfoSection from "../forms/UserInfoSection";
import FormHeader from "../headers/FormHeader";
import { CashStatement, CashStatementRequest, defaultCashStatement } from "../types/CashStatement";
import { StatementData } from "../types/Statements";
import { UserInfo, defaultUserInfo } from "../types/UserInfo";

import { WP_PRIMARY_COLOR_AND_BACKGROUND_COLOR } from "../themes/wordpressTheme";

export default function Cash() {
  const navigate = useNavigate();
  const location = useLocation();

  const [stepState, setActiveStepState] = useState({
    activeStep: 0,
    previousStep: 0,
  });

  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const { first_name, last_name, email, cell_phone } = userInfo;
  const [newStatement, setNewStatement] = useState<CashStatement>(defaultCashStatement);

  useEffect(() => {
    location.state &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      location.state.reset &&
      setActiveStepState({ activeStep: 0, previousStep: 0 });
    setNewStatement(defaultCashStatement);
  }, [location.state]);

  const {
    address1,
    address2,
    city,
    state,
    zip_code,
    price,
    escrow_deposit,
    seller_concession,
    has_hoa,
    hoa_monthly,
    who_pays,
    company,
    closing_date,
    buyer_name,
    seller_name,
    property_tax,
    commission,
    first_payoff,
    second_payoff,
    buyer_misc,
    buyer_additional_fee,
    seller_misc,
    seller_additional_fee,
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
  });

  // const onErrorChange = (errorData: { [key: string]: boolean }) => {
  //   setErrors({
  //     ...errors,
  //     ...errorData,
  //   });
  // };

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
      endorsements: [],
    } as CashStatementRequest)
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
    <Box key={3}>
      <MiscCostsSection
        buyer_additional_fee={buyer_additional_fee}
        buyer_misc={buyer_misc}
        commission={commission}
        seller_additional_fee={seller_additional_fee}
        seller_misc={seller_misc}
        onDataChange={onFieldChange}
      />
    </Box>,
    <Box key={4}>
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
      <FormHeader title={"Cash Purchase"} />
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
                disabled={!pageValid[4]}
                size="large"
                variant="contained"
                sx={{
                  width: "35%",
                  ...WP_PRIMARY_COLOR_AND_BACKGROUND_COLOR,
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
