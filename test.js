const title = undefined;
const content = undefined;

if (
  title === undefined ||
  content === undefined ||
  !(title.trim() && content.trim())
) {
  console.log("Invalid title or content!");
} else {
  console.log("Valid title and content!");
}
