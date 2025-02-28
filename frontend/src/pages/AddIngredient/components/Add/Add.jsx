import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  IconButton,
  Grid2,
  MenuItem,
  Alert,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { CustomButton } from "@/shared/components/CustomButton";
import { addIngredient } from "./api";
import { useSelector } from "react-redux";
import { Input } from "@/shared/components/Input";

export function Add() {
  const { t } = useTranslation();
  const [apiProgress, setApiProgress] = useState();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState();
  const [generalError, setGeneralError] = useState();
  const languageState = useSelector((store) => store.language);
  // const [ingredient, setIngredient] = useState({
  //   name: "",
  //   translations: [
  //     { language: "en", translatedName: "" },
  //     { language: "tr", translatedName: "" },
  //   ],
  // });
  const [ingredient, setIngredient] = useState({
    name: "",
    translations: [
      { language: "en", translatedName: "" },
      { language: "tr", translatedName: "" },
    ],
  });

  const handleChange = (e) => {
    setIngredient({ ...ingredient, [e.target.name]: e.target.value });
    setSuccessMessage();
  };

  const handleTranslationChange = (index, field, value) => {
    const newTranslations = [...ingredient.translations];
    newTranslations[index][field] = value;
    setIngredient({ ...ingredient, translations: newTranslations });
  };

  const addTranslation = () => {
    setIngredient({
      ...ingredient,
      translations: [
        ...ingredient.translations,
        { language: "", translatedName: "" },
      ],
    });
  };

  const removeTranslation = (index) => {
    setIngredient({
      ...ingredient,
      translations: ingredient.translations.filter((_, i) => i !== index),
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("/api/admin/ingredients", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(ingredient),
  //   });

  //   if (response.ok) {
  //     alert("Ingredient added successfully!");
  //     setIngredient({
  //       name: "",
  //       translations: [
  //         { language: "en", translatedName: "" },
  //         { language: "tr", translatedName: "" },
  //       ],
  //     });
  //   } else {
  //     alert("Error adding ingredient");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setErrors({});
    setGeneralError();
    setSuccessMessage();
    try {
      const response = await addIngredient(ingredient);
      setSuccessMessage(response.data.message);
      setIngredient({
        name: "",
        translations: [
          { language: "en", translatedName: "" },
          { language: "tr", translatedName: "" },
        ],
      });
    } catch (axiosError) {
      if (axiosError.response?.data) {
        if (axiosError.response.data.status === 400) {
          setErrors(axiosError.response.data.validationErrors);
        } else {
          setGeneralError(axiosError.response.data.message);
        }
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      {/* <Typography variant="h5" sx={{ my: 2 }} align="center">
        {t("addIngredient")}
      </Typography> */}
      <form onSubmit={handleSubmit}>
        {/* <TextField
          label={t("keyValue")}
          name="name"
          value={ingredient.name}
          onChange={handleChange}
          fullWidth
        /> */}
        <Input
          label={t("keyValue")}
          name="name"
          value={ingredient.name}
          error={errors.ingredient}
          onChange={handleChange}
        />

        {ingredient.translations.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <TextField
              select
              size="medium"
              label={t("language")}
              name="language"
              value={item.language}
              style={{ width: 130 }}
              onChange={(e) =>
                handleTranslationChange(index, "language", e.target.value)
              }
            >
              {languageState.languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name} ({lang.code})
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label={t("translatedName")}
              name="translatedName"
              value={item.translatedName}
              style={{ width: 360 }}
              onChange={(e) =>
                handleTranslationChange(index, "translatedName", e.target.value)
              }
            />

            <IconButton
              onClick={() => removeTranslation(index)}
              disabled={ingredient.translations.length <= 1}
            >
              <RemoveCircle />
            </IconButton>
          </div>
        ))}

        <Grid2
          container
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            my: 2,
          }}
        >
          <Button
            onClick={addTranslation}
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            startIcon={<AddCircle />}
          >
            {t("addTranslation")}
          </Button>

          <CustomButton
            type="submit"
            apiProgress={apiProgress}
            fullWidth={false}
            variant="contained"
          >
            {t("addIngredient")}
          </CustomButton>
        </Grid2>
      </form>
      {generalError && <Alert color="error">{generalError}</Alert>}
      {successMessage && <Alert color="success">{successMessage}</Alert>}
    </Container>
  );
}
