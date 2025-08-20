import { NextRequest, NextResponse } from 'next/server';

// Business hours configuration
const BUSINESS_HOURS = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '18:00' },
  saturday: { open: '09:00', close: '18:00' },
  sunday: { closed: true }
};

// Time slot duration in minutes
const SLOT_DURATION = 60;

// Generate available time slots for a given date
function generateTimeSlots(date: string) {
  const dayOfWeek = new Date(date).toLocaleLowerCase().toLocaleLowerCase();
  const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][
    new Date(date).getDay()
  ] as keyof typeof BUSINESS_HOURS;
  
  const hours = BUSINESS_HOURS[dayName];
  
  if (!hours || hours.closed) {
    return [];
  }
  
  const slots = [];
  const [openHour, openMin] = hours.open.split(':').map(Number);
  const [closeHour, closeMin] = hours.close.split(':').map(Number);
  
  const startTime = openHour * 60 + openMin;
  const endTime = closeHour * 60 + closeMin;
  
  for (let time = startTime; time < endTime; time += SLOT_DURATION) {
    const hour = Math.floor(time / 60);
    const minute = time % 60;
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    // Check if slot is available (not booked)
    // In production, check database for existing bookings
    const isAvailable = true; // Placeholder
    
    slots.push({
      time: timeString,
      available: isAvailable,
      displayTime: formatTime(timeString)
    });
  }
  
  return slots;
}

// Format time for display
function formatTime(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    
    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }
    
    // Generate available time slots
    const slots = generateTimeSlots(date);
    
    // In production, filter out booked slots from database
    // const bookings = await prisma.booking.findMany({ where: { date } });
    // Filter slots based on existing bookings
    
    return NextResponse.json({ 
      date,
      slots,
      businessHours: BUSINESS_HOURS
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}