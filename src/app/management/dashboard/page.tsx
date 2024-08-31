'use server';
import TableBooking from '@/components/management/TableBooking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBookings } from '@/services/booking';

export default async function Dashboard() {
  const bookings = await getBookings();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="booking">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="booking">Booking</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="booking">
          <Card x-chunk="dashboard-06-chunk-0 " className="border-none">
            <CardHeader>
              <CardTitle>Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <TableBooking bookings={bookings.data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
