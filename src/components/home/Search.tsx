'use client';
import ListRoom from '@/components/home/ListRoom';
import SearchBar from '@/components/home/SearchBar';
import { Card } from '@/components/ui/card';
import { Room } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';

export type SearchProps = {
  cities: any;
  rooms: Room[];
};
export default function Search({ cities, rooms }: SearchProps) {
  const [_rooms, setRooms] = useState<Room[]>(rooms);
  const [range, setRange] = useState({
    check_in: new Date(),
    check_out: new Date(),
  });
  return (
    <div>
      <Card className="h-96 relative ">
        <Image
          src="https://fakeimg.pl/1850x320/"
          alt=""
          fill
          className="rounded-md z-0"
        />
        <div className="absolute w-[50%] -bottom-12 -translate-x-1/2 left-1/2 rounded-xl">
          <SearchBar cities={cities} setRange={setRange} setRooms={setRooms} />
        </div>
      </Card>
      <div className="mt-32 [&>div]:mb-32">
        <ListRoom rooms={_rooms} range={range} />
      </div>
    </div>
  );
}
