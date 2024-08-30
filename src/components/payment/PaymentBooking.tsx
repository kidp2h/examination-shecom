'use client';

import {
  BadgeCheck,
  BedSingle,
  Calendar,
  CigaretteOff,
  Telescope,
  Wifi,
} from 'lucide-react';

import FormInformation from '@/components/payment/FormInformation';
import { checkDateISORange } from '@/lib/utils';
import { RoomWithBookings } from '@/types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export type PaymentBookingProps = {
  room: RoomWithBookings;
  checkIn: string;
  checkOut: string;
};
export default function PaymentBooking({
  room,
  checkIn,
  checkOut,
}: PaymentBookingProps) {
  const router = useRouter();
  if (!room || !checkDateISORange(checkIn, checkOut)) {
    router.push('/');
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3">
        <div>
          <div className="bg-secondary p-10 rounded-lg">
            <div className="flex flex-row gap-3 ">
              <div className="relative w-64 h-96">
                <Image
                  src="https://fakeimg.pl/200x300/"
                  className="rounded-lg"
                  alt=""
                  fill
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold">{room.name}</h3>
                <span className="text-md mt-3 block font-medium">
                  Phòng Deluxe
                </span>

                <div className="flex flex-wrap flex-row text-gray-500 gap-3">
                  <div className="flex flex-row gap-2 items-center text-lg">
                    <BedSingle size={17} />
                    <span>1 gường king</span>
                  </div>
                  <div className="flex flex-row gap-2 text-lg items-center">
                    <Telescope size={17} />
                    <span>Nhìn ra thành phố</span>
                  </div>

                  <div className="flex flex-row gap-2 text-lg items-center text-gray-600 ">
                    <CigaretteOff size={17} />
                    <span>Không hút thuốc</span>
                  </div>

                  <div className="flex flex-row gap-2 text-lg items-center">
                    <Wifi size={17} />
                    <span>Wi-Fi miễn phí</span>
                  </div>
                </div>
                <ol className="flex flex-col gap-2 mt-3 bg-orange-100 text-orange-400 p-5 rounded-lg mb-3">
                  <li>1. Một khoản tín dụng F&B trị giá 300.000₫</li>
                  <li>2. Giảm 20% dịch vụ Spa</li>
                  <li>
                    3. Nhận phòng sớm từ 11 giờ theo trình trạng phòng trống
                  </li>
                  <li>
                    4. Trả phòng trễ đến 2 giờ chiều tùy theo tình trạng phòng
                    trống
                  </li>
                  <li>5. Miễn phí bữa sáng cho tối đa 2 trẻ em dưới 12 tuổi</li>
                </ol>
                <div className="mt-auto flex">
                  <div className="flex flex-row gap-2 text-lg items-center text-cyan-500">
                    <BadgeCheck size={17} />
                    <span>Hủy miễn phí</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-dotted border-gray-500 block my-5" />
            <div className="flex flex-row items-center gap-2">
              <Calendar size={17} />
              <span>
                {format(checkIn, 'PPPP', {
                  locale: vi,
                })}{' '}
                - {format(checkOut, 'PPPP', { locale: vi })}
              </span>
            </div>
          </div>
          <FormInformation
            room={room}
            checkIn={checkIn}
            checkOut={checkOut}
            readOnly={false}
          />
        </div>

        <div>
          <div className="bg-secondary h-fit p-5 w-96 rounded-lg">
            <h4 className="text-xl font-semibold mb-10">Giá chi tiết</h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>1 phòng x 2 đêm</span>
                <span>9.xxx.xxx₫</span>
              </div>

              <div className="flex justify-between text-cyan-500">
                <span>Ưu đãi đặc biệt</span>
                <span>-500.xxx₫</span>
              </div>
              <hr className="border-dotted border-gray-500" />
              <div className="flex justify-between items-center">
                <span className="font-medium">Thanh toán trước trực tuyến</span>
                <span className="text-2xl font-semibold">{room.price}₫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
