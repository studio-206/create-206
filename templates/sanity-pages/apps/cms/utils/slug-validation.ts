export function isValidSlug(slug) {
  // Regular expression to match a valid slug
  const regex = new RegExp(/^(?=.*[a-z]{3,})[a-z0-9]+(?:-[a-z0-9]+)*$/);

  return regex.test(slug);
}
