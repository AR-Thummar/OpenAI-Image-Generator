import { useState } from 'react';

const GenerateImage = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('medium');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/openai/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, size })
      });

      const data = await response.json();
      setImageUrl(data.choices[0].data.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>OpenAI Image Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a description"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option>small</option>
            <option>medium</option>
            <option>large</option>
        </select>
        <button type="submit">Generate Image</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
}

export default GenerateImage;