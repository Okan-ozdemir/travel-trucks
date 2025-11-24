export const formatPrice = (price) => {
  if (price === undefined || price === null) return "€0.00";
  return `€${Number(price).toFixed(2)}`;
};

export const generateStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(i < rating);
  }
  return stars;
};

// Helper to normalize gallery images which might be strings or objects
export const getGalleryImages = (gallery) => {
  if (!Array.isArray(gallery)) return [];

  return gallery
    .map((item) => {
      if (typeof item === "string") return item;
      // Common API pattern: item is an object with 'original' property
      if (item && typeof item === "object") {
        return item.original || item.thumb || "";
      }
      return "";
    })
    .filter((url) => url !== "");
};

export const formatString = (str) => {
  if (!str) return "";
  // Insert space before capital letters and capitalize the first letter
  const formatted = str.replace(/([A-Z])/g, " $1").trim();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
};
