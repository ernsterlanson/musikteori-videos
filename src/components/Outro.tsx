import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fade in animation
    const fadeIn = spring({
        frame,
        fps,
        config: { damping: 200 },
    });

    const opacity = interpolate(fadeIn, [0, 1], [0, 1]);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#1a1a2e',
                opacity,
            }}
        >
            <AbsoluteFill
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h2
                    style={{
                        fontSize: 60,
                        fontWeight: 'bold',
                        color: '#eee',
                        margin: 0,
                    }}
                >
                    Thanks for watching!
                </h2>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
