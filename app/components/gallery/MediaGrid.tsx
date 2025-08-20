import Link from 'next/link';

const mediaItems = [
  {
    id: 1,
    title: 'Hitting Training Session',
    image: '/1.webp',
    service: '1 Hour Hitting Lesson',
    price: 85
  },
  {
    id: 2,
    title: 'Fielding Practice',
    image: '/2.webp',
    service: '1 Hour Infield Fielding',
    price: 85
  },
  {
    id: 3,
    title: 'Focused Training',
    image: '/3.webp',
    service: '1 Hour Strength Training',
    price: 85
  },
  {
    id: 4,
    title: 'Speed & Agility',
    image: '/4.webp',
    service: '1 Hour Foot Speed & Agility',
    price: 85
  },
  {
    id: 5,
    title: 'Individual Coaching',
    image: '/5.webp',
    service: '1 Hour Hitting Lesson',
    price: 85
  },
  {
    id: 6,
    title: 'Team Training',
    image: '/6.webp',
    service: '1 Hour Throwing Lesson',
    price: 85
  },
  {
    id: 7,
    title: 'Skill Development',
    image: '/7.webp',
    service: '1 Hour Outfield Defense',
    price: 85
  },
  {
    id: 8,
    title: 'Championship Prep',
    image: '/8.webp',
    service: '90 Min Hitting & Bat Speed',
    price: 120
  },
  {
    id: 9,
    title: 'Athletic Training',
    image: '/9.webp',
    service: '1 Hour Base Running',
    price: 85
  },
  {
    id: 10,
    title: 'The Complete Journey',
    image: '/10.webp',
    service: 'Virtual Training',
    price: 85
  }
];

const MediaGrid = () => {
  return (
    <section className="section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="mb-6">Training Gallery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See our training in action. Click any image to book a similar training session.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {mediaItems.map((item) => (
            <Link 
              key={item.id}
              href={`/booking?service=${encodeURIComponent(item.service)}&price=${item.price}`}
              className="gallery-item"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay">
                <span>Book {item.service}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="mb-4">Ready to Start Training?</h3>
          <p className="text-gray-600 mb-6">
            Browse all our available training services and book your session today.
          </p>
          <Link href="/services" className="btn btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MediaGrid;