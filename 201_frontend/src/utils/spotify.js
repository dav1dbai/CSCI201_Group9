const CLIENT_ID = '392b2c9d11614872b2c64a82d5f70c64';
const CLIENT_SECRET = '744a4ef0ff964402a3a70b98cf9fadbe';

let accessToken = null;

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

export const getTrackById = async (trackId) => {
  const token = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}?market=US`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
};

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

export const getTracksByIds = async (trackIds) => {
  try {
    const token = await getAccessToken();
    const validIds = trackIds.filter(id => id && id.length > 0).join(',');
    
    if (!validIds) {
      return { tracks: [] };
    }

    const response = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${validIds}&market=US`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Spotify API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return { tracks: [] };
  }
};

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

export const handleSpotifyError = (response) => {
  if (!response.ok) {
    throw new Error(`Spotify API Error: ${response.status} ${response.statusText}`);
  }
  return response;
};
