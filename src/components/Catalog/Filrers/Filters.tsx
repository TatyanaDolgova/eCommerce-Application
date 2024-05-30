import Slider from 'rc-slider';
import { useCallback, useState } from 'react';

import 'rc-slider/assets/index.css';
import './Filters.css';

interface PriceFilterProps {
  onPriceChange: (minPrice: number, maxPrice: number) => void;
  onResetFilters: () => void;
  onSizeChange: (size: string) => void;
}

const Filrers: React.FC<PriceFilterProps> = ({
  onPriceChange,
  onSizeChange,
  onResetFilters,
}) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [minInput, setMinInput] = useState<string>('0');
  const [maxInput, setMaxInput] = useState<string>('100');
  const [size, setSize] = useState<string>('');

  const handleMinPriceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const numberValue = Number(value) || 0;

      setMinInput(value);
      if (numberValue > maxPrice) {
        setMaxPrice(numberValue);
        setMaxInput(value);
      }
      setMinPrice(numberValue);
    },
    [maxPrice],
  );

  const handleMaxPriceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const numberValue = Number(value) || 100;

      setMaxInput(value);
      if (numberValue < minPrice) {
        setMinPrice(numberValue);
        setMinInput(value);
      }
      setMaxPrice(numberValue);
    },
    [minPrice],
  );

  const handleApplyFilter = useCallback(() => {
    onPriceChange(minPrice, maxPrice);
    onSizeChange(size);
    setIsOpen(false);
  }, [minPrice, maxPrice, onPriceChange, size, onSizeChange]);

  const handleSliderChange = useCallback((value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinPrice(value[0]);
      setMaxPrice(value[1]);
      setMinInput(value[0].toString());
      setMaxInput(value[1].toString());
    }
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value);
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(100);
    setSize('');
    setMinInput('0');
    setMaxInput('100');
    onResetFilters();
  };

  return (
    <div className="filters-container">
      <div className="filters-header" onClick={toggleOpen}>
        Price: {minPrice} - {maxPrice} ▼{size && <div>Size: {size}</div>}
      </div>
      {isOpen && (
        <div className="filters-content">
          <div className="filter-section">
            <label className="filter-label">
              Min:
              <input
                className="filter-content-input"
                type="number"
                value={minInput}
                onChange={handleMinPriceChange}
              />
            </label>
            <label className="filter-label">
              Max:
              <input
                className="filter-content-input"
                type="number"
                value={maxInput}
                onChange={handleMaxPriceChange}
              />
            </label>
            <Slider
              range
              min={0}
              max={100}
              value={[minPrice, maxPrice]}
              onChange={handleSliderChange}
            />
          </div>
          <div className="filter-section">
            <label className="filter-label">
              Size:
              <select
                className="size-select"
                value={size}
                onChange={handleSizeChange}
              >
                <option value="">Any</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>
          </div>
          <div className="filter-buttons">
            <button className="filter-button" onClick={handleApplyFilter}>
              Apply
            </button>
            <button className="filter-button" onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filrers;
