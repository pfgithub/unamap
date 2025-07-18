import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Beatmap, TimingSegment } from "@/store";

interface TimingTabProps {
  map: Beatmap;
  setMap: (map: Beatmap) => void;
  songUrl: string | null;
  getCurrentTime: () => number;
}

export function TimingTab({ map, setMap, songUrl, getCurrentTime }: TimingTabProps) {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);

  const selectedSegment = map.timing.find((s) => s.id === selectedSegmentId);

  const handleAddSegment = () => {
    const newSegment: TimingSegment = {
      id: crypto.randomUUID(),
      startTime: getCurrentTime(),
      bpm: 120,
    };
    const newTiming = [...map.timing, newSegment].sort((a, b) => a.startTime - b.startTime);
    setMap({ ...map, timing: newTiming });
    setSelectedSegmentId(newSegment.id);
  };

  const handleUpdateSegment = (field: "startTime" | "bpm", value: string) => {
    if (!selectedSegment) return;
    const numericValue = parseFloat(value);
    if (isNaN(numericValue) && value !== "") return;

    const updatedSegment = { ...selectedSegment, [field]: isNaN(numericValue) ? 0 : numericValue };

    let newTiming = map.timing.map((s) => (s.id === selectedSegmentId ? updatedSegment : s));

    if (field === "startTime") {
      newTiming.sort((a, b) => a.startTime - b.startTime);
    }

    setMap({ ...map, timing: newTiming });
  };

  const handleDeleteSegment = () => {
    if (!selectedSegmentId) return;
    const newTiming = map.timing.filter((s) => s.id !== selectedSegmentId);
    setMap({ ...map, timing: newTiming });
    setSelectedSegmentId(null);
  };

  return (
    <div className="flex flex-row h-full bg-[hsl(224,71%,4%)] rounded-lg border border-[hsl(217.2,32.6%,17.5%)] overflow-hidden">
      <div className="flex-grow flex flex-col gap-4 p-4">
        {/* Top section: Player and Add button */}
        <div className="flex flex-col gap-2">
          {!songUrl && (
            <div className="text-center text-[hsl(215,20.2%,65.1%)] p-4 bg-[hsl(217.2,32.6%,17.5%)] rounded-md h-[54px] flex items-center justify-center">
              Please select a song in the Metadata tab to enable timing controls.
            </div>
          )}
          <Button onClick={handleAddSegment} disabled={!songUrl}>
            Add Timing Segment at Current Time
          </Button>
        </div>

        {/* List of segments */}
        <div className="flex-grow overflow-y-auto border border-[hsl(217.2,32.6%,17.5%)] rounded-md bg-[hsl(222.2,84%,4.9%)]">
          <ul className="p-1">
            {map.timing.length > 0 ? (
              map.timing.map((segment) => (
                <li
                  key={segment.id}
                  onClick={() => setSelectedSegmentId(segment.id)}
                  className={cn(
                    "p-2 cursor-pointer hover:bg-[hsl(217.2,32.6%,17.5%)] rounded-md text-sm flex justify-between items-center",
                    selectedSegmentId === segment.id && "bg-[hsl(217.2,32.6%,17.5%)]",
                  )}
                >
                  <span>
                    Time: <strong>{segment.startTime.toFixed(3)}s</strong>
                  </span>
                  <span>
                    BPM: <strong>{segment.bpm}</strong>
                  </span>
                </li>
              ))
            ) : (
              <div className="text-center text-[hsl(215,20.2%,65.1%)] p-4">No timing segments added.</div>
            )}
          </ul>
        </div>
      </div>

      {/* Right sidebar: Editor */}
      {selectedSegment && (
        <aside className="w-80 border-l border-l-[hsl(217.2,32.6%,17.5%)] bg-[hsl(224,71%,4%)] p-4 flex flex-col gap-4 shrink-0">
          <h2 className="text-lg font-semibold">Edit Segment</h2>
          <div className="grid gap-1.5">
            <Label htmlFor="startTime">Start Time (s)</Label>
            <Input
              id="startTime"
              type="number"
              value={selectedSegment.startTime}
              onChange={(e) => handleUpdateSegment("startTime", e.target.value)}
              step="0.001"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="bpm">BPM</Label>
            <Input
              id="bpm"
              type="number"
              value={selectedSegment.bpm}
              onChange={(e) => handleUpdateSegment("bpm", e.target.value)}
            />
          </div>
          <Button onClick={handleDeleteSegment} variant="destructive" className="mt-auto">
            Delete Segment
          </Button>
        </aside>
      )}
    </div>
  );
}
