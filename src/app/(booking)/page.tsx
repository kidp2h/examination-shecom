import Search from '@/components/home/Search';
import { getRooms } from '@/services/room';

export default async function HomePage() {
  const rooms = await getRooms();

  const result = await fetch('https://provinces.open-api.vn/api/');

  const items = await result.json();

  return (
    <div className="mt-10 h-full">
      <Search rooms={rooms.data} cities={items} />
    </div>
  );
}
