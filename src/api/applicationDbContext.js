const applicationDbContext = {
  companies: [
    {
      id: 1,
      name: "McDonald's",
      domain: 'https://www.mcdonalds.com/',
      description:
        "McDonald's Corporation is an American multinational fast food chain, founded in 1940 as a restaurant operated by Richard and Maurice McDonald, in San Bernardino, California, United States",
      createdAt: new Date('2023-01-02'),
      deleted: false
    },
    {
      id: 2,
      name: 'Salesforce',
      domain: 'https://www.salesforce.com/',
      description:
        'Salesforce, Inc. is an American cloud-based software company headquartered in San Francisco, California. It provides customer relationship management software and applications focused on sales, customer service, marketing automation, e-commerce, analytics, and application development.',
      createdAt: new Date('2023-01-01'),
      deleted: false
    }
  ],
  prospects: [
    {
      id: 1,
      firstName: 'Graham',
      lastName: 'Ormond',
      email: 'ormondwork@gmail.com',
      title: 'Department Manager',
      fkCompany: 1,
      createdAt: new Date('2023-01-02'),
      deleted: false
    },
    {
      id: 2,
      firstName: 'Marc',
      lastName: 'Benioff',
      email: 'mark@salesforce.com',
      title: 'CEO',
      fkCompany: 2,
      createdAt: new Date('2023-01-01'),
      deleted: false
    }
  ]
};

export { applicationDbContext };
