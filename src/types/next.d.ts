import { ParsedUrlQuery } from "querystring";

declare module "next" {
  export interface PageProps {
    params?: ParsedUrlQuery;
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}

export {};
