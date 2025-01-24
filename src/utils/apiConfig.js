export const BASE_URL = 'https://api.kidjig.com/provider';

export const getHeaders = (apiKey) => ({
  'Content-Type': 'application/json',
  'X-Api-Key': apiKey,
});
