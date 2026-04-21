import { Field, FieldGroup, FieldLabel } from "@shared/ui/chadcn/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/chadcn/select";

export type SortOption = "name-asc" | "name-desc";

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortSelect = ({ value, onChange }: Props) => {
  return (
    <FieldGroup className="flex gap-3 w-fit">
      <Field orientation="horizontal">
          <FieldLabel className="text-nowrap">Sort by</FieldLabel>
          <Select
            value={value}
            onValueChange={(v) => onChange(v as SortOption)}
          >
            <SelectTrigger className="rounded-2xl" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
       
      </Field>
    </FieldGroup>

  )
};

export default SortSelect;