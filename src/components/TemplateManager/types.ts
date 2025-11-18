export const enum TemplateAuthorType {
  'INFLAB' = 'INFLAB',
  'USER' = 'USER',
}

export type AuthorType = keyof typeof TemplateAuthorType;

export type ErrorType = 'api' | 'other';

export type Template = {
  createdAt: string;
  authorType: AuthorType;
  jsonBody: string;
  htmlBody: string;
  id: number;
  title: string;
};

export type TemplatesPagination = {
  pageNumber: number;
  totalPage: number;
  pageSize: number;
  totalCount: number;
  items?: Template[] | undefined;
};

export type CheckIsEmptyTemplateContent = (jsonBody: string) => boolean;
