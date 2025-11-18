/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export type CreateTemplate = (title: string) => Promise<void>;
export type UpdateTemplate = (title: string, templateId: number) => Promise<void>;
export type DeleteTemplate = (templateId: number) => Promise<void>;

export type UpdateTemplateContent = (
  templateId: number,
  title: string,
  jsonBody: string,
  htmlBody: string,
  prompts?: Array<{
    id: string;
    description: string;
    content: string;
    textCount: number;
  }>,
  examples?: string[],
  curriculum?: {
    name: string;
    description: string;
    content: string;
  }
) => Promise<void>;

export type MyTemplateApiContextType = {
  createTemplate: CreateTemplate;
  updateTemplate: UpdateTemplate;
  deleteTemplate: DeleteTemplate;
  updateTemplateContent?: UpdateTemplateContent;
};

const defaultValue = {
  createTemplate: async () => {},
  updateTemplate: async () => {},
  deleteTemplate: async () => {},
  updateTemplateContent: async () => {},
};

export const MyTemplateApiContext = createContext<MyTemplateApiContextType>(defaultValue);
