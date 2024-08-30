'use client';
import DetailRoom from '@/components/detail/DetailRoom';
import FormInformation from '@/components/payment/FormInformation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cancelBooking } from '@/services/booking';
import { BookingWithRoom } from '@/types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TableBooking({
  bookings,
}: {
  bookings: BookingWithRoom[];
}) {
  const [list, setList] = useState<BookingWithRoom[]>([]);

  useEffect(() => {
    setList(bookings);
  }, []);
  const handleDelete = async (id: string) => {
    const result = await cancelBooking(id);
    console.log(result);
  };
  return (
    <Table className="border-none">
      <TableHeader>
        <TableRow>
          <TableHead>Tên</TableHead>
          <TableHead className="hidden md:table-cell">
            Ngày nhận phòng
          </TableHead>
          <TableHead className="hidden md:table-cell">Ngày trả phòng</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((booking) => {
          return (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.user_name}</TableCell>
              <TableCell className="table-cell">
                {format(booking.check_in_date, 'PPPP', {
                  locale: vi,
                })}
              </TableCell>

              <TableCell className="table-cell">
                {format(booking.check_out_date, 'PPPP', {
                  locale: vi,
                })}
              </TableCell>
              <TableCell className="table-cell">
                <Badge
                  className={`text-white ${booking.deletedAt ? 'bg-red-500' : 'bg-primary'}`}
                >
                  {booking.deletedAt ? 'Đã hủy' : 'Đã đặt'}
                </Badge>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                      {!booking.deletedAt && (
                        <DropdownMenuItem
                          onClick={() => {
                            handleDelete(booking.id);
                            setList(
                              list.map((item) => {
                                if (item.id === booking.id)
                                  return { ...item, deletedAt: new Date() };
                                return item;
                              }),
                            );
                          }}
                        >
                          Xóa
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <DialogTrigger>Xem chi tiết</DialogTrigger>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Chi tiết booking</DialogTitle>
                    </DialogHeader>

                    <DetailRoom readOnly room={booking.room} />
                    <FormInformation
                      readOnly
                      room={booking.room}
                      info={{
                        firstName: booking.user_name.split(' ')[1],
                        lastName: booking.user_name.split(' ')[0],
                        email: 'test@gmail.com',
                        phone: '0123456789',
                      }}
                      checkIn={null}
                      checkOut={null}
                    />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
