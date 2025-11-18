/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export type CreateTemplate = (title: string) => Promise<void>;
export type UpdateTemplate = (title: string, templateId: number) => Promise<void>;

export type DeleteTemplate = (templateId: number) => Promise<void>;

export type MyTemplateApiContextType = {
  createTemplate: CreateTemplate;
  updateTemplate: UpdateTemplate;
  deleteTemplate: DeleteTemplate;
};

const defaultValue = {
  createTemplate: async () => {},
  updateTemplate: async () => {},
  deleteTemplate: async () => {},
};

export const MyTemplateApiContext = createContext<MyTemplateApiContextType>(defaultValue);
