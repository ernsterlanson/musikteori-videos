import React, { useEffect, useRef } from 'react';
import { Stave, Formatter, Renderer, StaveNote, Voice } from 'vexflow';

interface MozartStaffProps {
    width: number;
    height: number;
    notesToShow: number;
}

export const MozartStaff: React.FC<MozartStaffProps> = ({ width, height, notesToShow }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear previous render
        containerRef.current.innerHTML = '';

        // Create an SVG renderer
        const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
        renderer.resize(width, height);
        const context = renderer.getContext();

        // Create treble staff with proper width for 4 bars
        const barWidth = (width - 100) / 4;
        const trebleStave = new Stave(50, 40, width - 100);
        trebleStave.addClef('treble').addTimeSignature('2/2').addKeySignature('Eb'); // 3 flats
        trebleStave.setContext(context).draw();

        // Add bar lines for 4 bars
        for (let i = 1; i <= 4; i++) {
            const x = 50 + i * barWidth;
            context.moveTo(x, 40);
            context.lineTo(x, 40 + 80);
            context.stroke();
        }

        // Create bass staff
        const bassStave = new Stave(50, 140, width - 100);
        bassStave.addClef('bass').addTimeSignature('2/2').addKeySignature('Eb'); // 3 flats
        bassStave.setContext(context).draw();

        // Add bar lines for bass staff
        for (let i = 1; i <= 4; i++) {
            const x = 50 + i * barWidth;
            context.moveTo(x, 140);
            context.lineTo(x, 140 + 80);
            context.stroke();
        }

        // Only add notes if notesToShow > 0
        if (notesToShow > 0) {
            try {
                // Define notes (simplified Mozart K.457 opening)
                const allNotes = [
                    new StaveNote({ keys: ['c/4', 'c/5'], duration: 'h' }),
                    new StaveNote({ keys: ['c/5', 'eb/5', 'g/5'], duration: '8' }),
                    new StaveNote({ keys: ['c/5', 'eb/5', 'g/5'], duration: '8' }),
                    new StaveNote({ keys: ['c/5', 'eb/5', 'g/5'], duration: '8' }),
                    new StaveNote({ keys: ['c/5', 'eb/5', 'g/5'], duration: '8' }),
                ];

                const notesToRender = allNotes.slice(0, notesToShow);

                if (notesToRender.length > 0) {
                    const voice = new Voice({ num_beats: 4, beat_value: 4 });
                    voice.addTickables(notesToRender);

                    new Formatter().joinVoices([voice]).format([voice], width - 100);
                    voice.draw(context, trebleStave);
                }
            } catch (error) {
                console.error('Error rendering notes:', error);
            }
        }
    }, [width, height, notesToShow]);

    return <div ref={containerRef} />;
};
