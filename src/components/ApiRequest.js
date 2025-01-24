import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL, getHeaders } from '../utils/apiConfig';
import '../styles/apiRequest.css';

const ApiRequest = () => {
  const [apiKey, setApiKey] = useState(''); 
  const [response, setResponse] = useState(null); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const handleApiCall = async () => {
    if (!apiKey) {
      setError('API Key is required');
      return;
    }

    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const headers = getHeaders(apiKey); 
      const res = await axios.get(BASE_URL, { headers }); 
      setResponse(res.data); 
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to fetch data. Please check your API key and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-container">
      <h2>KidJig API Integration</h2>
      <input
        type="text"
        placeholder="Enter your API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="api-input"
      />
      <button onClick={handleApiCall} className="api-button" disabled={loading}>
        {loading ? 'Loading...' : 'Call API'}
      </button>
      {error && <p className="api-error">{error}</p>}
      {response && (
        <div className="api-response">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiRequest;
