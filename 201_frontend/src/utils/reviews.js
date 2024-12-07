const API_BASE_URL = 'http://localhost:8080/FPP_9/'

export const submitReview = async (userId, songId, stars, description) => {
  const response = await fetch(`${API_BASE_URL}/review/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      user_id: userId,
      song_id: songId, 
      stars,
      description
    })
  });
  return response;
};

export const getReviewsByUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/review/user?user_id=${userId}`);
  return response.json();
};

export const getReviewsByTrack = async (trackId) => {
  const response = await fetch(`${API_BASE_URL}/review/track?song_id=${trackId}`);
  return response.json();
};

export const formatStarRating = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

export const validateReview = (userId, songId, stars, description) => {
  const errors = {};
  
  if (!stars || stars < 1 || stars > 5) {
    errors.stars = 'Rating must be between 1 and 5 stars';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
