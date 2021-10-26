export const ratingToRank = (rating: number): string => {
  if (rating < 100) {
    return `${30 - Math.floor(rating / 10)}k`;
  }

  if (rating < 2100) {
    return `${21 - Math.floor(rating / 100)}k`;
  }

  if (rating < 2700) {
    return `${Math.floor(rating / 100) - 20}d`;
  }

  return `${Math.floor((rating - 2700) / 30) + 1}p`;
};
