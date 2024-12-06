// Helper functions for making API calls to the review servlet
const API_BASE_URL = 'http://localhost:8080/FPP_9/'
/**
 * Submit a new review
 * @param {string} userId - The user's ID
 * @param {string} songId - The song's ID 
 * @param {number} stars - Rating from 1-5
 * @param {string} description - Review text
 * @returns {Promise} Response from the server
 */
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

/**
 * Get all reviews by a specific user
 * @param {string} userId - The user's ID
 * @returns {Promise} Array of review objects
 */
export const getReviewsByUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/review/user?user_id=${userId}`);
  return response.json();
};

/**
 * Get all reviews for a specific track
 * @param {string} trackId - The track/song ID
 * @returns {Promise} Array of review objects
 */
export const getReviewsByTrack = async (trackId) => {
  const response = await fetch(`${API_BASE_URL}/review/track?song_id=${trackId}`);
  return response.json();
};

/**
 * Format the star rating display
 * @param {number} rating - Number of stars (1-5)
 * @returns {string} Star rating as ★ characters
 */
export const formatStarRating = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

/**
 * Validate review input
 * @param {Object} review - Review object to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateReview = (userId, songId, stars, description) => {
  const errors = {};
  
  if (!stars || stars < 1 || stars > 5) {
    errors = 'Rating must be between 1 and 5 stars';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
