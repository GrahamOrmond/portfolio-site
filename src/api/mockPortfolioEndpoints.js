import { applicationDbContext as dbContext } from './applicationDbContext';

const mockPortfolioEndpoints = [
  {
    url: '/auth/login',
    method: 'POST',
    response: params =>
      response.ok({
        id: 1,
        email: 'ormondwork@gmail.com',
        firstName: 'Graham',
        lastName: 'Ormond'
      })
  },
  {
    url: '/dashboard',
    method: 'GET',
    response: params => {
      const prospects = dbContext.prospects.filter(p => !p.deleted);
      prospects.forEach(prospect => {
        prospect.company = dbContext.companies.find(
          c => c.id === prospect.fkCompany
        );
      });
      return response.ok({
        prospectCount: prospects.filter(p => !p.company.deleted).length,
        companyCount: dbContext.companies.filter(p => !p.deleted).length
      });
    }
  },
  {
    url: '/companies',
    method: 'GET',
    response: params => {
      let companies = dbContext.companies.filter(c => !c.deleted);
      companies.forEach(company => {
        company.prospects = dbContext.prospects.filter(
          p => p.fkCompany === company.id && !p.deleted
        );
      });

      if (params) {
        if (params.searchTerm) {
          companies = companies.filter(c =>
            c.name.toLowerCase().includes(params.searchTerm.toLowerCase())
          );
        }

        const isDescendingOrder = params.orderBy?.toLowerCase() === 'desc';
        switch (params.sortBy?.toLowerCase()) {
          case 'name': {
            companies = companies.sort((a, b) =>
              isDescendingOrder
                ? b.name.localeCompare(a.name)
                : a.name.localeCompare(b.name)
            );
            break;
          }
          case 'date_created':
          default:
            companies = companies.sort((a, b) =>
              isDescendingOrder
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt)
            );
            break;
        }
      }

      return response.ok(companies);
    }
  },
  {
    url: '/companies/:id',
    method: 'GET',
    response: id => {
      const company = dbContext.companies.find(
        c => c.id.toString() === id.toString() && !c.deleted
      );
      if (!company) {
        return response.error(404, `Company with id ${id} was not found`);
      }
      company.prospect = dbContext.prospects.filter(
        p => p.fkCompany === company.id && !p.deleted
      );
      return response.ok(company);
    }
  },
  {
    url: '/companies',
    method: 'POST',
    response: ({ name, domain, description }) => {
      const duplicateCompany = dbContext.companies.find(
        c =>
          c.name.toLowerCase() ===
            name.toLowerCase().trim().substring(0, 255) && !c.deleted
      );
      if (duplicateCompany) {
        return response.error(
          409,
          `Company named '${duplicateCompany.name}' already exists.`
        );
      }
      const company = {
        id: new Date().getTime(),
        name: name.trim().substring(0, 255),
        domain: domain?.toLowerCase().trim().substring(0, 255),
        description: description?.toLowerCase().trim().substring(0, 500),
        deleted: false,
        createdAt: new Date()
      };
      dbContext.companies.push(company);

      company.prospects = [];
      return response.ok(company);
    }
  },
  {
    url: '/companies/:id',
    method: 'PUT',
    response: (id, { name, domain, description }) => {
      const company = dbContext.companies.find(
        c => c.id.toString() === id.toString() && !c.deleted
      );
      if (!company) {
        return response.error(409, `Company with id ${id} was not found`);
      }

      const duplicateCompany = dbContext.companies.find(
        c =>
          c.name.toLowerCase() ===
            name.toLowerCase().trim().substring(0, 255) &&
          c.id.toString() !== id.toString() &&
          !c.deleted
      );
      if (duplicateCompany) {
        return response.error(
          409,
          `Company named '${duplicateCompany.name}' already exists.`
        );
      }

      company.name = name.trim().substring(0, 255);
      company.domain = domain?.toLowerCase().trim().substring(0, 255);
      company.description = description?.toLowerCase().trim().substring(0, 500);

      company.prospect = dbContext.prospects.filter(
        p => p.fkCompany === company.id && !p.deleted
      );
      return response.ok(company);
    }
  },
  {
    url: '/companies',
    method: 'DELETE',
    response: params => {
      const companies = dbContext.companies.filter(
        c =>
          params.companyIds.some(i => i.toString() === c.id.toString()) &&
          !c.deleted
      );
      companies.forEach(p => {
        p.deleted = true;
      });
      return response.ok();
    }
  },
  {
    url: '/prospects',
    method: 'GET',
    response: params => {
      let prospects = dbContext.prospects.filter(p => !p.deleted);
      if (params) {
        if (params.searchTerm) {
          const searchTerm = params.searchTerm.toLowerCase().replace(' ', '');
          prospects = prospects.filter(
            p =>
              `${p.firstName}${p.lastName}`
                .toLowerCase()
                .includes(searchTerm) ||
              p.email.toLowerCase().includes(searchTerm)
          );
        }

        if (params.fkCompany) {
          prospects = prospects.filter(p => p.fkCompany === params.fkCompany);
        }

        const isDescendingOrder = params.orderBy?.toLowerCase() === 'desc';
        switch (params.sortBy?.toLowerCase()) {
          case 'name': {
            prospects = prospects.sort((a, b) =>
              isDescendingOrder
                ? `${b.firstName}${b.lastName}`.localeCompare(
                    `${a.firstName}${a.lastName}`
                  )
                : `${a.firstName}${a.lastName}`.localeCompare(
                    `${b.firstName}${b.lastName}`
                  )
            );
            break;
          }
          case 'date_created':
          default:
            prospects = prospects.sort((a, b) =>
              isDescendingOrder
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt)
            );
            break;
        }
      }

      prospects.forEach(prospect => {
        prospect.company = dbContext.companies.find(
          c => c.id === prospect.fkCompany
        );
      });

      return response.ok(
        prospects.filter(p => !p.deleted && !p.company.deleted)
      );
    }
  },
  {
    url: '/prospects/:id',
    method: 'GET',
    response: id => {
      const prospect = dbContext.prospects.find(
        p => p.id.toString() === id.toString() && !p.deleted
      );
      if (!prospect) {
        return response.error(404, `Prospect with id ${id} was not found`);
      }

      prospect.company = dbContext.companies.find(
        c => c.id === prospect.fkCompany
      );
      if (prospect.company.deleted) {
        return response.error(404, `Prospect with id ${id} was not found`);
      }
      return response.ok(prospect);
    }
  },
  {
    url: '/prospects',
    method: 'POST',
    response: ({ prospects }) => {
      const results = [];
      const keyTime = new Date().getTime();
      prospects.forEach((prospectRequest, index) => {
        const company = dbContext.companies.find(
          c => c.id === prospectRequest.fkCompany && !c.deleted
        );
        if (!company) {
          return response.error(
            400,
            `Company with id ${prospectRequest.fkCompany} was not found`
          );
        }

        if (prospectRequest.email) {
          const duplicateProspect = dbContext.prospects.find(
            p =>
              p.email ===
                prospectRequest.email.toLowerCase().trim().substring(0, 255) &&
              !p.deleted
          );
          if (duplicateProspect) {
            return response.error(
              409,
              `Prospect with the email '${duplicateProspect.email}' already exists.`
            );
          }
        }

        const prospect = {
          id: keyTime + index,
          firstName: prospectRequest.firstName
            ?.toLowerCase()
            .trim()
            .substring(0, 255),
          lastName: prospectRequest.lastName
            ?.toLowerCase()
            .trim()
            .substring(0, 255),
          email: prospectRequest.email?.toLowerCase().trim().substring(0, 255),
          title: prospectRequest.title?.trim().substring(0, 255),
          fkCompany: prospectRequest.fkCompany,
          createdAt: new Date()
        };
        dbContext.prospects.push(prospect);
        prospect.company = company;
        results.push(prospect);
      });
      return response.ok(results);
    }
  },
  {
    url: '/prospects/:id',
    method: 'PUT',
    response: (id, { firstName, lastName, email, title, fkCompany }) => {
      const prospect = dbContext.prospects.find(
        p => p.id.toString() === id.toString() && !p.deleted
      );
      if (!prospect) {
        return response.error(400, `Prospect with id ${id} was not found`);
      }
      prospect.company = dbContext.companies.find(
        c => c.id === prospect.fkCompany
      );
      if (prospect.company.deleted) {
        return response.error(400, `Prospect with id ${id} was not found`);
      }

      if (email) {
        const duplicateProspect = dbContext.prospects.find(
          p =>
            p.email === email.toLowerCase().trim().substring(0, 255) &&
            p.id.toString() !== id.toString() &&
            !p.deleted
        );
        if (duplicateProspect) {
          return response.error(
            409,
            `Prospect with the email '${duplicateProspect.email}' already exists.`
          );
        }
      }

      prospect.firstName = firstName?.toLowerCase().trim().substring(0, 255);
      prospect.lastName = lastName?.toLowerCase().trim().substring(0, 255);
      prospect.email = email?.toLowerCase().trim().substring(0, 255);
      prospect.title = title?.trim().substring(0, 255);

      return response.ok(prospect);
    }
  },
  {
    url: '/prospects',
    method: 'DELETE',
    response: params => {
      const prospects = dbContext.prospects.filter(
        c =>
          params.prospectIds.some(i => i.toString() === c.id.toString()) &&
          !c.deleted
      );
      prospects.forEach(p => {
        p.deleted = true;
      });
      return response.ok();
    }
  }
];

const response = {
  ok: data => {
    return {
      statusCode: 200,
      data
    };
  },
  error: (statusCode, errorMessage) => {
    throw new Error(errorMessage, {
      error: errorMessage,
      statusCode
    });
  }
};

export default mockPortfolioEndpoints;
