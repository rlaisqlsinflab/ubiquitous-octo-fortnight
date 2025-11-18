import { createContext } from 'react';

const initialValue = {
  handleClickRemoveVideo: () => {
    //
  },
  handleClickUploadVideo: () => {
    //
  },
};

export const VideoTextContext = createContext(initialValue);
