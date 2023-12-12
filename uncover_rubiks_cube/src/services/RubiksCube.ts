import { CubeData, RandomCube, Solution } from "../types/http";
import { http } from "../utils/http";
/**
 * reset state data of Rubik's Cube 
 */
export const resetCubeStatusAPI = () => {
  return http({
    method: "POST",
    url: "/v1/reset_cube_status",
  });
};
/**
 * get state data of Rubik's Cube 
 */
export const getCubeStatusAPI = () => {
  return http<CubeData>({
    method: "GET",
    url: "/v1/get_cube_status",
  });
};
/**
 * set state data of Rubik's Cube 
 */
export const setCubeStatusAPI = (cubeStatus: string) => {
  return http({
    method: "POST",
    url: "/v1/set_cube_status",
    data: {
      cube_status: cubeStatus,
    },
  });
};
/**
 * get hint to uncover the Rubik's Cube 
 */
export const getHintAPI = (cubeStatus: string) => {
  return http<Solution>({
    method: "POST",
    url: "/v1/solve",
    data: {
      cube_state: cubeStatus,
    },
  });
};
/**
 * get state data of random Rubik's Cube 
 */
export const getRandomCube = () => {
  return http<RandomCube>({
    method: "get",
    url: "/v1/get_exercise_cube",
  });
};
