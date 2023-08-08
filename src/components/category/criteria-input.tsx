import * as React from "react";
import Select from "react-select";

import { Criteria } from "@/types";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import CurrencyInput from "react-currency-input-field";

interface CriteriaInputProps extends Criteria {
  onValueChange?: (score: number) => void;
  value?: number;
  debug?: boolean;
}

export function CriteriaInput({
  onValueChange = () => {},
  value,
  debug = false,
  ...props
}: CriteriaInputProps) {
  const { name, labels, cost, max, min, weight, inputType } = props;

  const [_value, setValue] = React.useState(value || min);
  const [input, setInput] = React.useState<string | number>(value || min);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    setScore(
      cost
        ? Number(((min / _value) * weight).toFixed(2))
        : Number(((_value / max) * weight).toFixed(2))
    );
  }, [_value]);

  React.useEffect(() => {
    onValueChange(score);
  }, [score]);

  return (
    <>
      {inputType === "slider" && (
        <div className="text-sm grid px-2">
          <div className="flex justify-between ">
            <span className="text-muted-foreground text-xs">
              {name} {`(${min} - ${max})`}
            </span>
            <span>{_value}</span>
          </div>
          <div className="px-2 py-4">
            <Slider
              min={min}
              max={max}
              step={1}
              defaultValue={[min]}
              value={[_value]}
              onValueChange={(v) => setValue(v[0])}
            />
          </div>
          {debug && <span>Score : {score}</span>}
        </div>
      )}

      {inputType === "select" && (
        <div className="text-sm grid px-2">
          <div className="flex justify-between ">
            <span className="text-muted-foreground text-xs">{name}</span>
            {debug && <span>{_value}</span>}
          </div>
          <div className="px-2 py-2">
            <Select
              options={labels}
              onChange={(e) => setValue(parseInt(e?.value as string) || min)}
            />
          </div>
          {debug && <span>Score : {score}</span>}
        </div>
      )}
      {inputType === "numeric" && (
        <div className="text-sm grid px-2">
          <div className="flex justify-between ">
            <span className="text-muted-foreground text-xs">{name}</span>
            {debug && <span>{_value}</span>}
          </div>
          <div className="px-2 py-2">
            <Input
              type="number"
              defaultValue={_value}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={(e) => {
                const val = Math.max(parseInt(e.target.value), 1);

                setValue(val || min);
                setInput(val);
              }}
            />
          </div>
          {debug && <span>Score : {score}</span>}
        </div>
      )}
      {inputType === "radio" && (
        <div className="text-sm grid px-2">
          <div className="flex justify-between ">
            <span className="text-muted-foreground text-xs">{name}</span>
            {debug && <span>{_value}</span>}
          </div>
          <div className="px-2 py-2">
            <RadioGroup onValueChange={(v) => setValue(parseInt(v))}>
              {labels.map((l, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={l.value as string}
                    id={`${l.label}-${i}`}
                  />
                  <Label htmlFor={`${l.label}-${i}`}>{l.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          {debug && <span>Score : {score}</span>}
        </div>
      )}

      {inputType === "currency" && (
        <div className="text-sm grid px-2">
          <div className="flex justify-between ">
            <span className="text-muted-foreground text-xs">{name}</span>
            {debug && <span>{_value}</span>}
          </div>
          <div className="px-2 py-2">
            <CurrencyInput
              id="htmlFor"
              className={
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              }
              defaultValue={value}
              intlConfig={{ currency: "IDR", locale: "id-ID" }}
              onValueChange={(v) => {
                const val = Number(v);
                setValue(Number.isNaN(val) ? min : val);
              }}
            />
          </div>
          {debug && <span>Score : {score}</span>}
        </div>
      )}
    </>
  );
}
