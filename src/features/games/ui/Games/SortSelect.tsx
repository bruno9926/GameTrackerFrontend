import { Field, FieldGroup, FieldLabel } from "@shared/ui/chadcn/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/chadcn/select";

export type SortOption = "name-asc" | "name-desc" | "more-recent" | "less-recent";

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortSelect = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-baseline gap-4 shrink-0">
      <span>Sort by</span>
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
            <SelectItem value="more-recent">Recently Updated</SelectItem>
            <SelectItem value="less-recent">Least Updated</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
};

export default SortSelect;