'use client';
import { ComboBox } from '@/components/ComboBox';
import { DateRangePicker } from '@/components/DateRangePicker';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/services';
import { addDays } from 'date-fns';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export type SearchBarProps = {
  cities: { name: string }[];
  setRooms: any;
  setRange: any;
};
export default function SearchBar({
  cities,
  setRooms,
  setRange,
}: SearchBarProps) {
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const search = async () => {
    const res = await api(
      `/api/search/rooms?location=${city}&check_in=${date.from?.toISOString()}&check_out=${date.to?.toISOString()}`,
      'GET',
    );
    console.log(res);
    setRooms(res.data);
  };
  const [city, setCity] = useState<string>('');
  return (
    <div className="p-5 bg-secondary flex flex-row gap-10 rounded-lg">
      <div className="flex flex-col justify-between gap-3">
        <Label htmlFor="email" className="text-current-light">
          Điểm đến
        </Label>
        <ComboBox items={cities} setItem={setCity} />
      </div>

      <div>
        <Label>Khoảng thời gian đặt phòng</Label>
        <DateRangePicker date={date} setDate={setDate} />
      </div>

      <Button
        className=" uppercase rounded-full h-14 w-14 ml-auto "
        variant={'default'}
        size={'default'}
        onClick={() => {
          if (city === '') {
            toast({
              title: 'Thông báo',
              description: 'Vui lòng chọn điểm đến',
            });
          } else {
            search();
            setRange({
              check_in: date.from,
              check_out: date.to,
            });
          }
        }}
      >
        <Search color="white" size={17} />
      </Button>
    </div>
  );
}
