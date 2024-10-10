export const handleAddQueryFilters = (ordering, grouping) => {
  const currentUrl = new URL(window.location.href);

  if (currentUrl.searchParams.has("ordering")) {
    currentUrl.searchParams.set("ordering", ordering);
  } else {
    currentUrl.searchParams.append("ordering", "Title");
  }
  if (currentUrl.searchParams.has("grouping")) {
    currentUrl.searchParams.set("grouping", grouping);
  } else {
    currentUrl.searchParams.append("grouping", "Status");
  }
  window.history.pushState(null, "", currentUrl);
};
