'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({
  selected,
  setDate,
}: {
  selected: Date | undefined;
  setDate: (date: Date) => void;
}) {
  const [open, setOpen] = React.useState(false);
  // const [dateInput, setDateInput] = React.useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date | undefined) => {
    setDate(date!);
    // setDateInput(date);
  };

  return (
    <div className='flex flex-col gap-3'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            id='date'
            className='w-fit justify-between text-lg font-normal'
          >
            {selected ? selected.toLocaleDateString() : 'YYYY.MM.DD'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            selected={selected}
            captionLayout='dropdown'
            onSelect={(date) => {
              handleDateChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
