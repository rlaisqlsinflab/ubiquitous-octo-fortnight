import { getYoutubeId } from './getYoutubeId';
import type { EmbedComponentProps } from './type';
import { RatioBox } from '../RatioBox';

export const YoutubeEmbed = ({ url }: EmbedComponentProps) => {
  const youtubeId = getYoutubeId(url);

  // NOTE: youtube 플레이어 매개변수 문서는 https://developers.google.com/youtube/player_parameters?hl=ko
  return (
    <RatioBox>
      <iframe
        className="video-text__iframe"
        src={`https://www.youtube.com/embed/${youtubeId}?disablekb=1&fs=1&modestbranding=1`}
        allowFullScreen></iframe>
    </RatioBox>
  );
};
