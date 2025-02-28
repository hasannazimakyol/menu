import { Add } from "./components/Add/Add";
import { Box, Container, Tab, Tabs } from "@mui/material";
import { IngredientList } from "./components/IngredientList/IngredientList";
import CustomTabPanel from "@/shared/components/CustomTabPanel";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function AddIngredient() {
  // const { t } = useTranslation();
  // const [apiProgress, setApiProgress] = useState();
  // const [errors, setErrors] = useState({});
  // const [successMessage, setSuccessMessage] = useState();
  // const [generalError, setGeneralError] = useState();
  // const languageState = useSelector((store) => store.language);
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    // <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            // aria-label=""
          >
            <Tab label={t("addIngredient")} {...a11yProps(0)} />
            <Tab label={t("ingredientList")} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Add />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <IngredientList />
        </CustomTabPanel>
      </Box>
    // </Container>
  );
}
