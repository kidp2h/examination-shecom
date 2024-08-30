import { Button } from '@/components/ui/button';
import { checkDateISORange } from '@/lib/utils';
import { getRoom } from '@/services/room';
import {
  BadgeCheck,
  BedSingle,
  CigaretteOff,
  CreditCard,
  Gift,
  Telescope,
  UtensilsCrossed,
  Wifi,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export type DetailPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    check_in: string;
    check_out: string;
  };
};
export default async function DetailPage({
  params,
  searchParams,
}: DetailPageProps) {
  const room = await getRoom(params.id);
  console.log(searchParams);

  if (
    !room.data ||
    !checkDateISORange(searchParams.check_in, searchParams.check_out)
  ) {
    redirect('/');
  }

  return (
    <div className="bg-secondary mt-32 p-5 rounded-lg">
      <h3 className="text-2xl font-semibold mb-5">{room.data.name}</h3>
      <h3 className="text-sm text-gray-500 mb-5">{room.data.description}</h3>
      <div className="flex flex-row gap-5">
        <div className="">
          <div className="relative h-52 w-52 rounded-lg flex flex-col justify-between">
            <Image
              src="https://fakeimg.pl/300x300/"
              className="rounded-lg"
              alt=""
              fill
            />
          </div>

          <div className="mt-5">
            <div className="flex flex-row gap-2 items-center font-bold text-lg">
              <BedSingle size={17} />
              <span>1 gường king</span>
            </div>
            <div className="flex flex-row gap-2 text-lg items-center text-cyan-600">
              <Telescope size={17} />
              <span>Nhìn ra thành phố</span>
            </div>

            <div className="flex flex-row gap-2 text-lg items-center text-gray-600 ">
              <CigaretteOff size={17} />
              <span>Không hút thuốc</span>
            </div>

            <div className="flex flex-row gap-2 text-lg items-center text-cyan-600 ">
              <Wifi size={17} />
              <span>Wi-Fi miễn phí</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <UtensilsCrossed size={17} />
            <span>Bữa sáng giá rẻ</span>
          </div>

          <div className="flex flex-row items-center gap-2 text-blue-500">
            <BadgeCheck size={17} />
            <span>Hủy miễn phí</span>
          </div>
          <div className="flex flex-row items-center gap-2 text-blue-500">
            <Zap size={17} />
            <span>Xác nhận ngay</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CreditCard size={17} />
            <span>Thanh toán trước trực tuyến</span>
          </div>

          <div className="flex flex-row items-center gap-2 text-blue-500">
            <Gift size={17} />
            <span>Quà tặng miễn phí</span>
          </div>
        </div>

        <div className="ml-auto mt-auto">
          <div className="flex flex-row gap-5 items-end">
            <div className="flex flex-col text-gray-500 text-sm">
              <div className="flex flex-row gap-2 items-center">
                <span className="line-through">4.797.527₫</span>
                <span className="text-3xl font-semibold  text-primary">
                  3.003.527₫
                </span>
              </div>
              <div>
                <span>Tổng giá: </span>
                <span>6.812.000₫</span>
              </div>
              <div>
                <span>1 phòng x 2 đêm bao gồm thuế</span>
              </div>
            </div>
            <Link
              href={`/payment/${room.data.id}?check_in=${searchParams.check_in}&check_out=${searchParams.check_out}`}
            >
              <Button size={'lg'} className="text-white">
                Book now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
