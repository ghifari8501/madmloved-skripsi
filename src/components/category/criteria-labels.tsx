"use client";

import { CriteriaLabel } from "@/types";
import * as React from "react";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface CriteriaLabesProps {
  labels: CriteriaLabel[];
  onValueChange?: (labels: CriteriaLabel[]) => void;
}

export function CriteriaLabels({
  labels = [],
  onValueChange = () => {},
}: CriteriaLabesProps) {
  const [_labels, setLabels] = React.useState<CriteriaLabel[]>(labels);
  const [label, setLabel] = React.useState("");
  const [value, setValue] = React.useState<number | string>("");

  const labelRef = React.useRef<HTMLInputElement>(null);
  const valueRef = React.useRef<HTMLInputElement>(null);

  function handleRemove(index: number) {
    setLabels((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }

  function handleUpdate(
    index: number,
    type: "value" | "label",
    value: string,
    blur: boolean = false
  ) {
    if (type === "label") {
      const initialValue = _labels[index].label;
      let update = blur ? value.replace(/\s+/g, " ").trim() : value;

      update = blur && update.length < 1 ? "null" : update;

      setLabels((prev) => [
        ...prev.slice(0, index),
        { ...prev[index], label: update },
        ...prev.slice(index + 1),
      ]);
    }

    if (type === "value") {
      let update = blur ? Math.max(parseInt(value), 1) : parseInt(value);

      update = blur && !update ? 1 : update;

      setLabels((prev) => [
        ...prev.slice(0, index),
        { ...prev[index], value: update },
        ...prev.slice(index + 1),
      ]);
    }
  }

  function handleAdd() {
    if (label.length < 1) {
      labelRef.current?.focus();
      return;
    }

    if (value.toString().length < 1) {
      valueRef.current?.focus();
      return;
    }

    setLabels((prev) => [
      ...prev,
      {
        label: label.replace(/\s+/g, " ").trim(),
        value: Math.max(parseInt(value as string), 1),
      },
    ]);
    setValue("");
    setLabel("");
    labelRef.current?.focus();
  }

  React.useEffect(() => {
    setLabels(labels);
  }, [labels]);

  React.useEffect(() => {
    onValueChange(_labels);
  }, [_labels]);

  return (
    <div className="grid gap-2 py-4 text-xs">
      <div className="flex justify-between gap-2 items-end">
        <div className="flex gap-2 items-center">
          <div className="grid gap-2">
            <Label htmlFor="label">
              <p className="font-muted-foreground font-base">Label</p>
            </Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="h-6"
              ref={labelRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">
              <p className="font-muted-foreground font-base">Value</p>
            </Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
              className="h-6"
              ref={valueRef}
            />
          </div>
        </div>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="h-6 w-6 rounded-full"
          onClick={handleAdd}
        >
          <Plus size={12} />
        </Button>
      </div>
      {_labels.map((l, i) => (
        <div
          key={i}
          className="flex justify-between gap-2 items-end py-2 border-y border-border"
        >
          <div className="flex gap-2 items-center">
            <Input
              className="h-6 border-none"
              value={l.label}
              onChange={(e) => handleUpdate(i, "label", e.target.value)}
              onBlur={(e) => handleUpdate(i, "label", e.target.value, true)}
            />

            <Input
              type="number"
              className="h-6 border-none"
              value={l.value}
              onChange={(e) => handleUpdate(i, "value", e.target.value)}
              onBlur={(e) => handleUpdate(i, "value", e.target.value, true)}
            />
          </div>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="h-6 w-6 rounded-full text-destructive"
            onClick={() => handleRemove(i)}
          >
            <Trash2 size={12} />
          </Button>
        </div>
      ))}
    </div>
  );
}
