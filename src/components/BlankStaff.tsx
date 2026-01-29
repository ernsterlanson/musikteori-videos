import React from 'react';

interface BlankStaffProps {
    width: number;
    height: number;
}

export const BlankStaff: React.FC<BlankStaffProps> = ({ width, height }) => {
    const staffLineSpacing = 20;
    const staffMargin = 40;

    // Treble staff starts at 1/3 of height
    const trebleStaffY = height * 0.3;
    // Bass staff below
    const bassStaffY = trebleStaffY + 120;

    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
            {/* Treble Staff Lines */}
            {[0, 1, 2, 3, 4].map((i) => (
                <line
                    key={`treble-${i}`}
                    x1={staffMargin}
                    y1={trebleStaffY + i * staffLineSpacing}
                    x2={width - staffMargin}
                    y2={trebleStaffY + i * staffLineSpacing}
                    stroke="black"
                    strokeWidth="1.5"
                />
            ))}

            {/* Bass Staff Lines */}
            {[0, 1, 2, 3, 4].map((i) => (
                <line
                    key={`bass-${i}`}
                    x1={staffMargin}
                    y1={bassStaffY + i * staffLineSpacing}
                    x2={width - staffMargin}
                    y2={bassStaffY + i * staffLineSpacing}
                    stroke="black"
                    strokeWidth="1.5"
                />
            ))}

            {/* Treble Clef (simplified) */}
            <text
                x={staffMargin + 10}
                y={trebleStaffY + 50}
                fontSize="70"
                fontFamily="serif"
                fill="black"
            >
                𝄞
            </text>

            {/* Bass Clef (simplified) */}
            <text
                x={staffMargin + 10}
                y={bassStaffY + 30}
                fontSize="60"
                fontFamily="serif"
                fill="black"
            >
                𝄢
            </text>

            {/* Key Signature: 3 flats (Bb, Eb, Ab) for C minor */}
            {/* Treble clef flats */}
            <text x={staffMargin + 80} y={trebleStaffY + 18} fontSize="50" fontFamily="serif">♭</text>
            <text x={staffMargin + 105} y={trebleStaffY + 42} fontSize="50" fontFamily="serif">♭</text>
            <text x={staffMargin + 130} y={trebleStaffY + 10} fontSize="50" fontFamily="serif">♭</text>

            {/* Bass clef flats */}
            <text x={staffMargin + 80} y={bassStaffY + 30} fontSize="50" fontFamily="serif">♭</text>
            <text x={staffMargin + 105} y={bassStaffY + 54} fontSize="50" fontFamily="serif">♭</text>
            <text x={staffMargin + 130} y={bassStaffY + 22} fontSize="50" fontFamily="serif">♭</text>

            {/* Time Signature: 2/2 (alla breve - could use C with line through it) */}
            <text
                x={staffMargin + 160}
                y={trebleStaffY + 45}
                fontSize="40"
                fontFamily="serif"
                fill="black"
            >
                𝄴
            </text>
            <text
                x={staffMargin + 160}
                y={bassStaffY + 45}
                fontSize="40"
                fontFamily="serif"
                fill="black"
            >
                𝄴
            </text>

            {/* Bar line at start */}
            <line
                x1={staffMargin + 200}
                y1={trebleStaffY}
                x2={staffMargin + 200}
                y2={bassStaffY + 80}
                stroke="black"
                strokeWidth="2"
            />
        </svg>
    );
};
