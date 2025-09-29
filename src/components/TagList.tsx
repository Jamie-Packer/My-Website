// src/components/TagList.tsx

interface TagListProps {
  items: string[];
}

const TagList = ({ items }: TagListProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {items.map((item) => (
        <span
          key={item}
          className="bg-accent/10 border border-accent/30 text-foreground2 text-xs font-semibold px-2.5 py-1 rounded-md"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default TagList;
