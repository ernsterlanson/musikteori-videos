import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface IntroProps {
    title: string;
    subtitle?: string;
}

export const Intro: React.FC<IntroProps> = ({ title, subtitle }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Background fade in
    const bgOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // Title spring animation
    const titleSpring = spring({
        frame,
        fps,
        config: { damping: 20, stiffness: 200 },
    });

    const titleScale = interpolate(titleSpring, [0, 1], [0.8, 1]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // Subtitle delayed spring
    const subtitleSpring = spring({
        frame: frame - 0.3 * fps,
        fps,
        config: { damping: 200 },
    });

    const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1], {
        extrapolateLeft: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#1a1a2e',
                opacity: bgOpacity,
            }}
        >
            <AbsoluteFill
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 20,
                }}
            >
                <h1
                    style={{
                        fontSize: 80,
                        fontWeight: 'bold',
                        color: '#eee',
                        margin: 0,
                        textAlign: 'center',
                        transform: `scale(${titleScale})`,
                        opacity: titleOpacity,
                    }}
                >
                    {title}
                </h1>
                {subtitle && (
                    <p
                        style={{
                            fontSize: 36,
                            color: '#aaa',
                            margin: 0,
                            opacity: subtitleOpacity,
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
