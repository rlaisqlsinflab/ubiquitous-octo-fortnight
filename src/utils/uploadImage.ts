import type { UploadFormData } from '@inflearn/editor';

type Props = {
  uploadImageAPI: UploadFormData;
  onError: () => void;
  onSuccess?: () => void;
};

const useUploadImage = ({ uploadImageAPI, onError, onSuccess }: Props) => {
  const uploadImage = async ({ formData }: { formData: FormData }) => {
    try {
      const { url } = await uploadImageAPI(formData);

      if (onSuccess) {
        onSuccess();
      }

      return url;
    } catch (error) {
      onError();
    }
  };

  return { uploadImage };
};

export default useUploadImage;
