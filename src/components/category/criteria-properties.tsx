import * as React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import {
  DEFAULT_CRITERIA_VALUE,
  useCriteria,
} from "@/providers/criteria-provider";
import { cn } from "@/lib/utils";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { Collapsible } from "../collapsible";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { Criteria, CriteriaInputType } from "@/types";
import { SelectMain } from "../ui/select";
import Select from "react-select";
import { CriteriaLabels } from "./criteria-labels";

const INPUT_OPTIONS = [
  { value: "numeric", label: "Numeric" },
  { value: "currency", label: "Currency (IDR)" },
  { value: "radio", label: "Radio" },
  { value: "slider", label: "Slider" },
  { value: "select", label: "Select" },
];

export function CriteriaProperties() {
  const { removeCriteria, updateCriteria, selected, criterias, nameInput } =
    useCriteria();
  const [criteria, setCriteria] = React.useState<Criteria>(
    DEFAULT_CRITERIA_VALUE
  );
  const [inputType, setInputType] = React.useState(0);

  React.useEffect(() => {
    if (selected !== null) {
      setCriteria(criterias[selected]);
      setInputType(
        INPUT_OPTIONS.map((o) => o.value).indexOf(criterias[selected].inputType)
      );
    }
  }, [selected, criterias]);

  function handleRemove() {
    if (selected !== null) {
      removeCriteria(selected);
    }
  }

  useKeyboardShortcut(["delete"], handleRemove);

  function handleUpdateName() {
    const validate = criteria.name.replace(/\s+/g, " ").trim();
    const update = { ...criteria, name: validate };
    setCriteria(update);

    if (selected !== null) {
      updateCriteria(update, selected);
    }
  }

  function handleUpdateMin() {
    const max = criteria.max;
    const min = criteria.min;

    const validate = Math.min(max, Math.max(min, 1));
    const update = { ...criteria, min: validate };
    setCriteria(update);

    if (selected !== null) {
      updateCriteria(update, selected);
    }
  }

  function handleUpdateMax() {
    const max = criteria.max;
    const min = criteria.min;

    const validate = Math.max(max, min);
    const update = { ...criteria, max: validate };
    setCriteria(update);

    if (selected !== null) {
      updateCriteria(update, selected);
    }
  }

  if (selected === null || !criteria) return <div></div>;

  return (
    <div className=" h-screen min-w-[240px] overflow-hidden border  bg-background text-sm">
      <ScrollArea className="grid gap-2 h-full w-full py-4">
        <div className="flex justify-between items-center px-2">
          <p className="text-sm text-muted-foreground">Criteria Properties</p>
          <Button
            size={"icon"}
            className="rounded-full text-destructive"
            variant={"ghost"}
            onClick={() => removeCriteria(selected)}
          >
            <Trash2 size={16} />
          </Button>
        </div>

        <div className="grid gap-2 px-2 py-4 border-b border-border">
          <Label htmlFor="name">
            <p className="font-base text-xs text-muted-foreground ">Name</p>
          </Label>
          <Input
            id="name"
            autoComplete="off"
            ref={nameInput}
            value={criteria.name}
            onChange={(e) =>
              setCriteria((prev) => ({ ...prev, name: e.target.value }))
            }
            onBlur={handleUpdateName}
          />
        </div>

        <div className="grid gap-2 px-2 py-4 border-b border-border">
          <p className="font-base text-xs text-muted-foreground ">Range</p>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label htmlFor="max">Max</Label>
            <Input
              id="max"
              type="number"
              value={criteria.max}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  max: parseInt(e.target.value),
                }))
              }
              onBlur={handleUpdateMax}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label htmlFor="min">Min</Label>
            <Input
              id="min"
              type="number"
              value={criteria.min}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  min: parseInt(e.target.value),
                }))
              }
              onBlur={handleUpdateMin}
            />
          </div>
        </div>

        <Collapsible trigger="Calculation">
          <div className="grid gap-2 px-2 py-4 border-b border-border">
            <div className="grid gap-2 items-center">
              <div className="flex justify-between items-center">
                <Label htmlFor="weight">Weight</Label>
                <span>{criteria.weight.toFixed(2)}</span>
              </div>
              <div className="pb-4 pt-3">
                <Slider
                  id="weight"
                  step={0.01}
                  min={0}
                  max={1}
                  value={[criteria.weight]}
                  onValueChange={(v) =>
                    setCriteria((prev) => ({ ...prev, weight: v[0] }))
                  }
                  onValueCommit={() => updateCriteria(criteria, selected)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="cost">Cost</Label>
              <Switch
                id="cost"
                checked={criteria.cost}
                onCheckedChange={(cost) => {
                  setCriteria((prev) => ({ ...prev, cost }));
                  updateCriteria({ ...criteria, cost }, selected);
                }}
              />
            </div>
          </div>
        </Collapsible>

        <div className="grid gap-2 px-2 py-4 border-b border-border">
          <Label htmlFor="inputType">
            <p className="font-base text-xs text-muted-foreground ">
              Input Type
            </p>
          </Label>
          <Select
            id="inputType"
            value={INPUT_OPTIONS[inputType]}
            options={INPUT_OPTIONS}
            onChange={(e) => {
              setCriteria((prev) => ({
                ...prev,
                inputType: e?.value as CriteriaInputType,
              }));
              updateCriteria(
                { ...criteria, inputType: e?.value as CriteriaInputType },
                selected
              );
            }}
          />
        </div>

        <Collapsible trigger="Labels">
          <CriteriaLabels
            labels={criteria.labels}
            onValueChange={(labels) => {
              console.log(labels);
              setCriteria((prev) => ({
                ...prev,
                labels,
              }));
              updateCriteria({ ...criteria, labels }, selected);
            }}
          />
        </Collapsible>
      </ScrollArea>
    </div>
  );
}
