import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/buttons/Button";
import { Dropdown } from "@/components/form/Dropdown";
import { usePlayer } from "@/components/player/hooks/usePlayer";
import { Title } from "@/components/text/Title";
import { TextInputControl } from "@/components/text-inputs/TextInputControl";
import { PlaybackErrorPart } from "@/pages/parts/player/PlaybackErrorPart";
import { PlayerPart } from "@/pages/parts/player/PlayerPart";
import { PlayerMeta, playerStatus } from "@/stores/player/slices/source";
import { SourceSliceSource, StreamType } from "@/stores/player/utils/qualities";

const testMeta: PlayerMeta = {
  releaseYear: 2010,
  title: "Sintel",
  tmdbId: "",
  type: "movie",
};

const testStreams: Record<StreamType, string> = {
  hls: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
};

const streamTypes: Record<StreamType, string> = {
  hls: "HLS",
  mp4: "MP4",
};

export default function VideoTesterView() {
  const { status, playMedia, setMeta } = usePlayer();

  const start = useCallback(
    (url: string, type: StreamType) => {
      let source: SourceSliceSource;
      if (type === "hls") {
        source = {
          type: "hls",
          url,
        };
      } else if (type === "mp4") {
        source = {
          type: "file",
          qualities: {
            unknown: {
              type: "mp4",
              url,
            },
          },
        };
      } else throw new Error("Invalid type");
      setMeta(testMeta);
      playMedia(source, [], null);
    },
    [playMedia, setMeta],
  );

  useEffect(() => {
    start(testStreams.mp4, "mp4");
  }, [start]);

  return (
    <PlayerPart backUrl="/">
      {/* {status === playerStatus.IDLE ? (
        <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex-1">
                <Title>Preset tests</Title>
                <div className="grid grid-cols-[1fr,1fr] gap-2">
                  <Button onClick={() => start(testStreams.hls, "hls")}>
                    HLS test
                  </Button>
                  <Button onClick={() => start(testStreams.mp4, "mp4")}>
                    MP4 test
                  </Button>
                </div>
              </div>
            </div>
      ) : null} */}
      {/* {status === playerStatus.PLAYBACK_ERROR ? <PlaybackErrorPart /> : null} */}
    </PlayerPart>
  );
}
