import { VimeoEmbed } from './VimeoEmbed';
import { YoutubeEmbed } from './YoutubeEmbed';
import { EmbedType } from '../type';
import { getEmbedType } from '../utils/getEmbedType';

type VideoEmbedProps = {
  url: string;
};

export const VideoEmbed = ({ url }: VideoEmbedProps) => {
  const embedType = getEmbedType(url);

  return (
    <>
      {embedType === EmbedType.YOUTUBE ? <YoutubeEmbed url={url} /> : null}
      {embedType === EmbedType.VIMEO ? <VimeoEmbed url={url} /> : null}
    </>
  );
};
