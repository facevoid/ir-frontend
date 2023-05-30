import React, { useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Height } from "@mui/icons-material";

const theme = createTheme();

export default function App() {
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);
  const [algorithm, setAlgorithm] = useState("algorithm1");
  const [searchResult, setSearchResult] = useState({
    // this_img_info: { tissue_type: "", diagnosis: "", file_name: "" },
    this_img_info: {},
    simliar_img_info: [],
  });

  // handle Algorithm Change
  const handleAlgorithmChange = event => {
    setAlgorithm(event.target.value);
  };

  // handle search button click
  const handleSearch = () => {
    setLoading(true);

    axios
      .post("https://dummyjson.com/products/add", {
        image_name: searchString,
        algorithm_name: algorithm,
      })
      .then(response => {
        setLoading(false);
        // for real data
        if (response.data.hasOwnProperty("this_img_info")) {
          setSearchResult(response.data);
        } else {
          // set dummy data to state
          setSearchResult({
            this_img_info: {
              tissue_type: "Brain",
              diagnosis: "",
              file_name: "",
              image_link: "brain_images/1.png",
            },
            simliar_img_info: [
              {
                tissue_type: "Brain",
                diagnosis: "Cancer",
                file_name: "",
                image_link: "brain_images/2.png",
              },
              {
                tissue_type: "Brain",
                diagnosis: "Cancer",
                file_name: "",
                image_link: "brain_images/3.png",
              },
              {
                tissue_type: "Brain",
                diagnosis: "Cancer",
                file_name: "",
                image_link: "brain_images/4.png",
              },
            ],
          });
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  // useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Image Search
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <TextField
                id="image-name"
                label="Image Name"
                variant="outlined"
                size="small"
                value={searchString}
                onChange={e => setSearchString(e.target.value)}
              />
              <Button
                variant="contained"
                size="small"
                sx={{ pr: 2, pl: 2 }}
                disabled={searchString === ""}
                onClick={handleSearch}
              >
                Search
              </Button>
              <FormControl
                size="small"
                sx={{
                  m: 1,
                  minWidth: 150,
                  "& .MuiInputLabel-shrink": {
                    background: "#fff",
                    pr: 1,
                  },
                }}
              >
                <InputLabel id="algorithm-select">Algorithm</InputLabel>
                <Select
                  labelId="algorithm-select"
                  id="algorithm"
                  value={algorithm}
                  label="Age"
                  onChange={handleAlgorithmChange}
                >
                  <MenuItem value={"algorithm1"}>Cosine Similarity</MenuItem>
                  <MenuItem value={"algorithm2"}>Algorithm 2</MenuItem>
                  <MenuItem value={"algorithm3"}>Algorithm 3</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Container>
        </Box>
        {/* Result box */}
        {Object.keys(searchResult.this_img_info).length > 0 && (
          <Container sx={{ py: 3 }}>
            <Typography
              component="h4"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Search Result:
            </Typography>

            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "15px 0 50px 0",
                }}
              >
                <CircularProgress />
              </Box>
            )}
            {!loading && (
              <Grid container spacing={4}>
                <Grid item xs={12} sm={8} md={8}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      sx={{
                        maxWidth: "400px",
                        maxHeight: "400px",
                        // height: "100%",
                        display: "flex",
                        // flexDirection: "column",
                        padding: 0,
                        margin: "auto",
                        objectFit: "cover"
                      }}
                      
                      component="img"
                      image={searchResult.this_img_info.image_link}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={
                          <Typography
                            component="h6"
                            variant="body1"
                            color="text.primary"
                            gutterBottom
                            sx={{ mb: 1 }}
                          >
                            <span style={{ fontWeight: 600 }}>
                              Tissue Type:
                            </span>{" "}
                            {searchResult.this_img_info.tissue_type}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={
                          <Typography
                            component="h6"
                            variant="body1"
                            color="text.primary"
                            gutterBottom
                            sx={{ mb: 1 }}
                          >
                            <span style={{ fontWeight: 600 }}>Diagnosis:</span>{" "}
                            {searchResult.this_img_info.diagnosis}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            )}
          </Container>
        )}
        {!loading && searchResult.simliar_img_info.length > 0 && (
          <Container sx={{ py: 8 }}>
            <Typography
              component="h4"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Similar Images
            </Typography>
            <Grid container spacing={4}>
              {searchResult.simliar_img_info.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia component="img" image={item.image_link} />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <List>
                        <ListItem disablePadding>
                          <ListItemText
                            primary={
                              <Typography
                                component="h6"
                                variant="body1"
                                color="text.primary"
                                gutterBottom
                                sx={{ mb: 1 }}
                              >
                                <span style={{ fontWeight: 600 }}>
                                  Tissue Type:
                                </span>{" "}
                                {item.tissue_type}
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemText
                            primary={
                              <Typography
                                component="h6"
                                variant="body1"
                                color="text.primary"
                                gutterBottom
                                sx={{ mb: 1 }}
                              >
                                <span style={{ fontWeight: 600 }}>
                                  Diagnosis:
                                </span>{" "}
                                {item.diagnosis}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </main>
    </ThemeProvider>
  );
}
