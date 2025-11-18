import { getVimeoId } from './getVimeoId';
import type { EmbedComponentProps } from './type';
import { RatioBox } from '../RatioBox';

export const VimeoEmbed = ({ url }: EmbedComponentProps) => {
  const vimeoId = getVimeoId(url);

  return (
    <RatioBox>
      <iframe
        className="video-text__iframe"
        src={`https://player.vimeo.com/video/${vimeoId}`}></iframe>
    </RatioBox>
  );
};
