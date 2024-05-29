import Slider from 'rc-slider';
import { useCallback, useState } from 'react';

import 'rc-slider/assets/index.css';
import './PriceFilter.css';

interface PriceFilterProps {
  onPriceChange: (minPrice: number, maxPrice: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [minInput, setMinInput] = useState<string>('3');
  const [maxInput, setMaxInput] = useState<string>('80');

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
    setIsOpen(false);
  }, [minPrice, maxPrice, onPriceChange]);

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

  return (
    <div className="price-filter-container">
      <div className="price-filter-header" onClick={toggleOpen}>
        Price ▼
      </div>
      {isOpen && (
        <div className="price-filter-content">
          <label className="price-filter-label">
            Min:
            <input
              className="price-filter-content-input"
              type="number"
              value={minInput}
              onChange={handleMinPriceChange}
            />
          </label>
          <label className="price-filter-label">
            Max:
            <input
              className="price-filter-content-input"
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
          <button className="price-filter-button" onClick={handleApplyFilter}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
