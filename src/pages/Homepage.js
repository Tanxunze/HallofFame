import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const [members, setMembers] = useState([]);
    const [current, setCurrent] = useState(0); // Initialize current index
    console.log(members);//debug
    const navigate = useNavigate();

    const goToDetails = (id) => {
        navigate(`/member/${id}`);
        console.log(id);
    };

  useEffect(() => {
    fetch("member_data/member_data.json") 
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("加载成员数据时出错:", error));
  }, []);

  const handleNext = () => {
    setCurrent((prevCurrent) => (prevCurrent + 1) % members.length);
  };

  const handlePrev = () => {
    setCurrent(
      (prevCurrent) => (prevCurrent - 1 + members.length) % members.length
    );
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        width: "100%",
        height: "100vh",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('image/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px) brightness(100%)",
          zIndex: -1,
        },
      }}
    >
      <Typography variant="h3" component="h1" sx={{ my: 4, zIndex: 1 }}>
        Rhythm Game Hall of Fame
      </Typography>
      <Typography
        variant="h4"
        component="h1"
        sx={{ my: 1, color: "secondary", zIndex: 1 }}
      >
        那些值得我们铭记的成员
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <IconButton onClick={handlePrev} aria-label="previous">
          <ArrowBackIosNewIcon />
        </IconButton>
        {members.length > 0 && (
          <Card
            sx={{ flexGrow: 1, maxWidth: "66%", mx: "auto", my: 2 }}
            key={members[current].id}
            onClick={() => goToDetails(members[current].id)}//jump to member details page
          >
            <CardMedia
              component="img"
              height="50%" 
              image={members[current].image}
              alt={members[current].name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {members[current].name}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                {members[current].title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {members[current].description}
              </Typography>
            </CardContent>
          </Card>
        )}
        <IconButton onClick={handleNext} aria-label="next">
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Box sx={{ my: 4, textAlign: "center", zIndex: 1 }}>
        <Typography variant="body2">
          © 2024 MioNet. All rights reserved.
        </Typography>
        <Typography variant="body2">
          <a href="https://rgff.arcueid.org">Apply for Join here?</a>
        </Typography>
        <Typography variant="body2">
          <a href="https://sdut.arcueid.org">About</a>
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;
