import * as React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useCriteria } from "@/providers/criteria-provider";
import { cn } from "@/lib/utils";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

export function CriteriaList() {
  const { criterias, addCriteria, selected, setSelected, moveDown, moveUp } =
    useCriteria();

  useKeyboardShortcut(["escape"], () => {
    setSelected(null);
  });

  return (
    <div className=" h-screen w-64 overflow-hidden border  bg-background ">
      <ScrollArea className="h-full w-full py-4">
        <div className="flex justify-between items-center px-2">
          <p className="text-sm text-muted-foreground">Criterias</p>
          <Button
            onClick={() => addCriteria({})}
            className="rounded-full w-6 h-6"
            variant={"outline"}
            size={"icon"}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-2 py-2">
          {criterias.map((c, i) => (
            <div
              className={cn(
                "flex justify-between items-center hover:bg-muted rounded-md px-2",
                selected === i && "bg-accent"
              )}
              key={i}
              onClick={() => setSelected(i)}
            >
              <div
                className="text-sm cursor-pointer"
                
              >
                {c.name}
              </div>
              <div className="flex gap-1 items-center">
                <Button
                  size={"icon"}
                  className="rounded-full w-6 h-6"
                  variant={"ghost"}
                  disabled={i === 0}
                  onClick={() => moveUp(i)}
                >
                  <ArrowUp size={12} />
                </Button>

                <Button
                  size={"icon"}
                  className="rounded-full w-6 h-6"
                  variant={"ghost"}
                  disabled={i === criterias.length - 1}
                  onClick={() => moveDown(i)}
                >
                  <ArrowDown size={12} />
                </Button>

             
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
