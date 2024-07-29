import axios from 'axios'
import type { AxiosRequestConfig } from "axios"
import {
  handleRequestHeader,
  handleConfigureAuth,
  handleAuthError,
  handleGeneralError,
  handleNetworkError,
} from './tool'

interface IAnyObj {
  [index: string]: unknown;
}

interface FcResponse<T> {
  code: string;
  msg: string;
  data: T;
}

axios.interceptors.request.use((config) => {
  config = handleRequestHeader(config);
  config = handleConfigureAuth(config);
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);
    handleAuthError(response.data.code);
    handleGeneralError(response.data.code, response.data.msg);
    return response;
  },
  (err) => {
    handleNetworkError(err.response.status);
    Promise.reject(err.response);
  }
);
export const get = <T,>( url: string, config?: AxiosRequestConfig ): Promise<FcResponse<T> | undefined> =>
  new Promise((resolve, reject) => {
    axios
      .get(url, config)
      .then((result) => {
        console.log(result);
        resolve(result.data as FcResponse<T>);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const post = <T,>( url: string, data?: IAnyObj, config?: AxiosRequestConfig ): Promise<FcResponse<T> | undefined> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then((result) => {
        resolve(result.data as FcResponse<T>);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const put = <T,>( url: string, data?: IAnyObj, config?: AxiosRequestConfig ): Promise<FcResponse<T> | undefined> => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, config)
      .then((result) => {
        resolve(result.data as FcResponse<T>);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const del = <T,>( url: string, config?: AxiosRequestConfig ): Promise<FcResponse<T> | undefined> =>
  new Promise((resolve, reject) => {
    axios
      .delete(url, config)
      .then((result) => {
        resolve(result.data as FcResponse<T>);
      })
      .catch((err) => {
        reject(err);
      });
  });

// export const get = <T,>( url: string, config?: AxiosRequestConfig ): Promise<[any, FcResponse<T> | undefined]> =>
//   new Promise((resolve) => {
//     axios
//       .get(url, config)
//       .then((result) => {
//         resolve([null, result.data as FcResponse<T>]);
//       })
//       .catch((err) => {
//         resolve([err, undefined]);
//       });
//   });

// export const post = <T,>( url: string, data?: IAnyObj, config?: AxiosRequestConfig ): Promise<[any, FcResponse<T> | undefined]> => {
//   return new Promise((resolve) => {
//     axios
//       .post(url, data, config)
//       .then((result) => {
//         resolve([null, result.data as FcResponse<T>]);
//       })
//       .catch((err) => {
//         resolve([err, undefined]);
//       });
//   });
// };
// export const put = <T,>( url: string, data?: IAnyObj, config?: AxiosRequestConfig ): Promise<[any, FcResponse<T> | undefined]> => {
//   return new Promise((resolve) => {
//     axios
//       .put(url, data, config)
//       .then((result) => {
//         resolve([null, result.data as FcResponse<T>]);
//       })
//       .catch((err) => {
//         resolve([err, undefined]);
//       });
//   });
// };
// export const del = <T,>( url: string, config?: AxiosRequestConfig ): Promise<[any, FcResponse<T> | undefined]> =>
//   new Promise((resolve) => {
//     axios
//       .delete(url, config)
//       .then((result) => {
//         resolve([null, result.data as FcResponse<T>]);
//       })
//       .catch((err) => {
//         resolve([err, undefined]);
//       });
//   });