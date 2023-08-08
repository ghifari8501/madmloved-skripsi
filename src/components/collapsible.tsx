import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CollapsibleProps {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
}

export function Collapsible({ children, trigger }: CollapsibleProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-2 font-base text-sm">
          {trigger}
        </AccordionTrigger>
        <AccordionContent className="px-2">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
