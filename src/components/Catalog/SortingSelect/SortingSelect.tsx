import './SortingSelect.css';

interface SortingSelectProps {
  onSortChange: (method: string) => void;
  sortMethod: string;
}

const SortingSelect: React.FC<SortingSelectProps> = ({
  sortMethod,
  onSortChange,
}) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="sorting-dropdown">
      <select
        className="sorting-select"
        value={sortMethod}
        onChange={handleSortChange}
      >
        <option className="sorting-option" value="price asc">
          Sort by Price ↓
        </option>
        <option className="sorting-option" value="price desc">
          Sort by Price ↑
        </option>
        <option className="sorting-option" value="name.en-US asc">
          Sort by Name (A-Z)
        </option>
      </select>
    </div>
  );
};

export default SortingSelect;
