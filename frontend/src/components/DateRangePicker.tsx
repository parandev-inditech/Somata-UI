// DateRangePickerComponent.jsx
import React, { useState, useEffect } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (startDate: Date, endDate: Date) => void;
}

export default function DateRangePickerComponent({ startDate, endDate, onChange }: DateRangePickerProps) {
  const [range, setRange] = useState<Range[]>([
    {
      startDate: startDate,
      endDate: endDate,
      key: 'selection'
    }
  ]);

  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setRange([{
      startDate: startDate,
      endDate: endDate,
      key: 'selection'
    }]);
  }, [startDate, endDate]);

  const handleRangeChange = (item: RangeKeyDict) => {
    const newRange = {
      startDate: item.selection.startDate,
      endDate: item.selection.endDate,
      key: 'selection'
    };
    setRange([newRange]);
    
    if (newRange.startDate && newRange.endDate) {
      onChange(newRange.startDate, newRange.endDate);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => setShowCalendar(!showCalendar)}
        style={{
          padding: '8px 14px',
          backgroundColor: '#fff',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: '4px',
          cursor: 'pointer',
          minWidth: '200px',
          fontSize: '14px'
        }}
      >
        {format(range[0].startDate || new Date(), 'MMM dd, yyyy')} - {format(range[0].endDate || new Date(), 'MMM dd, yyyy')}
      </div>
      
      {showCalendar && (
        <div style={{
          position: 'absolute',
          zIndex: 999,
          top: '100%',
          left: 0,
          marginTop: '8px'
        }}>
          <DateRange
            onChange={handleRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            showDateDisplay={false}
          />
        </div>
      )}
    </div>
  );
}