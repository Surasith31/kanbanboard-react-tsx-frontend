import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "../../App.css";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { userService } from "../../service/userService";
import { userGetRequest } from "../../model/userGetRequest";
function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userservice = new userService();
  const navigate = useNavigate();

  async function Login() {
    const body = {
      email: email,
      password: password,
    };
    try {
      const res = await userservice.Login(body);
      const user: userGetRequest[] = res.data;
      if (res.status == 202) {
        localStorage.clear();
        localStorage.setItem("objUser", JSON.stringify(user[0].id));
        alert("เข้าสู่ระบบสำเร็จ");
        navigateToBoard();
      }
    } catch (error) {
      alert("อีเมลหรือรหัสไม่ถูกต้อง");
    }
  }
  function navigateToRegister() {
    navigate("/Register");
  }
  function navigateToBoard() {
    navigate("/Board");
  }
  return (
    <>
      <div className="bg">
        <Card sx={{ borderRadius: "50px", padding: "3.5rem" }}>
          <CardContent>
            <Typography variant="h3" align="center" marginBottom="3rem">
              Login
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Stack spacing={3} className="st-tf">
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
                  <Button variant="text" onClick={navigateToRegister}>
                    Register
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#6482AD", borderRadius: "10px" }}
                    size="large"
                    onClick={Login}
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
export default LoginPage;
