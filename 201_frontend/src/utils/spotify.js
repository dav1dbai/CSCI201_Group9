const CLIENT_ID = '392b2c9d11614872b2c64a82d5f70c64';
const CLIENT_SECRET = '744a4ef0ff964402a3a70b98cf9fadbe';

let accessToken = null;

// Get access token using client credentials flow
const getAccessToken = async () => {
  if (accessToken) return accessToken;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  accessToken = data.access_token;
  return accessToken;
};

// Get track by ID
export const getTrackById = async (trackId) => {
  const token = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}?market=US`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
};

// Search tracks
export const searchTracks = async (query, limit = 20) => {
  const token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

// Get several tracks by IDs
export const getTracksByIds = async (trackIds) => {
  const token = await getAccessToken();
  const ids = trackIds.join(',');
  const response = await fetch(
    `https://api.spotify.com/v1/tracks?ids=${ids}?market=US`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

// Get artist by ID
export const getArtistById = async (artistId) => {
  const token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

// Get artist's top tracks
export const getArtistTopTracks = async (artistId, market = 'US') => {
  const token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

// Error handling wrapper
export const handleSpotifyError = (response) => {
  if (!response.ok) {
    throw new Error(`Spotify API Error: ${response.status} ${response.statusText}`);
  }
  return response;
};
