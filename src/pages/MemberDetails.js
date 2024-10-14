import { Box, Card, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Timeline from "./Timeline";

function MemberDetails() {
  const { id } = useParams(); 
  const [member, setMember] = useState(null); 
  const [error, setError] = useState(false); 

  useEffect(() => {
    fetch("/member_data/member_data.json") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const selectedMember = data.find((m) => m.id === parseInt(id));
        setMember(selectedMember);
      })
      .catch((error) => {
        console.error("加载成员数据时出错:", error);
        setError(true);
      });
  }, [id]);

  if (error) {
    return <Typography>Failed to load member details.</Typography>;
  }

  if (!member) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 4,
        minHeight: "80vh",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('/image/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px) brightness(100%)",
          zIndex: -1,
        },
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          maxWidth: 1200,
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" }, p: 2 }}>
          <img
            src={member.image}
            alt={member.name}
            style={{ width: "100%", height: "auto", marginBottom: 2 }}
          />
          <Typography variant="h4" component="h2">
            {member.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {member.title}
          </Typography>
          <Typography color="text.primary">{member.description}</Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />
        <Box sx={{ width: { xs: "100%", md: "50%" }, py: 2, px: 3 }}>
          <Timeline events={member.timeline} />
        </Box>
      </Card>
    </Box>
  );
}

export default MemberDetails;
