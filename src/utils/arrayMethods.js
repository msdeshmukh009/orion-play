const isPresentIn = (videoId, likedList, watchLater, history) => {
  const isLiked = likedList.find(eachVideo => eachVideo?._id === videoId);
  const isPresentInWatchLater = watchLater.find(eachVideo => eachVideo?._id === videoId);
  const isPresentInHistory = history.find(eachVideo => eachVideo?._id === videoId);

  return { isLiked, isPresentInWatchLater, isPresentInHistory };
};

export { isPresentIn };
