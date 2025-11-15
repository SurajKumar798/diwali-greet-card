import TextField from "@mui/material/TextField";
import HOC from "../../hoc/HigherOrderComponent";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";

const languages = [
  {
    value: 'English',
    label: 'English',
  },
  {
    value: 'Hindi',
    label: 'Hindi',
  },
  {
    value: 'Hindi + English',
    label: 'Hindi + English',
  },
];
const tones = [
  {
    value: 'Formal',
    label: 'Formal',
  },
  {
    value: 'Informal',
    label: 'Informal',
  },

];
function HomeComponent() {

  const navigate = useNavigate();

  const [geminiValues, setGeminiValues] = useState({
    recepientName: "",
    language: 'English',
    tone: 'Formal',
  });
  const [loading, setLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState("");

  const handleChange = (prop) => (e) => {
    setGeminiValues({ ...geminiValues, [prop]: e.target.value })
  }
  const handleGenerate = (e) => {
    e.preventDefault();
    console.log(geminiValues);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const apiVersion = import.meta.env.VITE_APP_API_VERSION;

    setLoading(true);
    axios
      .post(`${apiUrl}/${apiVersion}/gemini/generate`,
        {
          name: geminiValues.recepientName,
          language: geminiValues.language,
          tone: geminiValues.tone,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setGeminiResponse(response.data.data);
        setLoading(false);
        if (response.data.token) {
          Cookies.set('token', response.data.token, { expires: 7 });
          navigate('/home');
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const copyToClipboard = () => {
    if (!geminiResponse) {
      alert("Nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(geminiResponse);
    alert("copied to clipboard");
  };

  const createAnother = () => {
    setGeminiValues({
      recepientName: "",
      language: "English",
      tone: "Formal",
    });
    setGeminiResponse("");
    alert("You can now create another greeting!");
  }
  return (
    <main>
      <HeaderComponent />

      <form onSubmit={(e) => handleGenerate(e)} style={{ marginTop: '150px' }}>
        <TextField id="outputlined-basic"
          label="Recepient Name"
          variant="outlined"
          value={geminiValues.recepientName}
          onChange={handleChange('recepientName')}
          sx={{ width: '600px' }}
        />
        <TextField
          id="outlined-select-language-native"
          select
          label="Language"
          defaultValue="English"
          slotProps={{
            select: {
              native: true,
            },
          }}
          onChange={handleChange('language')}
          helperText="Please select your language"
          value={geminiValues.language}
          sx={{ width: '600px' }}
        >
          {languages.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-select-tone-native"
          select
          label="Tone"
          defaultValue="Formal"
          onChange={handleChange('tone')}
          slotProps={{
            select: {
              native: true,
            },
          }}
          value={geminiValues.tone}
          helperText="Please select your tone"
          sx={{ width: '600px' }}
        >
          {tones.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button variant="contained" type="submit" sx={{ fontSize: '20px', backgroundColor: '#f5d906', fontFamily: 'serif' }}>
          ✨ Generate ✨
        </Button>
      </form>

      <div>
        {loading ? <h1>Loading...</h1> : <h4>{geminiResponse}</h4>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          style={{ fontSize: '20px', backgroundColor: '#f5d906', fontFamily: 'serif', color: '#fff' }}
          onClick={copyToClipboard}
        >
          Copy to clipboard
        </button>

        <button
          style={{ fontSize: '20px', backgroundColor: '#f5d906', fontFamily: 'serif', color: '#fff' }}
          onClick={createAnother}
        >
          ← Create another</button>
      </div>

      <FooterComponent />
    </main>   
  );
}

export default HOC(HomeComponent);
