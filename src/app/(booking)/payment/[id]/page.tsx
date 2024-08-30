import PaymentBooking from '@/components/payment/PaymentBooking';

import { getRoom } from '@/services/room';
type PaymentPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    check_in: string;
    check_out: string;
  };
};
export default async function PaymentPage({
  params,
  searchParams,
}: PaymentPageProps) {
  const room = await getRoom(params.id);
  return (
    <PaymentBooking
      room={room.data}
      checkIn={searchParams.check_in}
      checkOut={searchParams.check_out}
    />
  );
}
