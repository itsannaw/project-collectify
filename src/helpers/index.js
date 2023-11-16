export const getFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};
export const getImageUrl = (name) => {
  console.log(new URL(`./${name}`, import.meta.url).href);
  return new URL(`./${name}`, import.meta.url).href;
};
