import lesson6 from '../lesson6';

const {
  getClimate,
  getProfile,
  getPilots,
} = lesson6.taskAsync;

describe('async getClimate', () => {
  const expectedPlanets = [
    {
      name: 'Yavin IV',
      climate: 'temperate, tropical',
    },
    {
      name: 'Dagobah',
      climate: 'murky',
    },
    {
      name: 'Geonosis',
      climate: 'temperate, arid',
    },
  ];

  expectedPlanets.forEach(planet => {
    it(`should get climate on ${planet.name}`, async () => {
      expect(await getClimate(planet.name)).toBe(planet.climate);
    });
  });

  it('should throw error for unknown planet', async () => {
    try {
      await getClimate('Earth');
    } catch (e) {
      expect(e.message).toMatch(/no items found by name: Earth/);
    }
  });
});

describe('async getProfile', () => {
  const expectedProfiles = [
    {
      name: 'R2-D2',
      height: '96',
      mass: '32',
    },
    {
      name: 'Owen Lars',
      height: '178',
      mass: '120',
    },
  ];

  expectedProfiles.forEach(profile => {
    it(`should get profile ${profile.name}`, async () => {
      const { name, height, mass } = await getProfile(profile.name);

      expect({ name, height, mass }).toEqual(profile);
    });
  });
});

describe('async getPilots', () => {
  it('should get pilots on Millennium Falcon', async () => {
    const pilots = await getPilots('Millennium Falcon');

    expect(pilots).toEqual(['Chewbacca', 'Han Solo', 'Lando Calrissian', 'Nien Nunb']);
  });

  it('should return empty array for Death Star', async () => {
    const pilots = await getPilots('Death Star');

    expect(pilots).toEqual([]);
  });
});
