import clientAxios from "../config/Axios";

async function getData(url) {
  const data = await clientAxios.get(`admin/dashboard/${url}`, {
    withCredentials: true,
  });
  return data
}
export default getData;