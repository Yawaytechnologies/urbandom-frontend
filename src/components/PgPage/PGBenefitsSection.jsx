import React from 'react';

const benefits = [
  {
    title: 'Stress free search',
    description: 'Real property photos and Transparent pricing',
    img: '/pgbenifits1.png',
  },
  {
    title: 'Find your Match',
    description: 'Lots of options to choose from (private, twin & multi-sharing)',
    img: '/pgbenifits2.png',
  },
  {
    title: 'Bon appetite',
    description: 'Info on meal type and offerings to know what’s cooking',
    img: '/pgbenifits3.png',
  },
 
  {
    title: (
      <>
        <span className="text-blue-600 font-semibold">Your</span> Life, Your Rules
      </>
    ),
    description: 'Advance info on house rules to live like you do',
    img: '/pgbenifits4.png',
  },
];

const stats = [
  { value: '30k+', label: 'Properties' },
  { value: '40+', label: 'Cities' },
  { value: '3.5 Lakh+', label: 'Monthly users' },
];

const PGBenefitsSection = () => {
  return (
    <section className="py-16 px-4 md:px-12 lg:px-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
        Benefits of our <span className="text-black">PG/Co-Living</span>
      </h2>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center px-2">
            <img
              src={benefit.img}
              alt={`Benefit ${index + 1}`}
              className="mx-auto mb-4 w-32 h-auto"
            />
            <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div className="bg-black text-white py-10 px-4 sm:px-12 rounded-xl grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
        {stats.map((stat, idx) => (
          <div key={idx}>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PGBenefitsSection;
