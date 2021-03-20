import {PaginationInterface} from "../../pagination/pagination.interface";

export interface MocksInterface {
  _id: string;
  path: string;
  contentType: string;
  category: string;
  title: string;
  headers: string;
  body: string;
  status: string;
  charset: string;
}

export interface ResponseInterface {
  entries: MocksInterface[],
  pagination: PaginationInterface
}
