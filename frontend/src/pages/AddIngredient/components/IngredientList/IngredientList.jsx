import { useEffect, useRef, useState } from "react";
import { deleteIngredient, loadIngredients } from "./api";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Spinner } from "@/shared/components/Spinner";
import SearchIcon from "@mui/icons-material/Search";

export function IngredientList() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [apiProgress, setApiProgress] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState(null);
  const [generalError, setGeneralError] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const observerRef = useRef(null);
  const { t, i18n } = useTranslation();

  const columns = [
    { id: "id", label: t("id"), minWidth: 50 },
    { id: "name", label: t("name"), minWidth: 100 },
    { id: "translatedName", label: t("translatedName"), minWidth: 100 },
    { id: "actions", minWidth: 100, align: "right" },
  ];

  const loadRows = async () => {
    if (!hasMore) return;
    setApiProgress(true);
    try {
      const response = await loadIngredients(page, searchQuery);
      setHasMore(!response.data.last);
      setPage(response.data.number);
      setRows((prevItems) =>
        page === 0
          ? response.data.content
          : [...prevItems, ...response.data.content]
      );
    } catch {
      setHasMore(false);
      setGeneralError(t("genericError"));
    } finally {
      setApiProgress(false);
      setSuccessMessage();
    }
  };

  useEffect(() => {
    setRows([]);
    setPage(0);
    setHasMore(true);
  }, [i18n.language]);

  useEffect(() => {
    loadRows();
  }, [page, searchQuery, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !apiProgress && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [apiProgress]);

  const handleDelete = async () => {
    setGeneralError();
    try {
      const response = await deleteIngredient(ingredientToDelete.id);
      setRows(rows.filter((row) => row.id !== ingredientToDelete.id));
      setSuccessMessage(response.data?.message);
    } catch (axiosError) {
      if (axiosError.response?.data) {
        setGeneralError(axiosError.response.data.message);
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
    setHasMore(true);
    setSuccessMessage();
  };

  return (
    // <Paper sx={{ width: "100%", overflow: "auto", my: 5 }}>
    //   {generalError && (
    //     <Alert style={{ my: 2 }} color="error">
    //       {generalError}
    //     </Alert>
    //   )}
    //   {successMessage && (
    //     <Alert style={{ my: 2 }} color="success">
    //       {successMessage}
    //     </Alert>
    //   )}
    <Grid2
      container
      spacing={1}
      direction="column"
      justifyItems="flex-start"
      sx={{ backgroundColor: (theme) => theme.palette.background.default }}
    >
      <Grid2>
        {/* <TextField
          label={t("searchName")}
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mx: 3 }}
        /> */}

        <FormControl sx={{ mx: 3 }} variant="outlined">
          <InputLabel htmlFor="search-name">{t("searchName")}</InputLabel>
          <OutlinedInput
            id="search-name"
            label={t("searchName")}
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" disabled>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid2>
      {/* <TableContainer sx={{ maxHeight: 440 }}> */}
      <TableContainer
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows.length > 0 ? (
            <TableBody>
              {rows.map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) => {
                    if (column.id === "actions") {
                      return (
                        <TableCell key={column.id} align="right">
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              setIngredientToDelete(row);
                              setOpenDeleteDialog(true);
                            }}
                          >
                            {t("delete")}
                          </Button>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="info">{t("noData")}</Alert>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>{t("confirmDelete")}</DialogTitle>
        <DialogContent>{ingredientToDelete?.name}</DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            {t("delete")}
          </Button>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            {t("cancel")}
          </Button>
        </DialogActions>
      </Dialog>

      {apiProgress && <Spinner />}
      <div ref={observerRef} style={{ height: "1px" }} />
    </Grid2>
    // </Paper>
  );
}

// export function IngredientList() {
//   const [rows, setRows] = useState([]);
//   const [page, setPage] = useState(0);
//   const [apiProgress, setApiProgress] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const observerRef = useRef(null);
//   const { t } = useTranslation();

//   const columns = [
//     { id: "id", label: t("id"), minWidth: 50 },
//     { id: "name", label: t("name"), minWidth: 100 },
//     { id: "translatedName", label: t("translatedName"), minWidth: 100 },
//   ];

//   useEffect(() => {
//     const loadRows = async () => {
//       if (!hasMore) return;
//       setApiProgress(true);
//       try {
//         const response = await loadIngredients(page);
//         // setUserPage(response.data);
//         setHasMore(!response.data.last);
//         setPage(response.data.number);
//         if (page != null) {
//           setRows((prevItems) => [...prevItems, ...response.data.content]);
//         } else {
//           setRows(() => [...response.data.content]);
//         }
//       } catch {
//         setHasMore(false);
//       } finally {
//         setApiProgress(false);
//       }
//     };

//     loadRows();
//   }, [page]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !apiProgress && hasMore) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (observerRef.current) {
//       observer.observe(observerRef.current);
//     }

//     return () => observer.disconnect();
//   }, [apiProgress]);

//   return (
//     <Paper sx={{ width: "100%", overflow: "hidden", my: 5 }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row, index) => (
//               <TableRow hover key={index}>
//                 {columns.map((column) => (
//                   <TableCell key={column.id}>{row[column.id]}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {apiProgress && <Spinner />}
//       <div ref={observerRef} style={{ height: "20px" }} />
//     </Paper>
//   );
// }
