Bun bug!

- [ ] bun 1.2.8 windows 2ae7a1358e894f6b818a4cbff62f5eb731ef883f : `bun serve` Non-sourcemapped error (Choose an audio file)
- [ ] 4fca94759f54014b27700eca12e7d321d37dcd98 export button: frontend NotFoundError: Node was not found (no stacktrace?)

TODO:

- [x] never expose currentTime to react
  - it lied about doing it twice. so i'll do it myself
- [x] fix click drag select so it can select stuff off the edge of the screen (rn if you select & scroll it loses the ones off the screen)
- [x] play then scroll somewhere. broken! have to debug this one manually probably
- [x] Display notes on the waveform
- [x] scroll is inverted, flip it
- [ ] Implement undo/redo
- [ ] Add the ability to drag the end of a hold note to change its length
- [ ] Effects when a note passes below the line. It needs to disappear and play an effect and play its hitsound
- [ ] Before the first time you press space to play you have to click
- [ ] Need to do the binary search optimizations to reduce the performance impact of having thousands of notes
- [x] consider trying out a keyboard-only workflow: place notes with `dfjk`. place over a note to erase. advance with `;`, de-vance with `a`. hold space to play. 
  - simple to try, add support for 'a' to go back and ';' to go forwards. also add pressing a note over a note deletes it, which we want anyway
  - I don't like it
- [x] add keybind settings
- [ ] Enable setting two keys for each keybind. Default 'Delete Selection' to both 'Delete' and 'Backspace'. Default 'Place Note 3' to 'KeyJ and KeyG' and Place Note 4 to KeyK and KeyH
  - ran it once but it generated a diff
- [ ] allow creating sv patterns and bulk assigning patterns to svs
- [ ] add an errors thing that shows overlapping notes, svs with notes in them, ...
- [ ] add sv toggle
- [ ] add fps counter
- [x] remove findKeyAt, replace it with getKeysInBox
- [ ] get rid of song.blobUrl, we don't need it
- [x] fix sv calculations in export.ts
- [ ] edit multiple difficulties
- [ ] save/load project file
- [ ] import .osz file
- [x] make sure sv editor reflects game's ratio limitations
- [ ] switch sv mapping to be bpm-based to remove the speed limits

Export:

- [ ] does it work at all?
- [ ] bpm normalization
- [ ] generate the full .osz file
- [ ] import from .osz file

```
2025-07-10 20:15:58 [verbose]: Adding "Unknown Artist - Untitled (New Mapper) [Normal](1).osz" for import
2025-07-10 20:15:58 [verbose]: Handling batch import of 1 files
2025-07-10 20:15:58 [verbose]: ⚠️ Beatmap import is initialising...
2025-07-10 20:15:59 [verbose]: ⚠️ [?????] Database import or population failed and has been rolled back.
2025-07-10 20:15:59 [verbose]: 
2025-07-10 20:15:59 [verbose]: This error has been automatically reported to the devs.
2025-07-10 20:15:59 [verbose]: ⚠️ Could not import (Unknown Artist - Untitled (New Mapper) [Normal](1).osz)
2025-07-10 20:15:59 [verbose]: 
2025-07-10 20:15:59 [verbose]: This error has been automatically reported to the devs.
```

Features:

- [ ] sv mapping that preserves relative note position
  - check https://zardoru.github.io/sv-tools/
  - in editor we want to define an sv section between two notes:
  - this is just an easing function
  - default is linear
  - then we have to render it out to a few sv timing points
  - and then we have to update those timing points based on bpm which is ??????? idk even
    - let's not worry about that for now
  - how will we preview sv in editor?
    - ig it's a function (time) => (new_time)
    - and then we put an error if an sv segment overlaps

```
export type SvSegment = {
  startTime: number;
  midTime: number;
  endTime: number;

  duration: number; // between zero and one
  firstChange: number;
};
```
