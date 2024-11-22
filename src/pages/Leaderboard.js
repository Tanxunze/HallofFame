import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Leaderboard() {
  const [value, setValue] = useState(0);
  const [members, setMembers] = useState([]);
  const logos = {
    "Maimai DX": "https://maimai.sega.com/assets/img/buddies/top/kv_logo.png",
    Chunithm: "https://chunithm.sega.com/assets/img/top/kv_logo.png",
    Arcaea:
      "https://arcaea.lowiro.com/assets/logo-homepage-hero@2x-Cwmhul8Y.png",
  };
  const [logo, setLogo] = useState(logos["Maimai DX"]); // Default logo

  useEffect(() => {
    fetch("/member_data/member_data.json")
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => {
        console.error("Failed to load data:", error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setLogo(logos["Maimai DX"]);
        break;
      case 1:
        setLogo(logos["Chunithm"]);
        break;
      case 2:
        setLogo(logos["Arcaea"]);
        break;
      default:
        setLogo(logos["Maimai DX"]);
    }
  };

  const getRatingsForGame = (gameName) => {
    return members
      .map((member) => ({
        name: member.name,
        rating:
          member.rating && member.rating[gameName]
            ? parseFloat(member.rating[gameName])
            : null,
        displayRating:
          member.rating && member.rating[gameName]
            ? member.rating[gameName]
            : "No Data",
      }))
      .filter((member) => member.rating !== null)
      .sort((a, b) => b.rating - a.rating); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage:
          "url(https://cfr2.mionet.top/mionet-a/2024/10/14/670c040f69128.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CardMedia
        component="img"
        image={logo}
        alt="Game logo"
        sx={{ width: 240, height: 140, mt: 5, objectFit: "contain" }}
      />
      <Card
        sx={{
          minWidth: "75%",
          minHeight: "90%",
          boxShadow: 3,
          borderRadius: "16px",
          mt: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
            Rating Leaderboard
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Game tabs"
            centered
            variant="fullWidth"
          >
            <Tab label="maimai dx" />
            <Tab label="chunithm" />
            <Tab label="arcaea" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <GameLeaderboard
              game="Maimai DX"
              ratings={getRatingsForGame("Maimai DX")}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GameLeaderboard
              game="Chunithm"
              ratings={getRatingsForGame("Chunithm")}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <GameLeaderboard
              game="Arcaea"
              ratings={getRatingsForGame("Arcaea")}
            />
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
}

function GameLeaderboard({ game, ratings }) {
  return (
    <Box sx={{ mt: 2 }}>
      {ratings.map((player, index) => (
        <Box
          key={index}
          sx={{ display: "flex", justifyContent: "space-between", my: 1 }}
        >
          <Typography variant="body1">{player.name}</Typography>
          <Typography variant="body1">{player.displayRating}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Leaderboard;
