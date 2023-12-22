/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/login/": {
    /** Login */
    post: operations["login_login__post"];
  };
  "/gened/": {
    /** Gened */
    get: operations["gened_gened__get"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** GenEdResponseDto */
    GenEdResponseDto: {
      /** Wellness */
      Wellness: number;
      /** Entrepreneurship */
      Entrepreneurship: number;
      /** Thai Citizen And Global Citizen */
      Thai_Citizen_and_Global_Citizen: number;
      /** Language And Communication */
      Language_and_Communication: number;
      /** Aesthetics */
      Aesthetics: number;
      /** Others */
      Others: number;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** LoginBodyDto */
    LoginBodyDto: {
      /** Username */
      username: string;
      /** Password */
      password: string;
    };
    /** LoginResponseDto */
    LoginResponseDto: {
      /** Code */
      code: string;
      /** Message */
      message: string;
      /** Accesstoken */
      accesstoken: string;
      /** Renewtoken */
      renewtoken: string;
      /** User */
      user: Record<string, never>;
      /** Rolemenus */
      roleMenus: unknown[];
      /** Cache */
      cache: boolean;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** Login */
  login_login__post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginBodyDto"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["LoginResponseDto"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Gened */
  gened_gened__get: {
    parameters: {
      query: {
        stdid: string;
      };
      header?: {
        "x-access-token"?: string | null;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["GenEdResponseDto"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}