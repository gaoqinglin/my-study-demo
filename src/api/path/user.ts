import { get } from '../server'
import type { userInfo, testResponse } from '../apiInterface'

interface FcResponse<T> {
  code: string;
  msg: string;
  data: T;
}

export type ApiResponse<T> = Promise<FcResponse<T> | undefined>;
// export type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>;

// export function getUserInfo<T = { name: string }>(id: string): ApiResponse<T> {
//   return get<T>("/user/info", { id });
// }、
/**
 * 获取用户信息
 * <T = { name: string }> 如果没有指定返回的数据类型 则默认返回的数据类型为 { name: string } 如果指定了返回类型 则默认类型可以去掉 见下
 * ApiResponse<T> 传入返回的数据类型T
 * get<T> 也是数据类型T
 * @param id 数据id
 * @returns 
 */
// export const getUserInfo = <T = { name: string }>(id: string): ApiResponse<T> => {
//   return get<T>("/user/info", { id });
// };
export const getUserInfo = (params: { id: string }): ApiResponse<userInfo> => {
  return get<userInfo>("/user/info", { params });
};
export const otaPlanList = (params: { id: string }): ApiResponse<testResponse> => {
  return get<testResponse>("https://petstore3.swagger.io/api/v3/user/user1", { params });
};

export const userApi = {
  getUserInfo,
  otaPlanList,
};