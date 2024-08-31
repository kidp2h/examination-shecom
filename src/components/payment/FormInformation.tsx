import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { paymentFormSchema } from '@/lib/zod';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { bookRoom } from '@/services/booking';
import { RoomWithBookings } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export type FormInformationProps = {
  checkIn: string | null;
  checkOut: string | null;
  room: Partial<RoomWithBookings>;
  readOnly: boolean;
  info?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

export default function FormInformation({
  checkIn,
  checkOut,
  room,
  readOnly,
  info,
}: FormInformationProps) {
  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      firstName: info?.firstName || '',
      lastName: info?.lastName || '',
      email: info?.email || '',
      phone: 0 || 0,
    },
  });
  async function onSubmit(values: z.infer<typeof paymentFormSchema>) {
    if (!checkIn || !checkOut || !room) {
      return;
    }
    const information = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone.toString(),
      checkIn,
      checkOut,
    };
    console.log(information);
    const result = await bookRoom(information, room);
    console.log(result);
    if (result.data === null) {
      toast({
        title: 'Thông báo',
        description: 'Đặt phòng thất bại',
      });
    } else {
      toast({
        title: 'Thông báo',
        description: 'Đặt phòng thành công',
      });
    }
  }
  return (
    <div className="ring-primary ring-2 rounded-lg p-5 my-5">
      <h3 className="text-2xl font-semibold">Thông tin khách hàng</h3>
      <div className="text-gray-500 my-3 ">
        Tên khách phải khớp với giấy tờ tùy thân hợp lệ sẽ dùng để nhận phòng
      </div>
      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-row gap-1 items-center text-md ">
                  <span className="text-primary">Tên</span>
                  <FormMessage className="text-md" />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Tên" {...field} disabled={readOnly} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-row gap-1 items-center text-md ">
                  <span className="text-primary">Họ</span>
                  <FormMessage className="text-md" />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Họ" {...field} disabled={readOnly} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-row gap-1 items-center text-md ">
                  <span className="text-primary">Email</span>
                  <FormMessage className=" text-md " />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled={readOnly} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-row gap-1 items-center  text-md ">
                  <span className="text-primary">Số điện thoại</span>
                  <FormMessage className="text-md" />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Số điện thoại"
                    {...field}
                    disabled={readOnly}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {!readOnly && (
            <Button type="submit" className="w-fit">
              Đặt phòng
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
