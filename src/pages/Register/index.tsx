import axios from 'axios';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const [input, setInput] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    lastName: '',
    firstName: '',
    age: 0,
  });
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const navigate = useNavigate();

  function checkPassword(passwordCheck: string) {
    if (input.password === passwordCheck) {
      return true;
    }
    return false;
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'passwordCheck') {
      setIsPasswordSame(checkPassword(event.target.value));
    }

    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  }

  async function handleRegister() {
    try {
      const response = await axios.post('http://localhost:3000/', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: input,
      });

      if (response.status === 201) {
        window.alert('회원가입이 완료되었습니다.');
        navigate('/');
      }
    } catch (e) {
      window.alert('회원가입에 실패했습니다.');
    }
  }

  return (
    <Box padding={2} paddingTop={4}>
      <Box marginBottom={4} textAlign={'center'}>
        <Typography variant="h4">회원 가입</Typography>
      </Box>
      <Box>
        <Stack spacing={3}>
          <TextField required id="id" label="아이디" onChange={handleInput} />
          <TextField required id="password" type="password" label="비밀번호" onChange={handleInput} />
          <TextField required id="passwordCheck" type="password" label="비밀번호 확인" onChange={handleInput} />
          {!isPasswordSame && (
            <Typography variant="body2" color="error">
              비밀번호가 일치하지 않습니다.
            </Typography>
          )}
        </Stack>
        <Box marginY={2}>
          <Divider />
        </Box>
        <Stack spacing={2}>
          <TextField required id="lastName" label="성" onChange={handleInput} />
          <TextField required id="firstName" label="이름" onChange={handleInput} />
          <TextField required id="age" label="나이" type="number" onChange={handleInput} />
        </Stack>
      </Box>
      <Box paddingY={6}>
        <Stack spacing={3} direction="row" justifyContent={'center'}>
          <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
            이전
          </Button>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            회원 가입
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
