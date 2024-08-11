import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BadgeIcon from "@mui/icons-material/Badge";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../service/userService";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userservice = new userService();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  async function Register() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const noSpaceRegex = /^\S+$/;

    if (!trimmedName || !noSpaceRegex.test(trimmedName)) {
      alert("ชื่อไม่ควรว่างเเละไม่ควร spacebar");
      return;
    }

    if (!trimmedEmail || !noSpaceRegex.test(trimmedEmail)) {
      alert("อีเมลไม่ควรว่างเเละไม่ควร spacebar");
      return;
    }

    if (!trimmedPassword || !noSpaceRegex.test(trimmedPassword)) {
      alert("รหัสผ่านไม่ควรว่างเเละไม่ควร spacebar");
      return;
    }

    const body = {
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
    };
    try {
      await userservice.PostUser(body);
      alert("สมัครสำเร็จ");
      navigateToLogin();
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate();

  function navigateToLogin() {
    navigate("/");
  }
  function navigateToBack() {
    navigate(-1);
  }
  return (
    <>
      <div className="bg">
        <Card sx={{ borderRadius: "50px", padding: "3.5rem" }}>
          <CardContent>
            <Typography variant="h3" align="center" marginBottom="3rem">
              Register
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Stack spacing={3} className="st-tf">
                <TextField
                  type="text"
                  placeholder="Username"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></TextField>
                <TextField
                  type="email"
                  placeholder="Email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></TextField>
                <TextField
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  placeholder="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></TextField>
                <Stack direction="row" justifyContent="space-between">
                  <IconButton onClick={navigateToBack}>
                    <ArrowBackIcon fontSize="large" />
                  </IconButton>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#6482AD", borderRadius: "25px" }}
                    size="large"
                    onClick={Register}
                  >
                    Login
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
export default RegisterPage;
