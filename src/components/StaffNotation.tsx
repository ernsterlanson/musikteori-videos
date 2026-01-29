import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export type NoteDuration = 'whole' | 'half' | 'quarter' | 'eighth' | 'sixteenth';
export type Clef = 'treble' | 'bass';

export interface Note {
  pitch: string; // e.g., 'C4', 'E4', 'G4'
  duration: NoteDuration;
  startTime: number; // in seconds
}

interface StaffNotationProps {
  notes: Note[];
  clef?: Clef;
  width?: number;
  height?: number;
  showClef?: boolean;
}

export const StaffNotation: React.FC<StaffNotationProps> = ({
  notes,
  clef = 'treble',
  width = 1200,
  height = 300,
  showClef = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Staff line positions (5 lines)
  const staffTop = height * 0.3;
  const staffSpacing = height * 0.08;
  const staffLines = [0, 1, 2, 3, 4].map((i) => staffTop + i * staffSpacing);

  // Note positions on the staff for treble clef
  // Middle C (C4) is one ledger line below the staff
  const notePositions: Record<string, number> = {
    // Ledger lines below
    C4: staffLines[4] + staffSpacing,
    D4: staffLines[4] + staffSpacing * 0.5,
    // On the staff
    E4: staffLines[4],
    F4: staffLines[3] + staffSpacing * 0.5,
    G4: staffLines[3],
    A4: staffLines[2] + staffSpacing * 0.5,
    B4: staffLines[2],
    C5: staffLines[1] + staffSpacing * 0.5,
    D5: staffLines[1],
    E5: staffLines[0] + staffSpacing * 0.5,
    F5: staffLines[0],
    // Ledger lines above
    G5: staffLines[0] - staffSpacing * 0.5,
    A5: staffLines[0] - staffSpacing,
  };

  // Calculate note head radius
  const noteRadius = staffSpacing * 0.6;

  // Calculate horizontal spacing for notes
  const leftMargin = 150;
  const noteSpacing = (width - leftMargin - 100) / Math.max(notes.length, 1);

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {/* Staff lines */}
      {staffLines.map((y, i) => (
        <line
          key={`staff-${i}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke="#000"
          strokeWidth={2}
        />
      ))}

      {/* Treble clef */}
      {showClef && clef === 'treble' && (
        <g transform={`translate(40, ${staffTop})`}>
          <path
            d="M 20 60 Q 15 40 20 20 Q 25 0 35 0 Q 45 0 45 10 Q 45 20 35 25 Q 25 30 25 40 Q 25 50 30 60 Q 35 70 30 80 Q 25 90 20 85 Q 15 80 20 70 L 25 50 Q 30 30 40 25 Q 50 20 50 30 Q 50 40 45 50 Q 40 60 35 65 Q 30 70 25 75 Q 20 80 15 90 Q 10 100 10 110 Q 10 120 15 125"
            fill="none"
            stroke="#000"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={45} cy={50} r={3} fill="#000" />
        </g>
      )}

      {/* Notes */}
      {notes.map((note, index) => {
        const noteX = leftMargin + index * noteSpacing;
        const noteY = notePositions[note.pitch] || staffLines[2];

        // Animation: spring in when note should appear
        const noteStartFrame = note.startTime * fps;
        const springValue = spring({
          frame: frame - noteStartFrame,
          fps,
          config: { damping: 20, stiffness: 200 },
        });

        const scale = interpolate(springValue, [0, 1], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const opacity = interpolate(springValue, [0, 1], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        // Only show notes that have started
        if (currentTime < note.startTime) {
          return null;
        }

        // Check if note needs ledger lines
        const needsLedgerLineAbove = noteY < staffLines[0];
        const needsLedgerLineBelow = noteY > staffLines[4];

        return (
          <g key={`note-${index}`} opacity={opacity}>
            {/* Ledger line for C4 (middle C) */}
            {note.pitch === 'C4' && (
              <line
                x1={noteX - noteRadius * 1.5}
                y1={noteY}
                x2={noteX + noteRadius * 1.5}
                y2={noteY}
                stroke="#000"
                strokeWidth={2}
              />
            )}

            {/* Ledger line for A5 */}
            {note.pitch === 'A5' && (
              <line
                x1={noteX - noteRadius * 1.5}
                y1={noteY}
                x2={noteX + noteRadius * 1.5}
                y2={noteY}
                stroke="#000"
                strokeWidth={2}
              />
            )}

            {/* Note head (ellipse for realistic look) */}
            <ellipse
              cx={noteX}
              cy={noteY}
              rx={noteRadius}
              ry={noteRadius * 0.8}
              fill={note.duration === 'whole' || note.duration === 'half' ? 'none' : '#000'}
              stroke="#000"
              strokeWidth={2}
              transform={`rotate(-20 ${noteX} ${noteY}) scale(${scale})`}
              style={{ transformOrigin: `${noteX}px ${noteY}px` }}
            />

            {/* Stem (for quarter, eighth, sixteenth notes) */}
            {(note.duration === 'quarter' ||
              note.duration === 'eighth' ||
              note.duration === 'sixteenth') && (
              <line
                x1={noteX + noteRadius * 0.9}
                y1={noteY}
                x2={noteX + noteRadius * 0.9}
                y2={noteY - staffSpacing * 3.5}
                stroke="#000"
                strokeWidth={2}
                style={{
                  transformOrigin: `${noteX}px ${noteY}px`,
                  transform: `scale(${scale})`,
                }}
              />
            )}

            {/* Flag for eighth notes */}
            {note.duration === 'eighth' && (
              <path
                d={`M ${noteX + noteRadius * 0.9} ${noteY - staffSpacing * 3.5} Q ${noteX + noteRadius * 2} ${noteY - staffSpacing * 3} ${noteX + noteRadius * 0.9} ${noteY - staffSpacing * 2.5}`}
                fill="#000"
                style={{
                  transformOrigin: `${noteX}px ${noteY}px`,
                  transform: `scale(${scale})`,
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
