import axios from "axios";

const API_URL = "http://localhost:5000/api";

const instance = axios.create();
instance.interceptors.request.use((config) => {
  const originalRequest = config;
  originalRequest.baseURL = API_URL;
  return originalRequest;
});

// instance.interceptors.response.use(
//     (response) => response,
//     (error: AxiosError) => {
//         if (error.response?.status === 401) {
//             Toast.show({
//                 swipeable: true,
//                 type: "error",
//                 text1: "Session duration expired"
//             });
//             useUserStore.setState({ user: undefined, token: undefined });
//         }

//         return Promise.reject(error);
//     }
// );

export default instance;
