import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { MozartStaff } from '../../components/MozartStaff';

export const MozartSonataFacile: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Calculate how many notes to show based on the current frame
    // Each note appears every 0.5 seconds
    const noteInterval = fps * 0.5; // 0.5 seconds per note
    const notesToShow = Math.floor(frame / noteInterval);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <MozartStaff width={1400} height={400} notesToShow={notesToShow} />
        </AbsoluteFill>
    );
};
