'use client';
import { Button } from '@/components/ui/button';
import { Room } from '@prisma/client';
import { MapPinHouse } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type ListRoomProps = {
  rooms: Room[];
  range: {
    check_in: Date;
    check_out: Date;
  } | null;
};

export default function ListRoom({ rooms: _, range }: ListRoomProps) {
  return (
    <>
      {_.map((room: Room) => {
        return (
          <div className="bg-secondary rounded-lg" key={room.id}>
            <div className="p-7 rounded-lg flex-row flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-semibold mb-3 block">
                  {room.name}
                </h3>
                <div className="flex flex-row gap-2 items-center text-gray-500">
                  <MapPinHouse size={17} />
                  <span>{room.location}</span>
                </div>
              </div>
              <Link
                href={`/detail/${room.id}?check_in=${range?.check_in.toISOString()}&check_out=${range?.check_out.toISOString()}`}
              >
                <Button className="text-white">Book now</Button>
              </Link>
            </div>

            <div className="relative w-full h-96 ">
              <Image
                src="https://fakeimg.pl/1850x600/"
                className="rounded-b-lg"
                alt=""
                fill
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
