import MainLayout from '../components/MainLayout';
import CalendarHero from '../components/calendar/CalendarHero';
import CalendarView from '../components/calendar/CalendarView';
import UpcomingEvents from '../components/calendar/UpcomingEvents';

export default function CalendarPage() {
  return (
    <MainLayout>
      <div className="space-y-0">
        <CalendarHero />
        <CalendarView />
        <UpcomingEvents />
      </div>
    </MainLayout>
  );
}