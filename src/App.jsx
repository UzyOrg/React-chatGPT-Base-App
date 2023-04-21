import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent } from '@material-ui/core';

function App() {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    async function hoa(){

      const result = await axios.get('https://api.openai.com/v1/models',{
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_REACT_APP_CHATGPT_API_KEY}`,
          "Content-Type": "application/json"
        }
      })
      console.log(result)
    }
    
    hoa()
  }, [])
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(destination)
    console.log(budget)
    const response = await axios.post('https://api.openai.com/v1/completions', {
      "model":"gpt-3.5-turbo",
      "prompt": `Recommendations to travel to ${destination} on ${date} with a budget of ${budget} Mexican pesos`,
      "temperature": 0.5,
      "max_tokens": 60,
      "stop": "####"
      },
      {
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_REACT_APP_CHATGPT_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log(response)
    setRecommendations(response.data.choices.map(choice => choice.text));
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <TextField label="Destination" value={destination} onChange={(event) => setDestination(event.target.value)} />
        <TextField label="Travel Date" value={date} onChange={(event) => setDate(event.target.value)} />
        <TextField label="Budget" value={budget} onChange={(event) => setBudget(event.target.value)} />
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
      <div>
        {recommendations.map((recommendation, index) => (
          <Card key={index}>
            <CardContent>
              <p>{index + 1}. {recommendation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;

