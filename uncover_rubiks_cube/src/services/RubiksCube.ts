import { CubeData, RandomCube, Solution } from "../types/http";
import { http } from "../utils/http";

export const resetCubeStatusAPI = () => {
  return http({
    method: "POST",
    url: "/v1/reset_cube_status",
  });
};

export const getCubeStatusAPI = () => {
  return http<CubeData>({
    method: "GET",
    url: "/v1/get_cube_status",
  });
};

export const setCubeStatusAPI = (cubeStatus: string) => {
  return http({
    method: "POST",
    url: "/v1/set_cube_status",
    data: {
      cube_status: cubeStatus,
    },
  });
};

export const getHintAPI = (cubeStatus: string) => {
  return http<Solution>({
    method: "POST",
    url: "/v1/solve",
    data: {
      cube_state: cubeStatus,
    },
  });
};

export const getRandomCube = () => {
  return http<RandomCube>({
    method: "get",
    url: "/v1/get_exercise_cube",
  });
};
